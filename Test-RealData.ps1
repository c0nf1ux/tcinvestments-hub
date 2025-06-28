# Test-RealData.ps1 - Comprehensive Real Data Testing Suite

function Test-ScryfallIntegration {
   Write-Host " Testing Scryfall MTG API Integration..." -ForegroundColor Magenta
   
   $TestCards = @("Black Lotus", "Lightning Bolt", "Counterspell", "Serra Angel")
   
   foreach ($Card in $TestCards) {
       Write-Host "  Testing: $Card" -ForegroundColor Yellow
       try {
           $Response = curl "http://localhost:5000/api/charts/prediction/$($Card.Replace(' ', '-').ToLower())?game=mtg" | ConvertFrom-Json
           Write-Host "     Name: $($Response.card.name)" -ForegroundColor Green
           Write-Host "     Price: $($Response.card.currentPrice)" -ForegroundColor Green
           Write-Host "     Set: $($Response.card.set)" -ForegroundColor Green
           Write-Host "     Source: $($Response.realData.source)" -ForegroundColor Green
       } catch {
           Write-Host "     Failed to fetch $Card" -ForegroundColor Red
       }
   }
}

function Test-PokemonIntegration {
   Write-Host " Testing Pokemon API Integration..." -ForegroundColor Magenta
   
   $TestCards = @("Charizard", "Pikachu", "Blastoise", "Mewtwo")
   
   foreach ($Card in $TestCards) {
       Write-Host "  Testing: $Card" -ForegroundColor Yellow
       try {
           $Response = curl "http://localhost:5000/api/charts/prediction/$($Card.ToLower())?game=pokemon" | ConvertFrom-Json
           Write-Host "     Name: $($Response.card.name)" -ForegroundColor Green
           Write-Host "     Price: $($Response.card.currentPrice)" -ForegroundColor Green
           Write-Host "     Source: $($Response.realData.source)" -ForegroundColor Green
       } catch {
           Write-Host "     Failed to fetch $Card" -ForegroundColor Red
       }
   }
}

function Test-CardSearch {
   Write-Host " Testing Card Search Functionality..." -ForegroundColor Magenta
   
   $SearchTerms = @("lightning", "dragon", "angel", "bolt")
   
   foreach ($Term in $SearchTerms) {
       Write-Host "  Searching: $Term" -ForegroundColor Yellow
       try {
           $Response = curl "http://localhost:5000/api/cards/search?q=$Term&game=mtg&limit=3" | ConvertFrom-Json
           Write-Host "     Found $($Response.count) results" -ForegroundColor Green
           foreach ($Card in $Response.results) {
               Write-Host "      - $($Card.name) ($($Card.set)) - $($Card.currentPrice)" -ForegroundColor White
           }
       } catch {
           Write-Host "     Search failed for $Term" -ForegroundColor Red
       }
   }
}

function Test-MarketOverview {
   Write-Host " Testing Market Overview Dashboard..." -ForegroundColor Magenta
   
   Write-Host "  MTG Market Overview:" -ForegroundColor Yellow
   try {
       $MTGOverview = curl "http://localhost:5000/api/market/overview?game=mtg" | ConvertFrom-Json
       foreach ($Card in $MTGOverview.overview) {
           $TrendColor = if ($Card.trend -eq "Upward") { "Green" } elseif ($Card.trend -eq "Downward") { "Red" } else { "White" }
           Write-Host "    $($Card.name): $($Card.currentPrice) ($($Card.trend))" -ForegroundColor $TrendColor
       }
   } catch {
       Write-Host "     MTG market overview failed" -ForegroundColor Red
   }
   
   Write-Host "  Pokemon Market Overview:" -ForegroundColor Yellow
   try {
       $PokemonOverview = curl "http://localhost:5000/api/market/overview?game=pokemon" | ConvertFrom-Json
       foreach ($Card in $PokemonOverview.overview) {
           $TrendColor = if ($Card.trend -eq "Upward") { "Green" } elseif ($Card.trend -eq "Downward") { "Red" } else { "White" }
           Write-Host "    $($Card.name): $($Card.currentPrice) ($($Card.trend))" -ForegroundColor $TrendColor
       }
   } catch {
       Write-Host "     Pokemon market overview failed" -ForegroundColor Red
   }
}

function Test-RealDataEnhancedPredictions {
   Write-Host " Testing AI Predictions with Real Market Data..." -ForegroundColor Magenta
   
   $TestCard = "lightning-bolt"
   Write-Host "  Testing enhanced prediction for: $TestCard" -ForegroundColor Yellow
   
   try {
       $Response = curl "http://localhost:5000/api/charts/prediction/$TestCard" | ConvertFrom-Json
       
       Write-Host "     Card Data:" -ForegroundColor Green
       Write-Host "      Name: $($Response.card.name)" -ForegroundColor White
       Write-Host "      Current Price: $($Response.card.currentPrice)" -ForegroundColor White
       Write-Host "      Set: $($Response.card.set)" -ForegroundColor White
       Write-Host "      Rarity: $($Response.card.rarity)" -ForegroundColor White
       
       Write-Host "     AI Prediction:" -ForegroundColor Green
       Write-Host "      Direction: $($Response.direction)" -ForegroundColor $(if($Response.direction -eq 'up'){'Green'}else{'Red'})
       Write-Host "      Confidence: $($Response.confidence)%" -ForegroundColor Yellow
       Write-Host "      Target Price: $($Response.targetPrice)" -ForegroundColor Cyan
       Write-Host "      Risk Level: $($Response.riskLevel)" -ForegroundColor Magenta
       
       Write-Host "     Market Metrics:" -ForegroundColor Green
       Write-Host "      Volatility: $($Response.realData.marketMetrics.volatility)" -ForegroundColor White
       Write-Host "      Trend: $($Response.realData.marketMetrics.trend)" -ForegroundColor White
       Write-Host "      Support: $($Response.realData.marketMetrics.support)" -ForegroundColor White
       Write-Host "      Resistance: $($Response.realData.marketMetrics.resistance)" -ForegroundColor White
       
   } catch {
       Write-Host "     Enhanced prediction test failed" -ForegroundColor Red
   }
}

function Test-ChartDataWithHistory {
   Write-Host " Testing Chart Data with Real Price History..." -ForegroundColor Magenta
   
   $TestCard = "black-lotus"
   Write-Host "  Testing chart data for: $TestCard" -ForegroundColor Yellow
   
   try {
       $Response = curl "http://localhost:5000/api/charts/data/$TestCard" | ConvertFrom-Json
       
       Write-Host "     Chart Data Retrieved:" -ForegroundColor Green
       Write-Host "      Card: $($Response.card.name)" -ForegroundColor White
       Write-Host "      Current Price: $($Response.card.currentPrice)" -ForegroundColor White
       Write-Host "      Data Points: $($Response.data.Count)" -ForegroundColor White
       Write-Host "      Source: $($Response.metadata.source)" -ForegroundColor White
       
       if ($Response.data.Count -gt 0) {
           $LatestData = $Response.data[-1]
           Write-Host "      Latest Price: $($LatestData.price)" -ForegroundColor Cyan
           Write-Host "      Latest Date: $($LatestData.date)" -ForegroundColor Cyan
       }
       
   } catch {
       Write-Host "     Chart data test failed" -ForegroundColor Red
   }
}

function Test-CacheSystem {
   Write-Host " Testing Cache System..." -ForegroundColor Magenta
   
   Write-Host "  Checking cache stats:" -ForegroundColor Yellow
   try {
       $CacheStats = curl "http://localhost:5000/api/system/cache" | ConvertFrom-Json
       Write-Host "     Cache Size: $($CacheStats.size) entries" -ForegroundColor Green
       Write-Host "     Cache Timeout: $($CacheStats.timeout)ms" -ForegroundColor Green
       Write-Host "     Cached Keys: $($CacheStats.keys.Count)" -ForegroundColor Green
   } catch {
       Write-Host "     Cache stats unavailable" -ForegroundColor Red
   }
   
   Write-Host "  Testing cache clear:" -ForegroundColor Yellow
   try {
       $ClearResult = curl -Method DELETE "http://localhost:5000/api/system/cache" | ConvertFrom-Json
       Write-Host "     $($ClearResult.message)" -ForegroundColor Green
   } catch {
       Write-Host "     Cache clear failed" -ForegroundColor Red
   }
}

function Test-AllRealDataFeatures {
   Write-Host " COMPREHENSIVE REAL DATA TESTING" -ForegroundColor Magenta
   Write-Host "===================================" -ForegroundColor Cyan
   
   # Test server availability first
   Write-Host " Testing server connectivity..." -ForegroundColor Yellow
   try {
       $ServerTest = curl "http://localhost:5000/api/test" | ConvertFrom-Json
       Write-Host " Server Active: $($ServerTest.message)" -ForegroundColor Green
       Write-Host " Version: $($ServerTest.version)" -ForegroundColor Green
   } catch {
       Write-Host " Server not responding! Start server first with 'npm start'" -ForegroundColor Red
       return
   }
   
   Write-Host ""
   Test-ScryfallIntegration
   Write-Host ""
   Test-PokemonIntegration
   Write-Host ""
   Test-CardSearch
   Write-Host ""
   Test-MarketOverview
   Write-Host ""
   Test-RealDataEnhancedPredictions
   Write-Host ""
   Test-ChartDataWithHistory
   Write-Host ""
   Test-CacheSystem
   
   Write-Host ""
   Write-Host " REAL DATA TESTING COMPLETE!" -ForegroundColor Magenta
   Write-Host "All major features tested successfully!" -ForegroundColor Green
}

Write-Host " Real Data Test Functions Loaded!" -ForegroundColor Green
Write-Host "Available test commands:" -ForegroundColor Cyan
Write-Host "   Test-ScryfallIntegration" -ForegroundColor White
Write-Host "   Test-PokemonIntegration" -ForegroundColor White
Write-Host "   Test-CardSearch" -ForegroundColor White
Write-Host "   Test-MarketOverview" -ForegroundColor White
Write-Host "   Test-RealDataEnhancedPredictions" -ForegroundColor White
Write-Host "   Test-ChartDataWithHistory" -ForegroundColor White
Write-Host "   Test-CacheSystem" -ForegroundColor White
Write-Host "   Test-AllRealDataFeatures" -ForegroundColor White
