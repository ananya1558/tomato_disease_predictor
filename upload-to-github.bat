@echo off
set "SCRIPT_DIR=%~dp0"
cd /d "%SCRIPT_DIR%"
echo ===================================================
echo Uploading to GitHub: https://github.com/ananya1558/tomato_disease_predictor.git
echo ===================================================
git push -u origin main
echo.
if %ERRORLEVEL% equ 0 (
    echo [SUCCESS] Project successfully uploaded to GitHub!
) else (
    echo [ERROR] Push failed. Please check your network and credentials.
)
pause
