'use client'

import React, { useState, useEffect } from 'react'
import { 
  ComposedChart,
  Line,
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine,
  Brush
} from 'recharts'
import { Calendar, TrendingUp, BarChart, Eye } from 'lucide-react'

interface PortfolioDataPoint {
  date: string
  value: number
  dailyReturn: number
  benchmark: number
  formattedDate: string
  transactions?: number
}

interface AdvancedPortfolioChartProps {
  timeframe: string
  showBenchmark?: boolean
  showTransactions?: boolean
}

const AdvancedPortfolioChart = ({ 
  timeframe, 
  showBenchmark = true, 
  showTransactions = false 
}: AdvancedPortfolioChartProps) => {
  const [data, setData] = useState<PortfolioDataPoint[]>([])
  const [loading, setLoading] = useState(true)
  const [chartType, setChartType] = useState<'area' | 'line'>('area')

  // Generate realistic portfolio data
  const generatePortfolioData = (): PortfolioDataPoint[] => {
    const startValue = 13000
    const dataPoints = timeframe === '1D' ? 24 : 
                     timeframe === '1W' ? 7 : 
                     timeframe === '1M' ? 30 : 
                     timeframe === '3M' ? 90 : 
                     timeframe === '1Y' ? 365 : 1095

    let currentValue = startValue
    let benchmarkValue = startValue
    
    return Array.from({ length: dataPoints }, (_, i) => {
      const date = new Date()
      
      if (timeframe === '1D') {
        date.setHours(date.getHours() - (dataPoints - i))
      } else {
        date.setDate(date.getDate() - (dataPoints - i))
      }

      // Portfolio performance with slight outperformance
      const portfolioReturn = (Math.random() - 0.45) * 0.02 // Slight positive bias
      const benchmarkReturn = (Math.random() - 0.5) * 0.015 // Market return
      
      currentValue = currentValue * (1 + portfolioReturn)
      benchmarkValue = benchmarkValue * (1 + benchmarkReturn)
      
      // Add some transaction activity
      const hasTransaction = Math.random() > 0.9 ? Math.floor(Math.random() * 3) + 1 : 0

      return {
        date: date.toISOString(),
        value: Math.max(currentValue, 5000),
        dailyReturn: portfolioReturn * 100,
        benchmark: Math.max(benchmarkValue, 5000),
        transactions: hasTransaction,
        formattedDate: timeframe === '1D' 
          ? date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
          : timeframe === '1W' || timeframe === '1M'
          ? date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
          : date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
      }
    })
  }

  useEffect(() => {
    setLoading(true)
    const portfolioData = generatePortfolioData()
    setData(portfolioData)
    setLoading(false)
  }, [timeframe])

  const currentValue = data[data.length - 1]?.value || 0
  const initialValue = data[0]?.value || 0
  const totalReturn = currentValue - initialValue
  const totalReturnPercent = (totalReturn / initialValue) * 100

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white p-4 border border-periwinkle-200 rounded-lg shadow-lg">
          <p className="text-sm text-periwinkle-600 mb-2">{label}</p>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-sm text-periwinkle-700">Portfolio:</span>
              <span className="text-sm font-bold text-periwinkle-900">
                
              </span>
            </div>
            {showBenchmark && (
              <div className="flex justify-between">
                <span className="text-sm text-periwinkle-700">Benchmark:</span>
                <span className="text-sm font-medium text-periwinkle-600">
                  
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-sm text-periwinkle-700">Daily Return:</span>
              <span className={	ext-sm font-medium }>
                {data.dailyReturn >= 0 ? '+' : ''}{data.dailyReturn.toFixed(2)}%
              </span>
            </div>
            {showTransactions && data.transactions > 0 && (
              <div className="flex justify-between">
                <span className="text-sm text-periwinkle-700">Transactions:</span>
                <span className="text-sm font-medium text-periwinkle-800">
                  {data.transactions}
                </span>
              </div>
            )}
          </div>
        </div>
      )
    }
    return null
  }

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-periwinkle-500"></div>
      </div>
    )
  }

  const isPositive = totalReturn >= 0

  return (
    <div className="space-y-4">
      {/* Chart Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div>
            <p className="text-sm text-periwinkle-600">Total Return</p>
            <div className="flex items-center">
              <span className={	ext-lg font-bold }>
                {isPositive ? '+' : ''} ({totalReturnPercent.toFixed(2)}%)
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setChartType(chartType === 'area' ? 'line' : 'area')}
            className="flex items-center px-3 py-2 rounded-lg bg-periwinkle-100 text-periwinkle-600 hover:bg-periwinkle-200 transition-colors"
          >
            <BarChart className="w-4 h-4 mr-2" />
            {chartType === 'area' ? 'Line View' : 'Area View'}
          </button>
          
          <div className="flex items-center px-3 py-2 rounded-lg bg-periwinkle-100 text-periwinkle-600">
            <Eye className="w-4 h-4 mr-2" />
            <span className="text-sm">Live</span>
          </div>
        </div>
      </div>

      {/* Main Chart */}
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
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
              tickFormatter={(value) => ${(value / 1000).toFixed(0)}k}
            />
            <Tooltip content={<CustomTooltip />} />
            
            {/* Benchmark Line */}
            {showBenchmark && (
              <Line
                type="monotone"
                dataKey="benchmark"
                stroke="#D1D5DB"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                name="Benchmark"
              />
            )}
            
            {/* Portfolio Chart */}
            {chartType === 'area' ? (
              <Area
                type="monotone"
                dataKey="value"
                stroke={isPositive ? '#8A8AE6' : '#FF6B6B'}
                strokeWidth={3}
                fill="url(#portfolioGradient)"
                name="Portfolio"
              />
            ) : (
              <Line
                type="monotone"
                dataKey="value"
                stroke={isPositive ? '#8A8AE6' : '#FF6B6B'}
                strokeWidth={3}
                dot={false}
                name="Portfolio"
              />
            )}
            
            {/* Transaction Markers */}
            {showTransactions && data.map((point, index) => 
              point.transactions && point.transactions > 0 ? (
                <ReferenceLine 
                  key={index}
                  x={point.formattedDate} 
                  stroke="#FFA500"
                  strokeDasharray="2 2"
                />
              ) : null
            )}
            
            {/* Brush for zooming on longer timeframes */}
            {(timeframe === '1Y' || timeframe === 'ALL') && (
              <Brush dataKey="formattedDate" height={30} stroke="#8A8AE6" />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-periwinkle-200">
        <div className="text-center">
          <p className="text-xs text-periwinkle-600">Max Drawdown</p>
          <p className="text-sm font-bold text-red-500">-5.2%</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-periwinkle-600">Sharpe Ratio</p>
          <p className="text-sm font-bold text-periwinkle-900">1.34</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-periwinkle-600">Volatility</p>
          <p className="text-sm font-bold text-periwinkle-900">12.8%</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-periwinkle-600">Alpha</p>
          <p className="text-sm font-bold text-green-500">+2.1%</p>
        </div>
      </div>
    </div>
  )
}

export default AdvancedPortfolioChart
