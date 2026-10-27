import torch
import json
import numpy as np

from PIL import Image
from torchvision import transforms

from model import TomatoDiseaseModel

# Device setup
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Load model info
with open("model_info.json") as f:
    info = json.load(f)

short_names = info["short_names"]

# Load treatment knowledge base
with open("treatment_kb.json") as f:
    treatment_kb = json.load(f)

# Load model
model = TomatoDiseaseModel()

checkpoint = torch.load("best_model.pth", map_location=device)
model.load_state_dict(checkpoint["model_state_dict"])

model.to(device)
model.eval()

# Image preprocessing
transform = transforms.Compose([
    transforms.Resize((260, 260)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

# Prediction function
def predict(image):

    img = transform(image).unsqueeze(0).to(device)

    with torch.no_grad():
        output = model(img)
        scores = torch.sigmoid(output).cpu().numpy()[0]

    results = []

    for i, score in enumerate(scores):
        disease = short_names[i]

        # Optional debug (prints missing treatments)
        if disease not in treatment_kb:
            print("Missing treatment for:", disease)

        results.append({
            "disease": disease,
            "confidence": float(score),
            "treatment": treatment_kb.get(disease, "No treatment info available")
        })

    # Sort by confidence (highest first)
    results.sort(key=lambda x: x["confidence"], reverse=True)

    return results[:3]