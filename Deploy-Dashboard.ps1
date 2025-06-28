# Deploy-Dashboard.ps1
param([string]$Theme = "PeriwinkleBlack")

Write-Host " DEPLOYING ROBINHOOD-STYLE DASHBOARD" -ForegroundColor Magenta

$pagesDir = "client/src/pages"
if (!(Test-Path $pagesDir)) { New-Item -ItemType Directory -Path $pagesDir -Force }

# Create Main Dashboard
@"
import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { TrendingUp, TrendingDown, AttachMoney, Analytics } from '@mui/icons-material';
import TradingViewChart from '../components/charts/TradingViewChart';
import AIPrediction from '../components/ai/AIPrediction';
import IPOCalendar from '../components/ipo/IPOCalendar';

const Dashboard = () => {
  const [portfolioValue, setPortfolioValue] = useState(125750);
  const [dailyChange, setDailyChange] = useState(2.34);
  const [topCards, setTopCards] = useState([]);

  useEffect(() => {
    // Simulate real-time data
    const interval = setInterval(() => {
      setPortfolioValue(prev => prev + (Math.random() - 0.5) * 100);
      setDailyChange((Math.random() - 0.5) * 5);
    }, 5000);

    // Mock top performing cards
    setTopCards([
      { name: 'Black Lotus', price: 45000, change: 5.2, game: 'MTG' },
      { name: 'Charizard Base Set', price: 8500, change: -2.1, game: 'Pokemon' },
      { name: 'Blue Eyes White Dragon', price: 2800, change: 3.7, game: 'Yu-Gi-Oh' },
      { name: 'Mox Ruby', price: 12000, change: 1.8, game: 'MTG' }
    ]);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      {/* Portfolio Overview */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={8}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #1a1a1a, #2d2d2d)',
            border: '1px solid #CCCCFF33'
          }}>
            <CardContent>
              <Typography variant="h4" sx={{ color: '#CCCCFF', mb: 1 }}>
                ${portfolioValue.toLocaleString()}
              </Typography>
              <Box display="flex" alignItems="center">
                {dailyChange >= 0 ? 
                  <TrendingUp sx={{ color: '#66FF66', mr: 1 }} /> : 
                  <TrendingDown sx={{ color: '#FF6666', mr: 1 }} />
                }
                <Typography 
                  variant="h6" 
                  sx={{ color: dailyChange >= 0 ? '#66FF66' : '#FF6666' }}
                >
                  {dailyChange >= 0 ? '+' : ''}{dailyChange.toFixed(2)}% Today
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ 
            background: 'linear-gradient(45deg, #CCCCFF22, #9999FF22)',
            border: '1px solid #6666FF'
          }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <Analytics sx={{ color: '#CCCCFF', mr: 1 }} />
                <Typography variant="h6" sx={{ color: '#CCCCFF' }}>
                  AI Insights
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ color: '#FFFFFF' }}>
                Portfolio optimized for 15% growth
              </Typography>
              <Chip 
                label="Rebalance Recommended"
                sx={{ 
                  mt: 1,
                  background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                  color: '#000000'
                }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts and AI Predictions */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={8}>
          <TradingViewChart cardName="Black Lotus" />
        </Grid>
        
        <Grid item xs={12} md={4}>
          <AIPrediction cardName="Black Lotus" currentPrice={45000} />
        </Grid>
      </Grid>

      {/* Top Cards Grid */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #1a1a1a, #2d2d2d)',
            border: '1px solid #CCCCFF33'
          }}>
            <CardContent>
              <Typography variant="h5" sx={{ color: '#CCCCFF', mb: 3 }}>
                Top Performing Cards
              </Typography>
              
              <Grid container spacing={2}>
                {topCards.map((card, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Card className="card-hover" sx={{ 
                      background: 'rgba(0,0,0,0.5)',
                      border: '1px solid #6666FF33',
                      cursor: 'pointer'
                    }}>
                      <CardContent>
                        <Typography variant="h6" sx={{ color: '#FFFFFF', mb: 1 }}>
                          {card.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#CCCCFF', mb: 2 }}>
                          {card.game}
                        </Typography>
                        <Typography variant="h6" sx={{ color: '#66FF66', mb: 1 }}>
                          ${card.price.toLocaleString()}
                        </Typography>
                        <Box display="flex" alignItems="center">
                          {card.change >= 0 ? 
                            <TrendingUp sx={{ color: '#66FF66', mr: 1, fontSize: 16 }} /> : 
                            <TrendingDown sx={{ color: '#FF6666', mr: 1, fontSize: 16 }} />
                          }
                          <Typography 
                            variant="body2" 
                            sx={{ color: card.change >= 0 ? '#66FF66' : '#FF6666' }}
                          >
                            {card.change >= 0 ? '+' : ''}{card.change}%
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* IPO Calendar */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <IPOCalendar />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
"@ | Out-File -FilePath "$pagesDir/Dashboard.jsx" -Encoding UTF8

Write-Host " Dashboard Created!" -ForegroundColor Green
Write-Host "Next: .\Start-CardHood.ps1" -ForegroundColor Yellow
