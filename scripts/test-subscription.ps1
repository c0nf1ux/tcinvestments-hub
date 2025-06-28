# SUBSCRIPTION SYSTEM TEST SCRIPT
# Run this to test your subscription integration

Write-Host " TESTING BRAINSTORM SUBSCRIPTION SYSTEM" -ForegroundColor Cyan

# Test 1: Check if servers are running
Write-Host "
1. Checking server status..." -ForegroundColor Yellow
 = Test-NetConnection -ComputerName localhost -Port 3000 -InformationLevel Quiet -WarningAction SilentlyContinue
 = Test-NetConnection -ComputerName localhost -Port 5000 -InformationLevel Quiet -WarningAction SilentlyContinue

if ( -and ) {
    Write-Host " Both servers running" -ForegroundColor Green
} else {
    Write-Host " Servers not running - run 'bs-restart'" -ForegroundColor Red
}

# Test 2: Check subscription component exists
Write-Host "
2. Checking subscription components..." -ForegroundColor Yellow
if (Test-Path "frontend\src\components\subscription\SubscriptionPlans.js") {
    Write-Host " Subscription component created" -ForegroundColor Green
} else {
    Write-Host " Subscription component missing" -ForegroundColor Red
}

# Test 3: Check backend subscription controller
Write-Host "
3. Checking backend integration..." -ForegroundColor Yellow
if (Test-Path "backend\controllers\subscriptionController.js") {
    Write-Host " Subscription controller created" -ForegroundColor Green
} else {
    Write-Host " Subscription controller missing" -ForegroundColor Red
}

# Test 4: Environment variables
Write-Host "
4. Checking environment configuration..." -ForegroundColor Yellow
if (Test-Path "backend\.env") {
     = Get-Content "backend\.env" -Raw
    if ( -match "PREMIUM_TIER_PRICE=9.99") {
        Write-Host " Pricing configuration updated" -ForegroundColor Green
    } else {
        Write-Host " Check pricing configuration in .env" -ForegroundColor Yellow
    }
} else {
    Write-Host " Backend .env file missing" -ForegroundColor Red
}

Write-Host "
 NEXT STEPS:" -ForegroundColor Cyan
Write-Host "1. Set up Stripe products using Stripe CLI" -ForegroundColor White
Write-Host "2. Update .env files with actual Stripe price IDs" -ForegroundColor White  
Write-Host "3. Add subscription route to your main App.js" -ForegroundColor White
Write-Host "4. Test subscription flow at http://localhost:3000/pricing" -ForegroundColor White

Write-Host "
 Open pricing page: http://localhost:3000/pricing" -ForegroundColor Green
Start-Process "http://localhost:3000/pricing"
