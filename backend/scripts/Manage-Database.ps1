param (
    [string]$Action = "import"
)

Write-Host " Manage-Database.ps1 - Action: $Action" -ForegroundColor Cyan
Set-Location -Path (Split-Path -Parent $MyInvocation.MyCommand.Definition)

switch ($Action) {
    "import" {
        Write-Host " Importing seed data using seedData.js..." -ForegroundColor Yellow
        try {
            node ./seedData.js
            Write-Host " Data import complete." -ForegroundColor Green
        } catch {
            Write-Host " Data import failed." -ForegroundColor Red
            exit 1
        }
    }
    "validate" {
        Write-Host " Validation action not implemented yet. Only 'import' is available." -ForegroundColor Yellow
    }
    default {
        Write-Host " Unknown action: $Action" -ForegroundColor Red
        exit 1
    }
}


