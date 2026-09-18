from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from app.extractor import extract_claim_data
from app.snapdragon_engine import get_engine_status


app = FastAPI(title="Forma AI Edge Engine")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ExtractionRequest(BaseModel):
    story: str
    fields: list[dict]


@app.get("/")
def health():
    return {
        "status": "online",
        "engine": "Forma AI Edge Engine"
    }


@app.get("/status")
def status():
    return get_engine_status()


@app.post("/extract")
def extract(request: ExtractionRequest):
    result = extract_claim_data(
        request.story,
        request.fields
    )

    return {
        "success": True,
        "data": result
    }