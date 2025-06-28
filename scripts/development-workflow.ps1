# BRAINSTORM DEVELOPMENT WORKFLOW WITH BACKUPS

function Start-Development($feature) {
   Write-Host " Starting development: $feature" -ForegroundColor Cyan
   
   # Create backup before starting
   .\scripts\quick-backup.ps1
   
   # Create feature branch
   git checkout -b "feature/$feature"
   
   Write-Host " Ready to develop: $feature" -ForegroundColor Green
}

function Complete-Feature($feature, $description) {
   Write-Host " Completing feature: $feature" -ForegroundColor Green
   
   # Test the application
   Write-Host "Testing application..." -ForegroundColor Yellow
   Start-Process "http://localhost:3000"
   
   # Commit changes
   git add .
   git commit -m "FEATURE: $feature - $description"
   
   # Merge to main
   git checkout main
   git merge "feature/$feature"
   
   # Create milestone backup
   .\scripts\quick-backup.ps1
   
   Write-Host " Feature completed and backed up" -ForegroundColor Green
}

# Usage examples:
# Start-Development "stripe-integration"
# Complete-Feature "stripe-integration" "Added subscription payment processing"
