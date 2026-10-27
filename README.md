# 🍅 Tomato Leaf Disease Predictor

An end-to-end AI-powered Tomato Leaf Disease Detection and Diagnosis platform built with **PyTorch (EfficientNet-B2)**, **FastAPI**, **Express.js**, and a modern **React** frontend.

---

## 🌟 Key Features

- **Deep Learning Vision**: Uses an EfficientNet-B2 convolutional neural network fine-tuned to classify 10 distinct tomato leaf health conditions and diseases.
- **FastAPI ML Service**: High-performance Python backend serving the model via asynchronous REST endpoints with top-3 confidence scoring.
- **Treatment Knowledge Base**: Built-in treatment recommendations database providing actionable remedies for detected diseases.
- **Modern Responsive Dashboard**: Interactive React dashboard with drag-and-drop leaf image scanning, live diagnosis reports, disease library database, and scan history.
- **One-Click Launch**: Includes Windows launcher scripts (`start.bat` and `start.ps1`) to boot all services simultaneously.

---

## 🔬 Supported Disease Classes

The model diagnoses 10 tomato plant conditions:
1. Bacterial Spot (*Xanthomonas*)
2. Early Blight (*Alternaria solani*)
3. Late Blight (*Phytophthora infestans*)
4. Leaf Mold (*Passalora fulva*)
5. Septoria Leaf Spot (*Septoria lycopersici*)
6. Spider Mites (*Two-spotted spider mite*)
7. Target Spot (*Corynespora cassiicola*)
8. Tomato Yellow Leaf Curl Virus (TYLCV)
9. Tomato Mosaic Virus (ToMV)
10. Healthy Tomato Leaf

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
└── README.md
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
This will automatically launch all 3 services in separate terminal windows.

### 3. Manual Step-by-Step Launch

#### A. Start ML Backend (FastAPI)
```bash
cd ml-service
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```
- API Documentation (Swagger): [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

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
      "disease": "Early Blight",
      "confidence": 0.942,
      "treatment": "Remove infected lower leaves; apply copper-based fungicide; ensure adequate plant spacing."
    }
  ]
}
```

### `GET /treatment/{disease_name}`
Retrieves treatment information for a specific disease.

---

## 📄 License
This project is open-source under the ISC License.
