'use client'

import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'

interface PortfolioChartProps {
  timeframe: string
}

const PortfolioChart = ({ timeframe }: PortfolioChartProps) => {
  // Mock data - replace with real API data
  const generateData = () => {
    const baseValue = 13000
    const points = timeframe === '1D' ? 24 : timeframe === '1W' ? 7 : timeframe === '1M' ? 30 : 90
    
    return Array.from({ length: points }, (_, i) => {
      const date = new Date()
      if (timeframe === '1D') {
        date.setHours(date.getHours() - (points - i))
      } else {
        date.setDate(date.getDate() - (points - i))
      }
      
      const randomChange = (Math.random() - 0.5) * 1000
      const value = baseValue + randomChange + (i * 50) // Slight upward trend
      
      return {
        date: date.toISOString(),
        value: Math.max(value, 5000), // Minimum value
        formattedDate: timeframe === '1D' 
          ? date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
          : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      }
    })
  }

  const data = generateData()
  const isPositive = data[data.length - 1].value > data[0].value

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-periwinkle-200 rounded-lg shadow-lg">
          <p className="text-sm text-periwinkle-600">{label}</p>
          <p className="text-lg font-bold text-periwinkle-900">
            
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <defs>
            <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
              <stop 
                offset="5%" 
                stopColor={isPositive ? '#8A8AE6' : '#FF6B6B'} 
                stopOpacity={0.3}
              />
              <stop 
                offset="95%" 
                stopColor={isPositive ? '#8A8AE6' : '#FF6B6B'} 
                stopOpacity={0.05}
              />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E6E6FF" />
          <XAxis 
            dataKey="formattedDate" 
            stroke="#8E8E93"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke="#8E8E93"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => $k}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="value"
            stroke={isPositive ? '#8A8AE6' : '#FF6B6B'}
            strokeWidth={3}
            fill="url(#portfolioGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default PortfolioChart
