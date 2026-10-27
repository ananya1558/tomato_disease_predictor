@echo off
set "SCRIPT_DIR=%~dp0"
cd /d "%SCRIPT_DIR%"
echo ===================================================
echo Uploading to GitHub: https://github.com/ananya1558/tomato-disease-predictor.git
echo ===================================================
git push -u origin main
echo.
if %ERRORLEVEL% equ 0 (
    echo [SUCCESS] Project successfully uploaded to GitHub!
) else (
    echo [NOTE] If you haven't created the repository on GitHub yet:
    echo 1. Go to https://github.com/new
    echo 2. Set Repository name to: tomato-disease-predictor
    echo 3. Keep it Public and DO NOT check "Add README" or ".gitignore"
    echo 4. Click "Create repository"
    echo 5. Run this file again!
)
pause
