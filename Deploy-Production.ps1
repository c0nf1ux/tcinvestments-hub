# Production Build & Deployment Script

Write-Host " BRAINSTORM PRODUCTION DEPLOYMENT" -ForegroundColor Green

# Frontend build
Write-Host " Building frontend..." -ForegroundColor Cyan
Set-Location "C:\Brainstorm\frontend"
npm run build

# Backend preparation
Write-Host " Preparing backend..." -ForegroundColor Cyan
Set-Location "C:\Brainstorm\backend"
npm install --production

# Deploy to Vercel (Frontend)
Write-Host " Deploying frontend to Vercel..." -ForegroundColor Yellow
Set-Location "C:\Brainstorm\frontend"
npx vercel --prod

# Deploy to Railway (Backend)
Write-Host " Deploying backend to Railway..." -ForegroundColor Yellow
Set-Location "C:\Brainstorm\backend"
railway login
railway deploy

Write-Host " PRODUCTION DEPLOYMENT COMPLETE!" -ForegroundColor Green
Write-Host " Frontend: https://brainstorm.vercel.app" -ForegroundColor White
Write-Host " Backend: https://brainstorm-backend.railway.app" -ForegroundColor White
Write-Host " Health: https://brainstorm-backend.railway.app/api/health" -ForegroundColor White
