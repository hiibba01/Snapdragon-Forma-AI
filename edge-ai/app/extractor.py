import json
import os
import requests
from dotenv import load_dotenv


BASE_DIR = os.path.dirname(
    os.path.dirname(
        os.path.dirname(
            os.path.abspath(__file__)
        )
    )
)

ENV_PATH = os.path.join(BASE_DIR, "backend", ".env")

load_dotenv(ENV_PATH)


def extract_with_gemini(story: str, fields: list[dict]) -> dict:

    api_key = os.getenv("GEMINI_API_KEY")

    if not api_key:
        raise RuntimeError("GEMINI_API_KEY is not configured")

    # Give Gemini the complete dynamic form schema
    # so it understands field IDs, options and conditional fields.
    field_descriptions = []

    for field in fields:

        options = []

        for option in field.get("options", []):
            if isinstance(option, dict):
                options.append({
                    "label": option.get("label"),
                    "value": option.get("value")
                })
            else:
                options.append(option)

        field_descriptions.append({
            "id": field.get("id"),
            "label": field.get("label"),
            "type": field.get("type"),
            "required": field.get("required", False),
            "options": options,
            "showIf": field.get("showIf")
        })

    prompt = f"""
You are the AI extraction engine for Forma AI,
an intelligent automobile insurance claim system.

Your task is to read an insurance claim written in natural language
and extract information that matches the available dynamic form fields.

AVAILABLE FORM FIELDS:

{json.dumps(field_descriptions, indent=2)}


IMPORTANT RULES:

1. Return ONLY a valid JSON object.

2. Use the exact field "id" values as JSON keys.

3. Do NOT invent information.

4. Do NOT guess information that is not stated
   or directly determined from the claim.

5. If information is missing, do not include that field.

6. For select fields, use the exact "value" from the available options.

7. Do not return the option label when an option value is available.

8. Understand natural language and map it to the appropriate
   available option.

9. Respect conditional fields.

10. Only extract a conditional field when its condition is satisfied
    AND the information is actually present in the claim.

11. Do not fill conditional fields simply because they exist.

12. Preserve vehicle names, registration numbers, names,
    phone numbers, locations and descriptions accurately.

13. For relative dates such as "yesterday", "last night",
    "two days ago", preserve the user's wording unless
    an exact date is explicitly provided.

14. Do not create information that is not present in the claim.

15. Do not add markdown.

16. Do not add explanations.

17. Do not add fields that are not present in the form schema.


INCIDENT TYPE MAPPING:

vehicle crash/collision with another vehicle
-> vehicle_collision

vehicle hitting an animal such as deer, dog or similar
-> animal_collision

another vehicle hitting the user's vehicle and leaving
-> hit_and_run

vehicle or property being stolen
-> theft

attempted stealing of the vehicle or property
-> attempted_theft

intentional damage to the vehicle
-> vandalism

vehicle catching fire or being damaged by fire
-> fire

flood or water entering/damaging the vehicle
-> water_damage

hail damaging the vehicle
-> hail_damage

storm, strong wind or storm-related damage
-> storm_damage

tree, branch or another object falling onto the vehicle
-> falling_object

windshield, window or other glass being damaged
-> glass_damage

pothole, road debris or another road hazard causing damage
-> road_hazard

mechanical failure or vehicle breakdown
-> vehicle_breakdown

damage that happened while the vehicle was parked
-> parking_damage

if none of the above clearly applies
-> other


EXAMPLES:


Example 1:

Claim:
"Yesterday I hit a deer with my Honda Civic and the windshield shattered."

Return:
{{
    "incidentType": "animal_collision",
    "vehicle": "Honda Civic",
    "damage": "windshield shattered",
    "incidentDate": "yesterday"
}}


Example 2:

Claim:
"Someone hit my parked Honda City in a parking lot.
The rear bumper was badly damaged and the person drove away."

Return:
{{
    "incidentType": "parking_damage",
    "vehicle": "Honda City",
    "damage": "rear bumper",
    "damageSeverity": "severe",
    "description": "Someone hit the parked vehicle in a parking lot and drove away."
}}


Example 3:

Claim:
"A tree fell on my Toyota during a storm.
The roof and windshield were damaged."

Return:
{{
    "incidentType": "falling_object",
    "vehicle": "Toyota",
    "damage": "roof and windshield",
    "description": "A tree fell on the vehicle during a storm."
}}


Example 4:

Claim:
"My car was stolen from outside my house last night."

Return:
{{
    "incidentType": "theft",
    "vehicle": "car",
    "incidentDate": "last night",
    "description": "The car was stolen from outside the user's house."
}}


Example 5:

Claim:
"I hit a pothole while driving my Honda City.
The front wheel and suspension were damaged."

Return:
{{
    "incidentType": "road_hazard",
    "vehicle": "Honda City",
    "damage": "front wheel and suspension",
    "description": "The vehicle hit a pothole while driving."
}}


Example 6:

Claim:
"My car caught fire while I was driving.
The engine area was badly damaged."

Return:
{{
    "incidentType": "fire",
    "damage": "engine area",
    "damageSeverity": "severe",
    "description": "The car caught fire while driving."
}}


Example 7:

Claim:
"Another car hit my Honda Civic at a traffic signal.
The other driver was Rahul Sharma and his insurance is Geico."

Return:
{{
    "incidentType": "vehicle_collision",
    "vehicle": "Honda Civic",
    "anotherVehicle": "yes",
    "otherDriverName": "Rahul Sharma",
    "otherInsurance": "Geico"
}}


USER CLAIM:

{story}


Return ONLY the JSON object.
"""

    url = (
        "https://generativelanguage.googleapis.com/"
        "v1beta/models/gemini-2.5-flash:generateContent"
    )

    response = requests.post(
        url,
        params={"key": api_key},
        json={
            "contents": [
                {
                    "parts": [
                        {
                            "text": prompt
                        }
                    ]
                }
            ],
            "generationConfig": {
                "temperature": 0,
                "responseMimeType": "application/json"
            }
        },
        timeout=60
    )

    # Show the actual Gemini error instead of silently failing
    if not response.ok:
        raise RuntimeError(
            f"Gemini API error {response.status_code}: {response.text}"
        )

    data = response.json()

    try:
        content = data["candidates"][0]["content"]["parts"][0]["text"]
    except (KeyError, IndexError, TypeError):
        raise RuntimeError(
            f"Unexpected Gemini response: {json.dumps(data, indent=2)}"
        )

    content = content.strip()

    try:
        result = json.loads(content)
    except json.JSONDecodeError:
        raise RuntimeError(
            f"Gemini returned invalid JSON: {content}"
        )

    if not isinstance(result, dict):
        raise RuntimeError(
            "Gemini response is not a JSON object"
        )

    # Only return fields that actually exist in the form schema.
    valid_field_ids = {
        field.get("id")
        for field in fields
        if field.get("id")
    }

    result = {
        key: value
        for key, value in result.items()
        if key in valid_field_ids
    }

    return result


def extract_claim_data(story: str, fields: list[dict]) -> dict:
    """
    Use the Snapdragon GenieX engine when available.
    Fall back to Gemini on unsupported machines.
    """

    try:
        from app.snapdragon_engine import get_engine_status
        from app.geniex_client import extract_with_geniex

        status = get_engine_status()

        if status.get("available"):
            return extract_with_geniex(
                story,
                fields
            )

    except Exception as error:
        print(
            f"GenieX unavailable, using Gemini fallback: {error}"
        )

    return extract_with_gemini(
        story,
        fields
    )
