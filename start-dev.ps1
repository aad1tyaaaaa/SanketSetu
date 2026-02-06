# SanketSetu Development Server Launcher
# This script adds Node.js to PATH and starts the dev server

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  SanketSetu - Development Server" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Add Node.js to PATH for this session
$env:PATH = "C:\Program Files\nodejs;" + $env:PATH

# Verify Node.js is available
try {
    $nodeVersion = & node --version
    $npmVersion = & npm --version
    
    Write-Host "✓ Node.js version: $nodeVersion" -ForegroundColor Green
    Write-Host "✓ npm version: $npmVersion" -ForegroundColor Green
    Write-Host ""
} catch {
    Write-Host "✗ ERROR: Node.js not found!" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "Starting development server..." -ForegroundColor Yellow
Write-Host ""
Write-Host "The app will be available at:" -ForegroundColor Cyan
Write-Host "  - Local:   http://localhost:3000" -ForegroundColor White
Write-Host "  - Network: http://172.22.64.1:3000" -ForegroundColor White
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

& npm run dev
