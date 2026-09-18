# Forma AI

### AI-Augmented Dynamic Form Engine for Insurance Claims

Forma AI turns natural-language insurance claim descriptions into structured form data using AI.

Instead of manually filling a long insurance form, a user can simply describe what happened:

> "Yesterday evening I was driving my Honda Civic near Hazratganj when a deer crossed the road and I hit it. The windshield shattered and the car is still drivable."

Forma AI extracts the relevant information and automatically fills the corresponding fields in a dynamic insurance claim form.

---

## What Forma AI Does

Forma AI combines:

* Natural-language claim input
* AI-powered information extraction
* Dynamic form rendering
* Conditional form fields
* Automatic field population
* Missing-information detection
* Insurance claim submission
* Snapdragon-optimized edge AI execution

The goal is to make insurance workflows faster and easier while reducing repetitive manual form filling.

---

## How It Works

```text
User describes the incident
            ↓
       Forma AI UI
            ↓
      Node / Express API
            ↓
       Edge AI Service
            ↓
   ┌───────────────────────┐
   │ Snapdragon available? │
   └───────────┬───────────┘
               │
        ┌──────┴──────┐
        ↓             ↓
     Yes              No
        ↓             ↓
 GenieX QAIRT      Gemini
        ↓          fallback
 Qwen3-1.7B
 W4A16
        ↓
 Snapdragon NPU
        │
        └──────┬──────┘
               ↓
      Structured JSON
               ↓
       Dynamic Form
               ↓
        Claim Submission
```

---

## Example

### Input

```text
Yesterday evening around 7:30 PM, I was driving my Honda Civic
near Hazratganj when a deer crossed the road and I hit it.
The windshield shattered and the front bumper was damaged.
The car is still drivable. No one was injured.
```

### Extracted Data

```json
{
  "incidentType": "animal_collision",
  "vehicle": "Honda Civic",
  "incidentDate": "yesterday",
  "incidentTime": "7:30 PM",
  "incidentLocation": "Hazratganj",
  "damage": "windshield shattered and front bumper damaged",
  "vehicleDrivable": "yes",
  "injuries": "no"
}
```

The extracted information is then used to automatically populate the dynamic insurance form.

---

## Key Features

### Natural Language Input

Users can describe an insurance incident in normal language instead of filling every field manually.

### AI Information Extraction

The system extracts relevant information from the user's description and maps it to the dynamic form's field IDs.

### Dynamic Forms

Form fields are stored as a schema and rendered dynamically by the React frontend.

### Conditional Fields

Fields can appear based on previous answers.

For example:

```text
Incident Type → Vehicle Collision
                    ↓
          Show other vehicle fields
```

### Automatic Date Understanding

Natural expressions such as:

```text
today
yesterday
yesterday evening
tomorrow
```

can be converted into valid date values for the form.

### Missing Information Detection

After extraction, Forma AI identifies required information that was not found in the user's description.

### Claim Submission

Once the required information is completed, the user can submit the claim through the existing backend.

---

# Edge AI & Snapdragon

Forma AI is designed to support local AI inference on Snapdragon-powered Windows PCs.

The edge AI layer uses:

**Qwen3-1.7B**

with:

* **W4A16 quantization**
* **GenieX QAIRT runtime**
* **Snapdragon NPU**

The Qwen3 model asset is prepared for Snapdragon X Elite.

### Development Mode

During development on a non-Snapdragon machine, Forma AI automatically falls back to Gemini.

The application detects the current environment rather than falsely claiming that Snapdragon hardware is being used.

```text
AMD64 development machine
        ↓
Gemini fallback
        ↓
Development / testing
```

On a supported Snapdragon Windows ARM64 machine:

```text
Snapdragon ARM64
        ↓
GenieX
        ↓
GenieX QAIRT
        ↓
Qwen3-1.7B W4A16
        ↓
Snapdragon NPU
```

The same application can therefore support both development and Snapdragon deployment environments.

---

## Edge AI Architecture

```text
React Frontend
      │
      ↓
Node / Express Backend
      │
      ↓
FastAPI Edge AI Service
      │
      ↓
Snapdragon Engine
      │
      ├── Snapdragon + GenieX
      │        ↓
      │   Qwen3-1.7B
      │        ↓
      │   Snapdragon NPU
      │
      └── Development fallback
               ↓
             Gemini
```

---

## Technology Stack

### Frontend

* React
* Vite
* Tailwind CSS
* React Hook Form
* React Router
* Lucide Icons
* Axios

### Backend

* Node.js
* Express
* MongoDB
* Mongoose
* JWT
* REST APIs

### Edge AI

* Python
* FastAPI
* Qwen3-1.7B
* W4A16
* GenieX QAIRT
* Qualcomm AI Hub

---

## Project Structure

```text
Forma AI/
│
├── frontend/
│   └── React application
│
├── backend/
│   ├── controllers/
│   ├── data/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── seed/
│
├── edge-ai/
│   ├── app/
│   │   ├── main.py
│   │   ├── extractor.py
│   │   ├── snapdragon_engine.py
│   │   └── geniex_client.py
│   │
│   ├── model_config.py
│   └── .gitignore
│
└── README.md
```

---

## Running Locally

### 1. Frontend

```bash
cd frontend
npm install
npm run dev
```

### 2. Backend

```bash
cd backend
npm install
npm run dev
```

### 3. Edge AI Service

Activate the Python virtual environment:

```bash
cd edge-ai
.venv\Scripts\activate
```

Run:

```bash
uvicorn app.main:app --reload --port 8001
```

The Edge AI service runs at:

```text
http://127.0.0.1:8001
```

---

## Snapdragon Deployment

For Snapdragon-powered Windows ARM64 systems:

1. Install the supported GenieX runtime.
2. Place the Qwen3-1.7B QAIRT model bundle on the machine.
3. Configure the model path.
4. Start the GenieX service.
5. Start the Forma AI Edge AI service.
6. Forma AI detects the Snapdragon environment.
7. Extraction requests are routed to GenieX.

The application status panel indicates whether the current environment is using the Snapdragon runtime or development fallback.

---

## Current Snapdragon Target

| Component            | Configuration      |
| -------------------- | ------------------ |
| Model                | Qwen3-1.7B         |
| Quantization         | W4A16              |
| Runtime              | GenieX QAIRT       |
| Hardware             | Snapdragon X Elite |
| Accelerator          | Snapdragon NPU     |
| Development fallback | Gemini             |

---

## Qualcomm AI Hub

The Snapdragon model configuration and performance data are based on the Qualcomm AI Hub model catalog.

The selected Qwen3-1.7B configuration targets Snapdragon X Elite using W4A16 and GenieX QAIRT.

Performance figures from Qualcomm AI Hub are used as hardware/model reference data. Application-level extraction accuracy and end-to-end performance should be measured separately on the final Snapdragon device.

---

## Important Note

The current development environment is a non-Snapdragon Windows machine.

Snapdragon NPU execution is intended to be validated on a supported Snapdragon Windows ARM64 device before the final demonstration.

This project does not claim Snapdragon NPU execution during development on unsupported hardware.

---

## Future Improvements

* More insurance workflow templates
* Additional local models
* Improved natural-language date and entity normalization
* Extraction confidence indicators
* Offline-first claim processing
* More extensive Snapdragon performance benchmarking
* Additional edge-AI optimization

---

## Author

**Hiba Khan**

Forma AI — AI-Augmented Dynamic Form Engine
