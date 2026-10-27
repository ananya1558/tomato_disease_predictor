const express = require("express");
const cors = require("cors");
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data"); // ✅ IMPORTANT

const app = express();
app.use(cors());

const upload = multer();

app.post("/detect", upload.single("image"), async (req, res) => {
  try {
    const formData = new FormData();

    // ✅ send buffer properly
    formData.append("file", req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });

    const response = await axios.post(
      "http://127.0.0.1:8000/predict", // ⚠️ FIX PORT (your FastAPI is 8000, not 8001)
      formData,
      {
        headers: formData.getHeaders(),
      }
    );

    res.json(response.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "ML request failed" });
  }
});

app.listen(5001, () =>
  console.log("Server running on port 5001")
);