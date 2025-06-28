import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Tabs, 
  Tab,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import { MoreVert, Timeline, BarChart, CandlestickChart } from '@mui/icons-material';
import AdvancedChart from './AdvancedChart';
import TradingViewChart from './TradingViewChart';

const ChartContainer = ({ cardData, watchlist, onChartSelect }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedCard, setSelectedCard] = useState(cardData || watchlist?.[0]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [chartType, setChartType] = useState('advanced');

  const chartTypes = [
    { value: 'advanced', label: 'Advanced Chart', icon: <CandlestickChart /> },
    { value: 'basic', label: 'Basic Chart', icon: <BarChart /> },
    { value: 'mini', label: 'Mini Chart', icon: <Timeline /> }
  ];

  const timeframes = ['1D', '1W', '1M', '3M', '1Y', 'ALL'];

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    if (watchlist && watchlist[newValue]) {
      setSelectedCard(watchlist[newValue]);
      if (onChartSelect) {
        onChartSelect(watchlist[newValue]);
      }
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleChartTypeChange = (type) => {
    setChartType(type);
    handleMenuClose();
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Chart Type Selector */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
          p: 2,
          backgroundColor: '#1a1a1a',
          border: '1px solid #CCCCFF',
          borderRadius: '8px'
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: '#CCCCFF',
            fontWeight: 'bold'
          }}
        >
           Chart Analysis
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" sx={{ color: '#9999FF' }}>
            Chart Type:
          </Typography>
          <IconButton
            onClick={handleMenuOpen}
            sx={{ color: '#CCCCFF' }}
          >
            <MoreVert />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                backgroundColor: '#1a1a1a',
                border: '1px solid #CCCCFF'
              }
            }}
          >
            {chartTypes.map((type) => (
              <MenuItem
                key={type.value}
                onClick={() => handleChartTypeChange(type.value)}
                selected={chartType === type.value}
                sx={{
                  color: '#CCCCFF',
                  '&.Mui-selected': {
                    backgroundColor: '#6666FF'
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {type.icon}
                  {type.label}
                </Box>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Box>

      {/* Watchlist Tabs */}
      {watchlist && watchlist.length > 1 && (
        <Box sx={{ mb: 2 }}>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                color: '#9999FF',
                '&.Mui-selected': {
                  color: '#CCCCFF'
                }
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#CCCCFF'
              }
            }}
          >
            {watchlist.map((card, index) => (
              <Tab
                key={card.id || index}
                label={card.name || Card }
                sx={{
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #6666FF',
                  borderRadius: '8px 8px 0 0',
                  mx: 0.5
                }}
              />
            ))}
          </Tabs>
        </Box>
      )}

      {/* Main Chart Display */}
      <Box sx={{ width: '100%' }}>
        {chartType === 'advanced' && (
          <AdvancedChart
            cardData={selectedCard}
            onPredictionUpdate={(prediction) => {
              console.log('AI Prediction Updated:', prediction);
            }}
          />
        )}
        
        {chartType === 'basic' && (
          <Card
            sx={{
              backgroundColor: '#1a1a1a',
              border: '2px solid #CCCCFF',
              borderRadius: '12px'
            }}
          >
            <CardContent>
              <TradingViewChart
                symbol={selectedCard?.symbol || 'MTG:BLACKLOTUS'}
                height={400}
                realtime={true}
              />
            </CardContent>
          </Card>
        )}
        
        {chartType === 'mini' && (
          <Grid container spacing={2}>
            {(watchlist || [selectedCard]).slice(0, 4).map((card, index) => (
              <Grid item xs={12} sm={6} md={3} key={card?.id || index}>
                <Card
                  sx={{
                    backgroundColor: '#1a1a1a',
                    border: '1px solid #6666FF',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    '&:hover': {
                      border: '2px solid #CCCCFF',
                      transform: 'translateY(-2px)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => {
                    setSelectedCard(card);
                    setChartType('advanced');
                  }}
                >
                  <CardContent sx={{ p: 1 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: '#CCCCFF', mb: 1, textAlign: 'center' }}
                    >
                      {card?.name || Card }
                    </Typography>
                    <TradingViewChart
                      symbol={card?.symbol || 'MTG:BLACKLOTUS'}
                      height={150}
                      realtime={true}
                    />
                    <Typography
                      variant="body2"
                      sx={{ color: '#66FF66', textAlign: 'center', mt: 1 }}
                    >
                      
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default ChartContainer;
