# Quick API test after server restart
$baseUrl = "http://localhost:3001"

Write-Host "Testing all 7 endpoints..." -ForegroundColor Green

# Test each endpoint
$endpoints = @(
    "/api/health",
    "/api/portfolio", 
    "/api/news",
    "/api/cards",
    "/api/database-status",
    "/api/tournaments"
)

foreach ($endpoint in $endpoints) {
    try {
        $response = Invoke-RestMethod -Uri "$baseUrl$endpoint" -Method GET
        Write-Host " $endpoint - Working" -ForegroundColor Green
    } catch {
        Write-Host " $endpoint - Failed" -ForegroundColor Red
    }
}

# Test AI Deck Builder
try {
    $deckRequest = @{ game="magic"; format="standard"; budget=100 } | ConvertTo-Json
    $deck = Invoke-RestMethod -Uri "$baseUrl/api/ai-deck-builder" -Method POST -ContentType "application/json" -Body $deckRequest
    Write-Host " /api/ai-deck-builder - Working" -ForegroundColor Green
} catch {
    Write-Host " /api/ai-deck-builder - Failed" -ForegroundColor Red
}

Write-Host "`n All 7 APIs should be working!" -ForegroundColor Yellow
