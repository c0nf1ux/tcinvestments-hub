# Train-AIModels.ps1 - Train the advanced prediction models
param(
    [switch]$FullTraining,
    [switch]$QuickTrain,
    [int]$Epochs = 100
)

Write-Host " Training CardHood AI Prediction Models..." -ForegroundColor Magenta
Write-Host "===========================================" -ForegroundColor Cyan

$BaseDir = Get-Location
$ServicesDir = "$BaseDir\server\services"

if (Test-Path "$ServicesDir\generateTrainingData.js") {
    Write-Host " Generating AI training data..." -ForegroundColor Yellow
    Set-Location $ServicesDir
    
    if ($FullTraining) {
        node generateTrainingData.js 10000
        Write-Host " Generated 10,000 training samples for full training" -ForegroundColor Green
    } elseif ($QuickTrain) {
        node generateTrainingData.js 1000
        Write-Host " Generated 1,000 training samples for quick training" -ForegroundColor Green
    } else {
        node generateTrainingData.js 5000
        Write-Host " Generated 5,000 training samples for standard training" -ForegroundColor Green
    }
    
    Set-Location $BaseDir
    Write-Host " AI training data ready!" -ForegroundColor Green
} else {
    Write-Host " Training data generator not found!" -ForegroundColor Red
    Write-Host "Please run Deploy-AdvancedAI-Fixed.ps1 first" -ForegroundColor Yellow
}

Write-Host ""
Write-Host " Next Steps:" -ForegroundColor Yellow
Write-Host "1. Start backend server: npm run server" -ForegroundColor White
Write-Host "2. AI models will auto-train on startup" -ForegroundColor White
Write-Host "3. Advanced predictions now available!" -ForegroundColor White
