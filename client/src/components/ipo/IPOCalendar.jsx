import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, Chip, Box } from '@mui/material';
import { Schedule, TrendingUp, Info } from '@mui/icons-material';

const IPOCalendar = () => {
  const [upcomingIPOs, setUpcomingIPOs] = useState([]);

  useEffect(() => {
    // Simulate IPO data
    const mockIPOs = [
      {
        id: 1,
        setName: 'Murders at Karlov Manor',
        game: 'MTG',
        launchDate: '2025-02-09',
        status: 'upcoming',
        expectedValue: 'High',
        preOrderPrice: 120
      },
      {
        id: 2,
        setName: 'Temporal Forces',
        game: 'Pokemon',
        launchDate: '2025-03-22',
        status: 'pre-order',
        expectedValue: 'Medium',
        preOrderPrice: 150
      },
      {
        id: 3,
        setName: 'Legacy of Destruction',
        game: 'Yu-Gi-Oh',
        launchDate: '2025-05-02',
        status: 'announced',
        expectedValue: 'High',
        preOrderPrice: 85
      }
    ];
    
    setUpcomingIPOs(mockIPOs);
  }, []);

  const getStatusColor = (status) => {
    switch(status) {
      case 'upcoming': return '#FFD700';
      case 'pre-order': return '#66FF66';
      case 'announced': return '#CCCCFF';
      default: return '#9999FF';
    }
  };

  return (
    <Card sx={{ 
      background: 'linear-gradient(135deg, #1a1a1a, #2d2d2d)',
      border: '1px solid #CCCCFF33'
    }}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={3}>
          <Schedule sx={{ color: '#CCCCFF', mr: 1 }} />
          <Typography variant="h5" sx={{ color: '#CCCCFF' }}>
            IPO Launch Calendar
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {upcomingIPOs.map((ipo) => (
            <Grid item xs={12} md={4} key={ipo.id}>
              <Card className="ipo-card" sx={{ 
                background: 'rgba(0,0,0,0.5)',
                border: '1px solid #6666FF33'
              }}>
                <CardContent>
                  <Typography variant="h6" sx={{ color: '#FFFFFF', mb: 1 }}>
                    {ipo.setName}
                  </Typography>
                  
                  <Typography variant="body2" sx={{ color: '#CCCCFF', mb: 2 }}>
                    {ipo.game}  {ipo.launchDate}
                  </Typography>
                  
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Chip 
                      label={ipo.status.toUpperCase()}
                      sx={{ 
                        backgroundColor: getStatusColor(ipo.status),
                        color: '#000000',
                        fontWeight: 'bold'
                      }}
                    />
                    <Typography variant="body1" sx={{ color: '#66FF66' }}>
                      
                    </Typography>
                  </Box>
                  
                  <Box display="flex" alignItems="center">
                    <TrendingUp sx={{ color: '#66FF66', mr: 1, fontSize: 16 }} />
                    <Typography variant="body2" sx={{ color: '#CCCCFF' }}>
                      Expected Value: {ipo.expectedValue}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default IPOCalendar;
