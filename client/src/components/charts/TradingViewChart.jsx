import React, { useEffect, useRef, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const TradingViewChart = ({ 
  symbol = 'MTG:BLACKLOTUS', 
  interval = '1D',
  theme = 'dark',
  height = 400,
  realtime = true 
}) => {
  const container = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!container.current) return;

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      "autosize": true,
      "symbol": symbol,
      "interval": interval,
      "timezone": "Etc/UTC",
      "theme": "dark",
      "style": "1",
      "locale": "en",
      "enable_publishing": false,
      "backgroundColor": "#000000",
      "gridColor": "#CCCCFF",
      "hide_top_toolbar": false,
      "hide_legend": false,
      "save_image": false,
      "container_id": "tradingview_chart",
      "studies": [
        "RSI@tv-basicstudies",
        "MACD@tv-basicstudies",
        "Volume@tv-basicstudies"
      ],
      "overrides": {
        "paneProperties.background": "#000000",
        "paneProperties.backgroundType": "solid",
        "paneProperties.vertGridProperties.color": "#CCCCFF",
        "paneProperties.horzGridProperties.color": "#CCCCFF",
        "symbolWatermarkProperties.transparency": 90,
        "scalesProperties.textColor": "#CCCCFF",
        "mainSeriesProperties.candleStyle.upColor": "#66FF66",
        "mainSeriesProperties.candleStyle.downColor": "#FF6666",
        "mainSeriesProperties.candleStyle.borderUpColor": "#66FF66",
        "mainSeriesProperties.candleStyle.borderDownColor": "#FF6666",
        "mainSeriesProperties.candleStyle.wickUpColor": "#66FF66",
        "mainSeriesProperties.candleStyle.wickDownColor": "#FF6666"
      }
    });

    container.current.appendChild(script);
    
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
      if (container.current) {
        container.current.innerHTML = '';
      }
    };
  }, [symbol, interval]);

  return (
    <Box
      sx={{
        width: '100%',
        height: height,
        position: 'relative',
        backgroundColor: '#000000',
        border: '2px solid #CCCCFF',
        borderRadius: '8px',
        overflow: 'hidden'
      }}
    >
      {loading && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000,
            textAlign: 'center'
          }}
        >
          <CircularProgress sx={{ color: '#CCCCFF', mb: 2 }} />
          <Typography sx={{ color: '#CCCCFF' }}>
            Loading Chart Data...
          </Typography>
        </Box>
      )}
      <div
        ref={container}
        id="tradingview_chart"
        style={{
          width: '100%',
          height: '100%'
        }}
      />
    </Box>
  );
};

export default TradingViewChart;
