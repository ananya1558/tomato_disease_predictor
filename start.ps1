$root = $PSScriptRoot
Write-Host "========================================" -ForegroundColor Green
Write-Host " Starting Tomato Disease Predictor App " -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green

Write-Host "1. Launching ML Service (FastAPI on Port 8000)..." -ForegroundColor Cyan
Start-Process -FilePath "powershell.exe" -ArgumentList "-NoExit", "-Command", "`$Host.UI.RawUI.WindowTitle = 'ML Service (FastAPI)'; Set-Location '$root\ml-service'; py -3.13 -m uvicorn main:app --reload --port 8000"

Write-Host "2. Launching Express Server (Port 5001)..." -ForegroundColor Cyan
Start-Process -FilePath "powershell.exe" -ArgumentList "-NoExit", "-Command", "`$Host.UI.RawUI.WindowTitle = 'Express Server'; Set-Location '$root\server'; & 'C:\Program Files\nodejs\node.exe' server.js"

Write-Host "3. Launching React Frontend (Port 3000)..." -ForegroundColor Cyan
Start-Process -FilePath "powershell.exe" -ArgumentList "-NoExit", "-Command", "`$Host.UI.RawUI.WindowTitle = 'React Frontend'; Set-Location '$root\frontend'; & 'C:\Program Files\nodejs\npm.cmd' start"

Write-Host "`nAll 3 services are opening in separate windows!" -ForegroundColor Yellow
Write-Host "- ML API Docs:    http://127.0.0.1:8000/docs"
Write-Host "- Express Proxy:  http://localhost:5001"
Write-Host "- Frontend Web:   http://localhost:3000`n"
