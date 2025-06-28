# Quick backup script for Brainstorm project
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$backupPath = "C:\Brainstorm_Backup_$timestamp"
Copy-Item -Path "C:\Brainstorm" -Destination $backupPath -Recurse -Force
Write-Host " Backup created: $backupPath" -ForegroundColor Green

# Optional: Keep only last 5 backups
$backups = Get-ChildItem "C:\" -Directory -Name "Brainstorm_Backup_*" | Sort-Object -Descending
if ($backups.Count -gt 5) {
   $backups[5..($backups.Count-1)] | ForEach-Object {
       Remove-Item "C:\$_" -Recurse -Force
       Write-Host " Removed old backup: $_" -ForegroundColor Yellow
   }
}
