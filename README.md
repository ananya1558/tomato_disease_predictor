# 🍅 Tomato Leaf Disease Predictor

> 🎓 **Final Year Engineering Capstone Project**  
> An end-to-end AI-powered Tomato Leaf Disease Detection and Agricultural Diagnosis platform built with **PyTorch (EfficientNet-B2)**, **FastAPI**, **Express.js**, and a modern **React** web dashboard.

---

## 🎓 Final Year Project Overview

This system was engineered as a **Final Year Engineering Capstone Project** to solve critical challenges in automated plant pathology and crop disease management. Early detection of leaf diseases in tomato crops allows agriculturalists to prevent widespread blight, minimize pesticide overuse, and boost crop yields.

### 🎯 Key Academic & Technical Highlights
- **Deep Transfer Learning**: Leverages an **EfficientNet-B2** convolutional neural network backbone with custom regularization (Dropout 0.3/0.2) and fine-tuned classification heads.
- **Robust Model Performance**:
  - **Weighted F1-Score**: **`99.18%`**
  - **Macro F1-Score**: **`98.87%`**
  - **Best Validation Loss**: **`0.0054`** (at Epoch 15)
- **Production Architecture**: Decoupled multi-tier system with an asynchronous **FastAPI** inference engine, an **Express.js** API proxy, and a reactive **React 19** frontend.
- **Agricultural Remedy Knowledge Base**: Translates model predictions into actionable treatments, including chemical fungicides, organic sprays, prevention measures, and expected recovery windows.

---

## 🌟 Key Features

- **Deep Learning Vision**: Classifies tomato leaf photographs into 10 categories with top-3 probability confidence scores.
- **Interactive Web Dashboard**: Drag-and-drop leaf image scanner with scanning animations, live diagnostic report cards, disease library reference, and scan history logs.
- **Integrated Treatment Database**: Instant access to recommended medicines, organic treatments, recovery timelines, and urgency levels.
- **Automated Windows Launch**: Includes [`start.bat`](start.bat) and [`start.ps1`](start.ps1) to spin up all services simultaneously.

---

## 🔬 Supported Disease Classes

The model diagnoses 10 tomato plant conditions:
1. **Bacterial Spot** (*Xanthomonas spp.*)
2. **Early Blight** (*Alternaria solani*)
3. **Late Blight** (*Phytophthora infestans*)
4. **Leaf Mold** (*Passalora fulva*)
5. **Septoria Leaf Spot** (*Septoria lycopersici*)
6. **Spider Mites** (*Two-spotted spider mite / Tetranychus urticae*)
7. **Target Spot** (*Corynespora cassiicola*)
8. **Tomato Yellow Leaf Curl Virus** (TYLCV)
9. **Tomato Mosaic Virus** (ToMV)
10. **Healthy Leaf** (Normal control specimen)

---

## 🏗️ System Architecture

```
tomato-disease-predictor/
├── frontend/             # React 19 web application (Port 3000)
│   ├── public/
│   └── src/
│       ├── App.js        # Main dashboard and scanner UI
│       └── App.css       # Custom glassmorphic styles & animations
├── ml-service/           # FastAPI Machine Learning Service (Port 8000)
│   ├── main.py           # FastAPI app & endpoints (/predict, /treatment)
│   ├── model.py          # PyTorch EfficientNet-B2 model definition
│   ├── predictor.py      # Inference & ranking pipeline
│   ├── model_info.json   # Model metadata and class mappings
│   ├── treatment_kb.json # Agricultural remedy knowledge base
│   └── requirements.txt  # Python ML dependencies
├── server/               # Express.js API proxy server (Port 5001)
│   └── server.js         # Multer file upload & axios proxy
├── start.bat             # Windows one-click startup batch script
├── start.ps1             # PowerShell multi-service runner
├── upload-to-github.bat  # Automated GitHub deployment helper
└── README.md             # Project documentation
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Python**: 3.12 or 3.13 (with `torch`, `fastapi`, `uvicorn`, `timm`, `pillow`)
- **Node.js**: v18+ (tested on Node v24 LTS)
- **Model Weights**: Place the trained weights `best_model.pth` in the `ml-service/` directory.

### 2. Automated Launch (Windows)
Double-click `start.bat` or run:
```powershell
.\start.ps1
```
This boots all 3 services in separate windows and opens the app at [http://localhost:3000](http://localhost:3000).

### 3. Manual Step-by-Step Launch

#### A. Start ML Backend (FastAPI)
```bash
cd ml-service
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```
- API Documentation (Swagger UI): [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

#### B. Start Express Proxy Server (Optional)
```bash
cd server
npm install
node server.js
```
- Server URL: [http://localhost:5001](http://localhost:5001)

#### C. Start React Frontend
```bash
cd frontend
npm install --legacy-peer-deps
npm start
```
- Web Application: [http://localhost:3000](http://localhost:3000)

---

## 📡 API Endpoints

### `POST /predict`
Uploads a leaf image and returns top 3 predictions with confidence scores and remedies.
- **Request**: `multipart/form-data` with `file: <binary image>`
- **Response**:
```json
{
  "prediction": [
    {
      "disease": "Target Spot",
      "confidence": 0.739,
      "treatment": {
        "severity": "Medium",
        "description": "Fungal disease causing brown spots with concentric rings.",
        "medicines": ["Fluxapyroxad fungicide", "Boscalid fungicide spray"],
        "organic_solutions": ["Copper-based fungicide spray", "Trichoderma biofungicide"],
        "prevention": ["Remove infected leaves", "Avoid dense planting", "Apply mulch"],
        "recovery_time": "5-10 days",
        "urgency": "Act within 1 week"
      }
    }
  ]
}
```

### `GET /treatment/{disease_name}`
Retrieves treatment information for a specific disease.

---

## 👩‍💻 Author
- **Ananya**  
- Final Year Project / Capstone Project  
- GitHub: [@ananya1558](https://github.com/ananya1558)

---

## 📄 License
This project is open-source under the ISC License.
