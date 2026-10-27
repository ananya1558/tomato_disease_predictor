
// import { useState, useRef } from "react"
// import axios from "axios"
// import "./App.css"

// const MOCK_HISTORY = [
//   { name: "Sample_leaf_01.jpg", disease: "Early Blight", confidence: 91, time: "2m ago" },
//   { name: "tomato_scan.png", disease: "Healthy", confidence: 98, time: "1h ago" },
// ]

// function App() {

//   const [image, setImage] = useState(null)
//   const [preview, setPreview] = useState(null)
//   const [result, setResult] = useState(null)
//   const [loading, setLoading] = useState(false)
//   const [dragging, setDragging] = useState(false)
//   const [activeTab, setActiveTab] = useState("scan")
//   const [history] = useState(MOCK_HISTORY)

//   const fileInputRef = useRef()

//   const handleFile = (file) => {
//     if (!file) return

//     setImage(file)
//     setResult(null)

//     const reader = new FileReader()

//     reader.onload = (e) => setPreview(e.target.result)

//     reader.readAsDataURL(file)
//   }

//   const uploadImage = async () => {

//     if (!image) return

//     setLoading(true)

//     try {

//       const formData = new FormData()

//       formData.append("image", image)

//       const res = await axios.post(
//         "http://localhost:5001/detect",
//         formData
//       )

//       setResult(res.data)

//     } catch (e) {
//       console.error(e)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="app">

//       {/* Background */}
//       <div className="orb orb-1" />
//       <div className="orb orb-2" />
//       <div className="orb orb-3" />

//       {/* Sidebar */}
//       <aside className="sidebar">

//         <div className="brand">
//           <div className="brand-icon">🍅</div>

//           <div>
//             <div className="brand-name">TomatoScan</div>
//             <div className="brand-sub">AI Pathology Lab</div>
//           </div>
//         </div>

//         <nav className="sidenav">

//           {[
//             { id: "scan", icon: "⬡", label: "Scanner" },
//             { id: "history", icon: "◷", label: "History" },
//             { id: "library", icon: "⬢", label: "Disease DB" },
//             { id: "settings", icon: "⚙", label: "Settings" },
//           ].map((item) => (

//             <button
//               key={item.id}
//               className={`nav-item ${activeTab === item.id ? "active" : ""}`}
//               onClick={() => setActiveTab(item.id)}
//             >
//               <span className="nav-icon">{item.icon}</span>
//               <span>{item.label}</span>
//             </button>

//           ))}

//         </nav>

//         <div className="sidebar-footer">
//           <div className="model-badge">
//             <span className="pulse-dot" />
//             Gemini + CNN Active
//           </div>

//           <div className="accuracy-chip">
//             AI Powered
//           </div>
//         </div>

//       </aside>

//       {/* Main */}
//       <main className="main">

//         <header className="topbar">

//           <div className="topbar-left">
//             <h1 className="page-title">
//               Tomato Leaf Disease Detection
//             </h1>

//             <span className="page-sub">
//               Powered by Deep Learning + Gemini AI
//             </span>
//           </div>

//           <div className="topbar-right">
//             <button className="icon-btn">🔔</button>
//             <button className="icon-btn">?</button>
//             <div className="avatar">AG</div>
//           </div>

//         </header>

//         {/* SCAN PAGE */}
//         {activeTab === "scan" && (

//           <div className="scan-layout">

//             {/* LEFT PANEL */}
//             <section className="panel upload-panel">

//               <div className="panel-header">
//                 <span className="panel-tag">INPUT</span>
//                 <h2>Upload Tomato Leaf</h2>
//               </div>

//               <div
//                 className={`dropzone ${dragging ? "dragging" : ""} ${preview ? "has-preview" : ""}`}

//                 onDragOver={(e) => {
//                   e.preventDefault()
//                   setDragging(true)
//                 }}

//                 onDragLeave={() => setDragging(false)}

//                 onDrop={(e) => {
//                   e.preventDefault()
//                   setDragging(false)
//                   handleFile(e.dataTransfer.files[0])
//                 }}

//                 onClick={() => !preview && fileInputRef.current.click()}
//               >

//                 <input
//                   ref={fileInputRef}
//                   type="file"
//                   accept="image/*"
//                   style={{ display: "none" }}
//                   onChange={(e) => handleFile(e.target.files[0])}
//                 />

//                 {preview ? (

//                   <div className="preview-container">

//                     <img
//                       src={preview}
//                       alt="Leaf Preview"
//                       className="preview-img"
//                     />

//                     <div className="preview-overlay">
//                       <div className="scan-line" />
//                     </div>

//                     <div className="preview-meta">
//                       <span>📄 {image?.name}</span>
//                       <span>{(image?.size / 1024).toFixed(1)} KB</span>
//                     </div>

//                   </div>

//                 ) : (

//                   <div className="drop-placeholder">

//                     <div className="drop-icon">🍃</div>

//                     <p className="drop-text">
//                       Drop leaf image here
//                     </p>

//                     <p className="drop-sub">
//                       JPG, PNG, WEBP Supported
//                     </p>

//                   </div>

//                 )}

//               </div>

//               <div className="upload-actions">

//                 {preview && (
//                   <button
//                     className="btn-ghost"
//                     onClick={() => {
//                       setPreview(null)
//                       setImage(null)
//                       setResult(null)
//                     }}
//                   >
//                     ✕ Clear
//                   </button>
//                 )}

//                 <button
//                   className="btn-ghost"
//                   onClick={() => fileInputRef.current.click()}
//                 >
//                   ↑ Browse
//                 </button>

//                 <button
//                   className={`btn-primary ${loading ? "loading" : ""}`}
//                   onClick={uploadImage}
//                   disabled={!image || loading}
//                 >

//                   {loading ? (
//                     <>
//                       <span className="spinner" />
//                       Analyzing...
//                     </>
//                   ) : (
//                     <>
//                       ⬡ Run Analysis
//                     </>
//                   )}

//                 </button>

//               </div>

//             </section>

//             {/* RIGHT PANEL */}
//             <section className="panel results-panel">

//               <div className="panel-header">
//                 <span className="panel-tag">OUTPUT</span>
//                 <h2>Diagnosis Report</h2>
//               </div>

//               {!result && !loading && (

//                 <div className="empty-state">
//                   <div className="empty-icon">🔬</div>

//                   <p>
//                     Upload a tomato leaf image to begin AI analysis.
//                   </p>
//                 </div>

//               )}

//               {loading && (

//                 <div className="loading-state">

//                   <div className="dna-loader">
//                     {[...Array(8)].map((_, i) => (
//                       <div
//                         key={i}
//                         className="dna-bar"
//                         style={{ animationDelay: `${i * 0.1}s` }}
//                       />
//                     ))}
//                   </div>

//                   <p>Scanning leaf tissue...</p>

//                   <p className="loading-sub">
//                     Running CNN + Gemini AI analysis
//                   </p>

//                 </div>

//               )}

//               {result && (

//                 <div className="results-list">

//                   {/* ML RESULT */}
//                   <div className="result-card animate-in">

//                     <div className="result-card-header">

//                       <div>
//                         <div className="disease-rank">
//                           CNN MODEL RESULT
//                         </div>

//                         <h3 className="disease-name">
//                           {result.ml_prediction?.[0]?.disease || "Unknown"}
//                         </h3>
//                       </div>

//                       <div className="severity-badge moderate">
//                         AI Model
//                       </div>

//                     </div>

//                     <div className="confidence-bar-wrap">

//                       <div className="confidence-labels">
//                         <span>Confidence</span>

//                         <span className="confidence-val high">
//                           {(
//                             (result.ml_prediction?.[0]?.confidence || 0) * 100
//                           ).toFixed(1)}%
//                         </span>
//                       </div>

//                       <div className="confidence-track">

//                         <div
//                           className="confidence-fill high"
//                           style={{
//                             width: `${(result.ml_prediction?.[0]?.confidence || 0) * 100}%`
//                           }}
//                         />

//                       </div>

//                     </div>

//                   </div>

//                   {/* GEMINI REPORT */}
//                   <div className="result-card animate-in">

//                     <div className="result-card-header">

//                       <div>
//                         <div className="disease-rank">
//                           GEMINI AI REPORT
//                         </div>

//                         <h3 className="disease-name">
//                           Smart Disease Analysis
//                         </h3>
//                       </div>

//                       <div className="severity-badge severe">
//                         Gemini AI
//                       </div>

//                     </div>

//                     <div className="result-desc">

//                       <pre
//                         style={{
//                           whiteSpace: "pre-wrap",
//                           fontFamily: "inherit",
//                           lineHeight: "1.7",
//                           color: "white"
//                         }}
//                       >
//                         {result.gemini_prediction}
//                       </pre>

//                     </div>

//                   </div>

//                 </div>

//               )}

//             </section>

//           </div>

//         )}

//         {/* HISTORY */}
//         {activeTab === "history" && (

//           <div className="panel history-panel">

//             <div className="panel-header">
//               <span className="panel-tag">LOG</span>
//               <h2>Recent Scans</h2>
//             </div>

//             <table className="history-table">

//               <thead>
//                 <tr>
//                   <th>File</th>
//                   <th>Disease</th>
//                   <th>Confidence</th>
//                   <th>Time</th>
//                 </tr>
//               </thead>

//               <tbody>

//                 {history.map((h, i) => (

//                   <tr key={i}>
//                     <td>{h.name}</td>
//                     <td>{h.disease}</td>
//                     <td>{h.confidence}%</td>
//                     <td>{h.time}</td>
//                   </tr>

//                 ))}

//               </tbody>

//             </table>

//           </div>

//         )}

//         {/* LIBRARY */}
//         {activeTab === "library" && (

//           <div className="panel library-panel">

//             <div className="panel-header">
//               <span className="panel-tag">DATABASE</span>
//               <h2>Tomato Disease Library</h2>
//             </div>

//             <div className="disease-grid">

//               {[
//                 "Early Blight",
//                 "Late Blight",
//                 "Leaf Mold",
//                 "Bacterial Spot",
//                 "Mosaic Virus",
//                 "Healthy",
//               ].map((disease, i) => (

//                 <div className="disease-card" key={i}>
//                   <div className="disease-card-icon">🍅</div>
//                   <h4>{disease}</h4>
//                 </div>

//               ))}

//             </div>

//           </div>

//         )}

//         {/* SETTINGS */}
//         {activeTab === "settings" && (

//           <div className="panel settings-panel">

//             <div className="panel-header">
//               <span className="panel-tag">CONFIG</span>
//               <h2>Settings</h2>
//             </div>

//             <div className="settings-list">

//               <div className="setting-row">
//                 <div>
//                   <div className="setting-label">
//                     API Endpoint
//                   </div>

//                   <div className="setting-desc">
//                     Backend Detection API
//                   </div>
//                 </div>

//                 <input
//                   type="text"
//                   className="text-input"
//                   value="http://localhost:5001/detect"
//                   readOnly
//                 />

//               </div>

//             </div>

//           </div>

//         )}

//       </main>

//     </div>
//   )
// }

// export default App



//---------------------------------------------------------

import { useState, useRef } from "react"
import axios from "axios"
import "./App.css"

const MOCK_HISTORY = [
  {
    name: "Sample_leaf_01.jpg",
    disease: "Early Blight",
    confidence: 91,
    time: "2m ago",
  },
  {
    name: "tomato_scan.png",
    disease: "Healthy",
    confidence: 98,
    time: "1h ago",
  },
]

function App() {

  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [activeTab, setActiveTab] = useState("scan")

  const [history] = useState(MOCK_HISTORY)

  const fileInputRef = useRef()

  const handleFile = (file) => {

    if (!file) return

    setImage(file)
    setResult(null)

    const reader = new FileReader()

    reader.onload = (e) => setPreview(e.target.result)

    reader.readAsDataURL(file)
  }

  const uploadImage = async () => {

    if (!image) return

    setLoading(true)

    try {

      const formData = new FormData()

      formData.append("file", image)

      const res = await axios.post(
        "http://127.0.0.1:8000/predict",
        formData
      )

      setResult(res.data.prediction)

    } catch (e) {

      console.error(e)
      alert("Backend not running properly")

    } finally {

      setLoading(false)
    }
  }

  const getSeverityColor = (severity) => {

    const s = (severity || "").toLowerCase()

    if (s === "critical" || s === "high") return "severe"

    if (s === "medium" || s === "moderate") return "moderate"

    return "mild"
  }

  const getConfidenceTier = (c) => {

    if (c > 0.7) return { label: "High", cls: "high" }

    if (c > 0.4) return { label: "Medium", cls: "medium" }

    return { label: "Low", cls: "low" }
  }

  return (

    <div className="app">

      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* Sidebar */}

      <aside className="sidebar">

        <div className="brand">

          <div className="brand-icon">🍅</div>

          <div>
            <div className="brand-name">TomatoScan</div>
            <div className="brand-sub">AI Pathology Lab</div>
          </div>

        </div>

        <nav className="sidenav">

          {[
            { id: "scan", icon: "⬡", label: "Scanner" },
            { id: "history", icon: "◷", label: "History" },
            { id: "library", icon: "⬢", label: "Disease DB" },
            { id: "settings", icon: "⚙", label: "Settings" },
          ].map((item) => (

            <button
              key={item.id}
              className={`nav-item ${activeTab === item.id ? "active" : ""}`}
              onClick={() => setActiveTab(item.id)}
            >

              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>

            </button>

          ))}

        </nav>

        <div className="sidebar-footer">

          <div className="model-badge">
            <span className="pulse-dot" />
            Model v2.4 Active
          </div>

          <div className="accuracy-chip">
            97% Accuracy
          </div>

        </div>

      </aside>

      {/* Main */}

      <main className="main">

        <header className="topbar">

          <div className="topbar-left">

            <h1 className="page-title">
              Leaf Scanner
            </h1>

            <span className="page-sub">
              Powered by Deep Plant Vision
            </span>

          </div>

          <div className="topbar-right">

            <button className="icon-btn">🔔</button>

            <button className="icon-btn">?</button>

            <div className="avatar">AG</div>

          </div>

        </header>

        {/* SCAN PAGE */}

        {activeTab === "scan" && (

          <div className="scan-layout">

            {/* LEFT PANEL */}

            <section className="panel upload-panel">

              <div className="panel-header">

                <span className="panel-tag">INPUT</span>

                <h2>Upload Specimen</h2>

              </div>

              <div
                className={`dropzone ${dragging ? "dragging" : ""} ${preview ? "has-preview" : ""}`}

                onDragOver={(e) => {
                  e.preventDefault()
                  setDragging(true)
                }}

                onDragLeave={() => setDragging(false)}

                onDrop={(e) => {
                  e.preventDefault()
                  setDragging(false)
                  handleFile(e.dataTransfer.files[0])
                }}

                onClick={() => !preview && fileInputRef.current.click()}
              >

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => handleFile(e.target.files[0])}
                />

                {preview ? (

                  <div className="preview-container">

                    <img
                      src={preview}
                      alt="Leaf Preview"
                      className="preview-img"
                    />

                    <div className="preview-overlay">
                      <div className="scan-line" />
                    </div>

                    <div className="preview-meta">

                      <span>📄 {image?.name}</span>

                      <span>
                        {(image?.size / 1024).toFixed(1)} KB
                      </span>

                    </div>

                  </div>

                ) : (

                  <div className="drop-placeholder">

                    <div className="drop-icon">🍃</div>

                    <p className="drop-text">
                      Drop leaf image here
                    </p>

                    <p className="drop-sub">
                      JPG, PNG, WEBP Supported
                    </p>

                  </div>

                )}

              </div>

              <div className="upload-actions">

                {preview && (

                  <button
                    className="btn-ghost"
                    onClick={() => {
                      setPreview(null)
                      setImage(null)
                      setResult(null)
                    }}
                  >
                    ✕ Clear
                  </button>

                )}

                <button
                  className="btn-ghost"
                  onClick={() => fileInputRef.current.click()}
                >
                  ↑ Browse
                </button>

                <button
                  className={`btn-primary ${loading ? "loading" : ""}`}
                  onClick={uploadImage}
                  disabled={!image || loading}
                >

                  {loading ? (
                    <>
                      <span className="spinner" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      ⬡ Run Analysis
                    </>
                  )}

                </button>

              </div>

            </section>

            {/* RIGHT PANEL */}

            <section className="panel results-panel">

              <div className="panel-header">

                <span className="panel-tag">OUTPUT</span>

                <h2>Diagnosis Report</h2>

              </div>

              {!result && !loading && (

                <div className="empty-state">

                  <div className="empty-icon">🔬</div>

                  <p>
                    Upload a leaf image and run analysis.
                  </p>

                </div>

              )}

              {loading && (

                <div className="loading-state">

                  <p>Scanning leaf tissue...</p>

                </div>

              )}

              {result && (

                <div className="results-list">

                  {result.map((r, i) => {

                    const tier = getConfidenceTier(r.confidence)

                    const sevCls = getSeverityColor(
                      r.treatment?.severity
                    )

                    return (

                      <div
                        key={i}
                        className="result-card animate-in"
                      >

                        <div className="result-card-header">

                          <div>

                            <div className="disease-rank">
                              #{i + 1} MATCH
                            </div>

                            <h3 className="disease-name">
                              {r.disease}
                            </h3>

                          </div>

                          <div className={`severity-badge ${sevCls}`}>
                            {r.treatment?.severity || "Unknown"}
                          </div>

                        </div>

                        <div className="confidence-bar-wrap">

                          <div className="confidence-labels">

                            <span>Confidence</span>

                            <span className={`confidence-val ${tier.cls}`}>

                              {(r.confidence * 100).toFixed(1)}%

                            </span>

                          </div>

                          <div className="confidence-track">

                            <div
                              className={`confidence-fill ${tier.cls}`}
                              style={{
                                width: `${r.confidence * 100}%`
                              }}
                            />

                          </div>

                        </div>

                        <p className="result-desc">
                          {r.treatment?.description}
                        </p>

                        {/* TREATMENT PLAN */}

                        <details className="treatment-dropdown">

                          <summary className="btn-ghost sm">
                            View Treatment Plan
                          </summary>

                          <div className="treatment-content">

                            <h4>🧪 Recommended Medicines</h4>

                            <ul>

                              {r.treatment?.medicines?.map((med, idx) => (

                                <li key={idx}>{med}</li>

                              ))}

                            </ul>

                            <h4>🌿 Organic Solutions</h4>

                            <ul>

                              {r.treatment?.organic_solutions?.map((item, idx) => (

                                <li key={idx}>{item}</li>

                              ))}

                            </ul>

                            <h4>🛡 Prevention Tips</h4>

                            <ul>

                              {r.treatment?.prevention?.map((tip, idx) => (

                                <li key={idx}>{tip}</li>

                              ))}

                            </ul>

                            <p>
                              ⏳ Recovery Time:
                              <strong>
                                {" "}
                                {r.treatment?.recovery_time}
                              </strong>
                            </p>

                            <p>
                              🚨 Urgency:
                              <strong>
                                {" "}
                                {r.treatment?.urgency}
                              </strong>
                            </p>

                          </div>

                        </details>

                      </div>

                    )
                  })}

                </div>

              )}

            </section>

          </div>

        )}

      </main>

    </div>
  )
}

export default App







// import { useState } from "react"
// import axios from "axios"
// import "./App.css";

// function App() {

//   const [image,setImage]=useState(null)
//   const [result,setResult]=useState(null)

//   const uploadImage=async()=>{

//     const formData=new FormData()

//     formData.append("image",image)

//     const res=await axios.post(
//       "http://localhost:5001/detect",
//       formData
//     )

//     setResult(res.data.prediction)
//   }

//   return (

//     <div className="container">

//   <h1>🍅 Tomato Disease Detector</h1>

//   <input
//     type="file"
//     onChange={(e)=>setImage(e.target.files[0])}
//   />

//   <br />

//   <button onClick={uploadImage}>
//     Detect Disease
//   </button>

//   {result && result.map((r,i)=>{

//     let confidenceClass = "low";
//     if(r.confidence > 0.7) confidenceClass = "high";
//     else if(r.confidence > 0.4) confidenceClass = "medium";

//     return (
//       <div key={i} className="card">

//         <h3>{r.disease}</h3>

//         <p className={`confidence ${confidenceClass}`}>
//           Confidence: {(r.confidence*100).toFixed(2)}%
//         </p>

//         <p><strong>Severity:</strong> {r.treatment?.severity || "N/A"}</p>

//         <p>{r.treatment?.description || r.treatment}</p>

//       </div>
//     )
//   })}

// </div>
    
//   )
// }

// export default App