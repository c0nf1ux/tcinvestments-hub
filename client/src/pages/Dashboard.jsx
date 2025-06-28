// Update Dashboard.jsx to include new chart components
import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import ChartContainer from '../components/charts/ChartContainer';
import AdvancedChart from '../components/charts/AdvancedChart';

const Dashboard = () => {
  const [watchlist, setWatchlist] = useState([
    {
      id: 'black-lotus',
      name: 'Black Lotus',
      symbol: 'MTG:BLACKLOTUS',
      currentPrice: 25000,
      change: 2.5
    },
    {
      id: 'time-walk',
      name: 'Time Walk',
      symbol: 'MTG:TIMEWALK', 
      currentPrice: 8500,
      change: -1.2
    }
  ]);

  return (
    <Box sx={{ p: 3, backgroundColor: '#000000', minHeight: '100vh' }}>
      <Typography
        variant="h4"
        sx={{
          color: '#CCCCFF',
          fontWeight: 'bold',
          mb: 3,
          textAlign: 'center'
        }}
      >
         CardHood - Trading Card Analytics
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ChartContainer
            watchlist={watchlist}
            onChartSelect={(card) => console.log('Selected:', card)}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
