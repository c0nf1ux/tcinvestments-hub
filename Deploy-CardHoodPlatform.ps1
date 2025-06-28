# Deploy-CardHoodPlatform.ps1
param(
    [switch]$EnableAll,
    [string]$Theme = "PeriwinkleBlack",
    [switch]$AIModels,
    [switch]$IPOSystem,
    [switch]$TradingViewCharts,
    [switch]$RealTimeData,
    [switch]$Development
)

Write-Host " DEPLOYING CARDHOOD PLATFORM" -ForegroundColor Magenta
Write-Host "Theme: Periwinkle & Black" -ForegroundColor Cyan

# Create project structure
$directories = @("src", "client", "server", "scripts", "data")
foreach ($dir in $directories) {
    if (!(Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force }
}

# Create package.json
@"
{
  "name": "cardhood",
  "version": "1.0.0",
  "description": "AI-Powered Robinhood for Trading Cards",
  "scripts": {
    "start": "node server.js",
    "dev": "concurrently \"npm run server\" \"npm run client\"",
    "server": "nodemon server.js",
    "client": "cd client && npm start"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "ws": "^8.14.0",
    "concurrently": "^8.2.1",
    "nodemon": "^3.0.1"
  }
}
"@ | Out-File -FilePath "package.json" -Encoding UTF8

Write-Host " CardHood Platform Structure Created!" -ForegroundColor Green
Write-Host "Run: npm install" -ForegroundColor Yellow
Write-Host "Then: .\Deploy-ReactClient.ps1" -ForegroundColor Yellow
