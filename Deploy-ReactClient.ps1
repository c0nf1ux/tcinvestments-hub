# Deploy-ReactClient.ps1
param([string]$Theme = "PeriwinkleBlack")

Write-Host " DEPLOYING REACT CLIENT WITH PERIWINKLE THEME" -ForegroundColor Magenta

# Create React app if it doesn't exist
if (!(Test-Path "client")) {
    npx create-react-app client
    Set-Location client
    
    # Install Material-UI with periwinkle theme
    npm install @mui/material @emotion/react @emotion/styled
    npm install @mui/icons-material
    npm install lightweight-charts recharts
    npm install axios framer-motion
    
    Set-Location ..
}

# Create periwinkle theme
$themeDir = "client/src/themes"
if (!(Test-Path $themeDir)) { New-Item -ItemType Directory -Path $themeDir -Force }

@"
// Periwinkle & Black Theme for CardHood
import { createTheme } from '@mui/material/styles';

export const periwinkleTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#CCCCFF', light: '#E6E6FF', dark: '#6666FF' },
    secondary: { main: '#9999FF', light: '#B3B3FF', dark: '#4D4DFF' },
    background: { default: '#000000', paper: '#1a1a1a' },
    text: { primary: '#FFFFFF', secondary: '#CCCCFF' },
    success: { main: '#66FF66' },
    warning: { main: '#FFD700' },
    error: { main: '#FF6666' }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif',
    h4: { fontWeight: 600, color: '#CCCCFF' }
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1a1a1a',
          border: '1px solid #CCCCFF33',
          borderRadius: 12
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          background: 'linear-gradient(45deg, #CCCCFF, #9999FF)',
          '&:hover': { background: 'linear-gradient(45deg, #9999FF, #6666FF)' }
        }
      }
    }
  }
});
"@ | Out-File -FilePath "$themeDir/periwinkleTheme.js" -Encoding UTF8

Write-Host " React Client with Periwinkle Theme Created!" -ForegroundColor Green
Write-Host "Next: .\Deploy-TradingViewCharts.ps1" -ForegroundColor Yellow
