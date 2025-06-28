Write-Host "=== BRAINSTORM TCG DIAGNOSTIC REPORT ===" -ForegroundColor Cyan
Write-Host "Generated: $(Get-Date)" -ForegroundColor Green
Write-Host ""

Write-Host "1. SERVER.JS STRUCTURE ANALYSIS" -ForegroundColor Yellow
Write-Host "File size: $((Get-Item server.js).Length) bytes"
Write-Host ""

Write-Host "2. SEARCH FUNCTION COMPLETE CODE (lines 40-120):" -ForegroundColor Yellow
Get-Content server.js | Select-Object -Skip 39 -First 80 | ForEach-Object { Write-Host "$($_.ReadCount + 39): $_" }
Write-Host ""

Write-Host "3. SYNTAX VALIDATION:" -ForegroundColor Yellow
try {
    node -c server.js
    Write-Host " Syntax check PASSED" -ForegroundColor Green
} catch {
    Write-Host " Syntax check FAILED: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

Write-Host "4. API ENDPOINTS TEST:" -ForegroundColor Yellow
Write-Host "Testing external APIs directly..."

# Test Yu-Gi-Oh API
try {
    $yugioh = Invoke-RestMethod -Uri "https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=dragon" -TimeoutSec 5
    Write-Host " Yu-Gi-Oh API: Working ($($yugioh.data.Count) cards)" -ForegroundColor Green
} catch {
    Write-Host " Yu-Gi-Oh API: $($_.Exception.Message)" -ForegroundColor Red
}

# Test Magic API
try {
    $magic = Invoke-RestMethod -Uri "https://api.scryfall.com/cards/search?q=lightning" -TimeoutSec 5
    Write-Host " Magic API: Working ($($magic.data.Count) cards)" -ForegroundColor Green
} catch {
    Write-Host " Magic API: $($_.Exception.Message)" -ForegroundColor Red
}

# Test Pokemon API
try {
    $pokemon = Invoke-RestMethod -Uri "https://api.pokemontcg.io/v2/cards?q=name:pikachu" -TimeoutSec 5
    Write-Host " Pokemon API: Working ($($pokemon.data.Count) cards)" -ForegroundColor Green
} catch {
    Write-Host " Pokemon API: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

Write-Host "5. PACKAGE.JSON DEPENDENCIES:" -ForegroundColor Yellow
if (Test-Path package.json) {
    $pkg = Get-Content package.json | ConvertFrom-Json
    $pkg.dependencies | Format-Table -AutoSize
} else {
    Write-Host " package.json not found" -ForegroundColor Red
}
Write-Host ""

Write-Host "6. NODE MODULES STATUS:" -ForegroundColor Yellow
if (Test-Path node_modules) {
    Write-Host " node_modules exists" -ForegroundColor Green
    Write-Host "Key modules:"
    @('express', 'axios', 'cors') | ForEach-Object {
        if (Test-Path "node_modules\$_") {
            Write-Host "   $_" -ForegroundColor Green
        } else {
            Write-Host "   $_" -ForegroundColor Red
        }
    }
} else {
    Write-Host " node_modules missing - run 'npm install'" -ForegroundColor Red
}
Write-Host ""

Write-Host "7. BRACKET/BRACE ANALYSIS:" -ForegroundColor Yellow
$content = Get-Content server.js -Raw
$openBraces = ($content.ToCharArray() | Where-Object { $_ -eq '{' }).Count
$closeBraces = ($content.ToCharArray() | Where-Object { $_ -eq '}' }).Count
$openParens = ($content.ToCharArray() | Where-Object { $_ -eq '(' }).Count
$closeParens = ($content.ToCharArray() | Where-Object { $_ -eq ')' }).Count

Write-Host "Braces: { = $openBraces, } = $closeBraces $(if($openBraces -eq $closeBraces){''}else{''})"
Write-Host "Parentheses: ( = $openParens, ) = $closeParens $(if($openParens -eq $closeParens){''}else{''})"
Write-Host ""

Write-Host "8. FUNCTION STRUCTURE:" -ForegroundColor Yellow
Get-Content server.js | Select-String -Pattern "(app\.|function|async|try|catch)" | ForEach-Object { 
    Write-Host "Line $($_.LineNumber): $($_.Line.Trim())" 
}
Write-Host ""

Write-Host "=== END DIAGNOSTIC REPORT ===" -ForegroundColor Cyan
