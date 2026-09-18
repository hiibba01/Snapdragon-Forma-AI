import json
import os
import requests


# GenieX exposes an OpenAI-compatible API.
GENIEX_URL = os.getenv(
    "GENIEX_URL",
    "http://127.0.0.1:18181/v1/chat/completions"
)

GENIEX_MODEL = os.getenv(
    "GENIEX_MODEL",
    "local/qwen3_1_7b"
)


def extract_with_geniex(story: str, fields: list[dict]) -> dict:

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
            "options": options,
            "showIf": field.get("showIf")
        })

    prompt = f"""
You are the local AI extraction engine for Forma AI.

Extract structured information from the insurance claim below.

Available form fields:

{json.dumps(field_descriptions, indent=2)}

Rules:

- Return ONLY valid JSON.
- Use the exact field IDs as JSON keys.
- Do not invent information.
- Do not guess missing information.
- If information is missing, leave the field out.
- For select fields, use the exact option value.
- Respect conditional fields.
- Only extract information explicitly present or directly determined.
- Do not return markdown or explanations.

Claim:

{story}

Return ONLY the JSON object.
"""

    response = requests.post(
        GENIEX_URL,
        json={
            "model": GENIEX_MODEL,
            "messages": [
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            "temperature": 0
        },
        timeout=120
    )

    if not response.ok:
        raise RuntimeError(
            f"GenieX service returned {response.status_code}: "
            f"{response.text}"
        )

    result = response.json()

    try:
        content = result["choices"][0]["message"]["content"]
    except (KeyError, IndexError, TypeError):
        raise RuntimeError(
            f"Unexpected GenieX response: "
            f"{json.dumps(result, indent=2)}"
        )

    return parse_json_response(content, fields)


def parse_json_response(content: str, fields: list[dict]) -> dict:

    content = content.strip()

    # Handle accidental markdown code fences.
    if content.startswith("```"):
        content = content.replace("```json", "")
        content = content.replace("```", "")
        content = content.strip()

    try:
        result = json.loads(content)
    except json.JSONDecodeError:
        raise RuntimeError(
            f"GenieX returned invalid JSON: {content}"
        )

    if not isinstance(result, dict):
        raise RuntimeError(
            "GenieX response is not a JSON object"
        )

    # Only allow fields that exist in the dynamic form.
    valid_field_ids = {
        field.get("id")
        for field in fields
        if field.get("id")
    }

    return {
        key: value
        for key, value in result.items()
        if key in valid_field_ids
    }
