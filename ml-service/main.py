from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

from PIL import Image

import io
import json

from predictor import predict

# -----------------------------
# LOAD TREATMENT DATABASE
# -----------------------------
with open("treatment_kb.json", "r") as f:
    treatment_db = json.load(f)

# -----------------------------
# FASTAPI APP
# -----------------------------
app = FastAPI()

# -----------------------------
# CORS
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

# -----------------------------
# PREDICTION API
# -----------------------------
@app.post("/predict")
async def predict_leaf(file: UploadFile = File(...)):

    contents = await file.read()

    image = Image.open(io.BytesIO(contents)).convert("RGB")

    result = predict(image)

    return {
        "prediction": result
    }

# -----------------------------
# TREATMENT API
# -----------------------------
@app.get("/treatment/{disease_name}")
def get_treatment(disease_name: str):

    treatment = treatment_db.get(disease_name)

    if not treatment:
        return {
            "message": "Treatment not found"
        }

    return treatment