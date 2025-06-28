# Deploy-TradingViewCharts.ps1
param([switch]$AIOverlays, [switch]$PeriwinkleTheme)

Write-Host " DEPLOYING TRADINGVIEW CHARTS" -ForegroundColor Magenta

$chartDir = "client/src/components/charts"
if (!(Test-Path $chartDir)) { New-Item -ItemType Directory -Path $chartDir -Force }

# Create TradingView Chart Component
@"
import React, { useEffect, useRef } from 'react';
import { createChart, ColorType } from 'lightweight-charts';
import { Card, CardContent, Typography } from '@mui/material';

const TradingViewChart = ({ data, cardName = 'Black Lotus' }) => {
  const chartRef = useRef();

  useEffect(() => {
    if (!chartRef.current) return;
    
    const chart = createChart(chartRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: '#000000' },
        textColor: '#CCCCFF'
      },
      grid: {
        vertLines: { color: '#CCCCFF33' },
        horzLines: { color: '#CCCCFF33' }
      },
      width: 800,
      height: 400
    });

    const candleSeries = chart.addCandlestickSeries({
      upColor: '#66FF66',
      downColor: '#FF6666',
      borderUpColor: '#66FF66',
      borderDownColor: '#FF6666',
      wickUpColor: '#66FF66',
      wickDownColor: '#FF6666'
    });

    // Sample data - replace with real API data
    const sampleData = [
      { time: '2024-01-01', open: 100, high: 120, low: 95, close: 115 },
      { time: '2024-01-02', open: 115, high: 130, low: 110, close: 125 },
      { time: '2024-01-03', open: 125, high: 140, low: 120, close: 135 }
    ];
    
    candleSeries.setData(sampleData);
    
    return () => chart.remove();
  }, [data]);

  return (
    <Card sx={{ background: 'linear-gradient(135deg, #1a1a1a, #2d2d2d)' }}>
      <CardContent>
        <Typography variant="h6" sx={{ color: '#CCCCFF', mb: 2 }}>
          {cardName} - Price Chart
        </Typography>
        <div ref={chartRef} />
      </CardContent>
    </Card>
  );
};

export default TradingViewChart;
"@ | Out-File -FilePath "$chartDir/TradingViewChart.jsx" -Encoding UTF8

Write-Host " TradingView Charts Created!" -ForegroundColor Green
Write-Host "Next: .\Deploy-AIComponents.ps1" -ForegroundColor Yellow
