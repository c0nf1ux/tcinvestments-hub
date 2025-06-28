// client/src/components/portfolio/PortfolioChart.jsx
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import ApiService from '../../services/api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const PortfolioChart = ({ timeframe = '1D', height = 300 }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChartData();
  }, [timeframe]);

  const loadChartData = async () => {
    try {
      setLoading(true);
      const data = await ApiService.getPortfolioHistory(timeframe);
      
      const labels = data.data.map(item => {
        const date = new Date(item.date);
        switch(timeframe) {
          case '1D': return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
          case '1W': 
          case '1M': return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          default: return date.toLocaleDateString('en-US', { year: '2-digit', month: 'short' });
        }
      });

      const values = data.data.map(item => item.value);
      const isPositive = values[values.length - 1] > values[0];

      setChartData({
        labels,
        datasets: [
          {
            label: 'Portfolio Value',
            data: values,
            borderColor: isPositive ? '#66FF66' : '#FF6666',
            backgroundColor: isPositive 
              ? 'linear-gradient(180deg, rgba(102, 255, 102, 0.2) 0%, rgba(102, 255, 102, 0) 100%)'
              : 'linear-gradient(180deg, rgba(255, 102, 102, 0.2) 0%, rgba(255, 102, 102, 0) 100%)',
            borderWidth: 2,
            pointRadius: 0,
            pointHoverRadius: 4,
            fill: true,
            tension: 0.4
          }
        ]
      });
    } catch (error) {
      console.error('Error loading chart data:', error);
    } finally {
      setLoading(false);
    }
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#CCCCFF',
        bodyColor: '#FFFFFF',
        borderColor: '#6666FF',
        borderWidth: 1,
        callbacks: {
          label: (context) => ${'$'} {context.raw.toLocaleString()}
        }
      }
    },
    scales: {
      x: {
        display: true,
        grid: { color: 'rgba(204, 204, 255, 0.1)' },
        ticks: { color: '#9999FF', maxTicksLimit: 6 }
      },
      y: {
        display: false,
        grid: { display: false }
      }
    },
    interaction: {
      mode: 'index',
      intersect: false
    },
    elements: {
      point: { hoverBackgroundColor: '#CCCCFF' }
    }
  };

  if (loading) {
    return (
      <div style={{ height, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#CCCCFF' }}>Loading chart...</div>
      </div>
    );
  }

  return (
    <div style={{ height, position: 'relative' }}>
      {chartData && <Line data={chartData} options={options} />}
    </div>
  );
};

export default PortfolioChart;
