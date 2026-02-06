@echo off
REM SanketSetu Development Server Launcher
REM This script adds Node.js to PATH and starts the dev server

echo ========================================
echo   SanketSetu - Development Server
echo ========================================
echo.

REM Add Node.js to PATH for this session
set "PATH=C:\Program Files\nodejs;%PATH%"

REM Verify Node.js is available
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js not found!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js version:
node --version
echo.
echo npm version:
npm --version
echo.

echo Starting development server...
echo.
echo The app will be available at:
echo   - Local:   http://localhost:3000
echo   - Network: http://172.22.64.1:3000
echo.
echo Press Ctrl+C to stop the server
echo.

npm run dev
