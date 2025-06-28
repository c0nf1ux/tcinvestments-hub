import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Chip,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  Psychology,
  TrendingUp,
  TrendingDown,
  ExpandMore,
  Speed,
  Timeline,
  Assessment,
  Warning,
  CheckCircle,
  Info
} from '@mui/icons-material';

const EnhancedAIInsights = ({ cardData, onPredictionUpdate }) => {
  const [aiPrediction, setAiPrediction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAdvancedPrediction();
  }, [cardData]);

  const fetchAdvancedPrediction = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/charts/prediction/${cardData.id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch AI prediction');
      }
      
      const prediction = await response.json();
      setAiPrediction(prediction);
      
      if (onPredictionUpdate) {
        onPredictionUpdate(prediction);
      }
    } catch (err) {
      setError(err.message);
      console.error('AI prediction error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getPredictionColor = (direction) => {
    return direction === 'up' ? '#66FF66' : '#FF6666';
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return '#66FF66';
    if (confidence >= 60) return '#FFD700';
    return '#FF6666';
  };

  const getRiskColor = (risk) => {
    const colors = {
      'Low': '#66FF66',
      'Medium': '#FFD700',
      'High': '#FF6666'
    };
    return colors[risk] || '#CCCCFF';
  };

  if (loading) {
    return (
      <Card sx={{ backgroundColor: '#1a1a1a', border: '2px solid #CCCCFF' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Psychology sx={{ color: '#CCCCFF', mr: 1 }} />
            <Typography variant="h6" sx={{ color: '#CCCCFF' }}>
              AI Analysis Loading...
            </Typography>
          </Box>
          <LinearProgress 
            sx={{ 
              backgroundColor: '#333',
              '& .MuiLinearProgress-bar': { backgroundColor: '#CCCCFF' }
            }} 
          />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert 
        severity="error" 
        sx={{ 
          backgroundColor: '#1a1a1a', 
          border: '1px solid #FF6666',
          color: '#FF6666'
        }}
      >
        AI Analysis Error: {error}
      </Alert>
    );
  }

  if (!aiPrediction) return null;

  return (
    <Card
      sx={{
        backgroundColor: '#1a1a1a',
        border: '2px solid #CCCCFF',
        borderRadius: '12px'
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Psychology sx={{ color: '#CCCCFF', mr: 1, fontSize: 32 }} />
          <Box>
            <Typography
              variant="h5"
              sx={{ color: '#CCCCFF', fontWeight: 'bold' }}
            >
               Advanced AI Analysis
            </Typography>
            <Typography variant="caption" sx={{ color: '#9999FF' }}>
              Model v{aiPrediction.modelVersion}  {aiPrediction.timeframe}
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                textAlign: 'center',
                p: 2,
                border: `2px solid ${getPredictionColor(aiPrediction.direction)}`,
                borderRadius: '8px',
                backgroundColor: 'rgba(0,0,0,0.3)'
              }}
            >
              {aiPrediction.direction === 'up' ? (
                <TrendingUp sx={{ fontSize: 48, color: '#66FF66' }} />
              ) : (
                <TrendingDown sx={{ fontSize: 48, color: '#FF6666' }} />
              )}
              <Typography
                variant="h4"
                sx={{
                  color: getPredictionColor(aiPrediction.direction),
                  fontWeight: 'bold',
                  textTransform: 'uppercase'
                }}
              >
                {aiPrediction.direction}
              </Typography>
              <Typography variant="h6" sx={{ color: '#CCCCFF' }}>
                ${aiPrediction.targetPrice}
              </Typography>
              <Typography variant="body2" sx={{ color: '#9999FF' }}>
                {aiPrediction.expectedChange > 0 ? '+' : ''}{aiPrediction.expectedChange}%
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ color: '#CCCCFF', mb: 1 }}>
                Confidence
              </Typography>
              <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <LinearProgress
                  variant="determinate"
                  value={aiPrediction.confidence}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    width: 120,
                    backgroundColor: '#333',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: getConfidenceColor(aiPrediction.confidence)
                    }
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    color: getConfidenceColor(aiPrediction.confidence),
                    fontWeight: 'bold',
                    mt: 1
                  }}
                >
                  {aiPrediction.confidence}%
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ color: '#CCCCFF', mb: 1 }}>
                Risk Level
              </Typography>
              <Chip
                label={aiPrediction.riskLevel}
                sx={{
                  backgroundColor: getRiskColor(aiPrediction.riskLevel),
                  color: '#000000',
                  fontWeight: 'bold',
                  fontSize: '1rem'
                }}
              />
            </Box>
          </Grid>
        </Grid>

        {(aiPrediction.technicalScore || aiPrediction.sentimentScore) && (
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {aiPrediction.technicalScore && (
              <Grid item xs={6}>
                <Box sx={{ textAlign: 'center' }}>
                  <Speed sx={{ color: '#CCCCFF', mb: 1 }} />
                  <Typography variant="body2" sx={{ color: '#9999FF' }}>
                    Technical Score
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#CCCCFF' }}>
                    {aiPrediction.technicalScore}/100
                  </Typography>
                </Box>
              </Grid>
            )}
            {aiPrediction.sentimentScore && (
              <Grid item xs={6}>
                <Box sx={{ textAlign: 'center' }}>
                  <Assessment sx={{ color: '#CCCCFF', mb: 1 }} />
                  <Typography variant="body2" sx={{ color: '#9999FF' }}>
                    Sentiment Score
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#CCCCFF' }}>
                    {aiPrediction.sentimentScore}/100
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        )}

        <Accordion
          sx={{
            backgroundColor: '#0a0a0a',
            border: '1px solid #6666FF',
            '&:before': { display: 'none' }
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMore sx={{ color: '#CCCCFF' }} />}
            sx={{ color: '#CCCCFF' }}
          >
            <Typography variant="h6"> Detailed Analysis</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List dense>
              {aiPrediction.factors?.map((factor, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    {factor.includes('positive') || factor.includes('bullish') || factor.includes('increasing') ? (
                      <CheckCircle sx={{ color: '#66FF66' }} />
                    ) : factor.includes('negative') || factor.includes('bearish') || factor.includes('decreasing') ? (
                      <Warning sx={{ color: '#FF6666' }} />
                    ) : (
                      <Info sx={{ color: '#CCCCFF' }} />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={factor}
                    sx={{ color: '#CCCCFF' }}
                  />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>

        {aiPrediction.marketContext && (
          <Box sx={{ mt: 2, p: 2, backgroundColor: '#0a0a0a', borderRadius: '8px' }}>
            <Typography variant="h6" sx={{ color: '#CCCCFF', mb: 2 }}>
               Market Context
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography variant="body2" sx={{ color: '#9999FF' }}>
                  Overall Sentiment:
                </Typography>
                <Typography sx={{ color: '#CCCCFF', fontWeight: 'bold' }}>
                  {aiPrediction.marketContext.overallSentiment}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" sx={{ color: '#9999FF' }}>
                  Volatility:
                </Typography>
                <Typography sx={{ color: '#CCCCFF', fontWeight: 'bold' }}>
                  {aiPrediction.marketContext.volatility}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        )}

        <Typography
          variant="caption"
          sx={{ color: '#666', mt: 2, display: 'block', textAlign: 'center' }}
        >
          Last updated: {new Date(aiPrediction.lastUpdate).toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default EnhancedAIInsights;
