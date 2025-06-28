# Test-AI-Functions.ps1 - Advanced AI Testing Functions

function Test-SinglePrediction {
   param([string]$CardId = "black-lotus")
   
   Write-Host " Testing single prediction for: $CardId" -ForegroundColor Yellow
   $Response = curl "http://localhost:5000/api/charts/prediction/$CardId" | ConvertFrom-Json
   
   Write-Host "  Card: $($Response.cardId)" -ForegroundColor White
   Write-Host "  Direction: $($Response.direction)" -ForegroundColor $(if($Response.direction -eq 'up'){'Green'}else{'Red'})
   Write-Host "  Confidence: $($Response.confidence)%" -ForegroundColor Yellow
   Write-Host "  Target Price: $($Response.targetPrice)" -ForegroundColor Cyan
   Write-Host "  Risk Level: $($Response.riskLevel)" -ForegroundColor Magenta
}

function Test-BatchPredictions {
   Write-Host " Testing batch predictions..." -ForegroundColor Yellow
   
   $BatchData = @{
       cardIds = @("black-lotus", "time-walk", "ancestral-recall", "mox-ruby", "lightning-bolt")
   } | ConvertTo-Json
   
   $Response = curl -Method POST -Uri "http://localhost:5000/api/charts/predictions/batch" -Body $BatchData -ContentType "application/json" | ConvertFrom-Json
   
   Write-Host "  Batch Size: $($Response.batchSize)" -ForegroundColor Green
   foreach ($prediction in $Response.predictions) {
       Write-Host "    $($prediction.cardId): $($prediction.direction) ($($prediction.confidence)%)" -ForegroundColor White
   }
}

function Test-ChartData {
   param([string]$CardId = "black-lotus")
   
   Write-Host " Testing chart data for: $CardId" -ForegroundColor Yellow
   $Response = curl "http://localhost:5000/api/charts/data/$CardId" | ConvertFrom-Json
   
   Write-Host "  Card: $($Response.card.name)" -ForegroundColor White
   Write-Host "  Current Price: $($Response.card.currentPrice)" -ForegroundColor Green
   Write-Host "  Data Points: $($Response.data.Count)" -ForegroundColor Cyan
}

function Test-Analytics {
   Write-Host " Testing AI performance analytics..." -ForegroundColor Yellow
   $Response = curl "http://localhost:5000/api/analytics/performance" | ConvertFrom-Json
   
   Write-Host "  Total Predictions: $($Response.totalPredictions)" -ForegroundColor Green
   Write-Host "  Accuracy Rate: $($Response.accuracyRate)%" -ForegroundColor Yellow
   Write-Host "  Average Confidence: $($Response.averageConfidence)%" -ForegroundColor Cyan
   Write-Host "  Top Performing Cards:" -ForegroundColor Magenta
   foreach ($card in $Response.topPerformingCards) {
       Write-Host "    $($card.name): $($card.accuracy)% accuracy" -ForegroundColor White
   }
}

function Test-AllFeatures {
   Write-Host " COMPREHENSIVE AI TESTING" -ForegroundColor Magenta
   Write-Host "=========================" -ForegroundColor Cyan
   
   Test-SinglePrediction "black-lotus"
   Write-Host ""
   Test-BatchPredictions
   Write-Host ""
   Test-ChartData "time-walk"
   Write-Host ""
   Test-Analytics
   
   Write-Host ""
   Write-Host " ALL AI FEATURES TESTED!" -ForegroundColor Green
}

Write-Host " AI Test Functions Loaded!" -ForegroundColor Green
Write-Host "Available commands:" -ForegroundColor Cyan
Write-Host "   Test-SinglePrediction [cardId]" -ForegroundColor White
Write-Host "   Test-BatchPredictions" -ForegroundColor White
Write-Host "   Test-ChartData [cardId]" -ForegroundColor White
Write-Host "   Test-Analytics" -ForegroundColor White
Write-Host "   Test-AllFeatures" -ForegroundColor White
