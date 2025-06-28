# Start-CardHood.ps1
param([switch]$Development, [switch]$Production)

Write-Host " STARTING CARDHOOD PLATFORM" -ForegroundColor Magenta
Write-Host "Theme: Periwinkle & Black" -ForegroundColor Cyan

if ($Development) {
    Write-Host "Starting development servers..." -ForegroundColor Yellow
    Start-Process "cmd" -ArgumentList "/c", "npm run dev" -WindowStyle Normal
    Start-Sleep 3
    Write-Host " Development servers started!" -ForegroundColor Green
    Write-Host " Frontend: http://localhost:3000" -ForegroundColor Cyan
    Write-Host " Backend: http://localhost:5000" -ForegroundColor Cyan
} else {
    Write-Host "Starting production server..." -ForegroundColor Yellow
    npm start
}
