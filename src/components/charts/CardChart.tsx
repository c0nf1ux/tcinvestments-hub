'use client'

import React, { useState, useEffect } from 'react'
import { 
  ComposedChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine,
  Bar
} from 'recharts'
import { TrendingUp, TrendingDown, Volume2, BarChart3, Activity } from 'lucide-react'

interface PriceData {
  date: string
  open: number
  high: number
  low: number
  close: number
  volume: number
  formattedDate: string
}

interface CardChartProps {
  cardId: string
  timeframe: string
  chartType: 'line' | 'candlestick' | 'area'
}

const CardChart = ({ cardId, timeframe, chartType }: CardChartProps) => {
  const [priceData, setPriceData] = useState<PriceData[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedIndicators, setSelectedIndicators] = useState<string[]>(['MA7'])

  // Generate mock OHLC data
  const generateMockData = (): PriceData[] => {
    const basePrice = 1200
    const dataPoints = timeframe === '1D' ? 24 : timeframe === '1W' ? 7 : timeframe === '1M' ? 30 : 90
    
    let currentPrice = basePrice
    return Array.from({ length: dataPoints }, (_, i) => {
      const date = new Date()
      if (timeframe === '1D') {
        date.setHours(date.getHours() - (dataPoints - i))
      } else {
        date.setDate(date.getDate() - (dataPoints - i))
      }

      // Generate realistic OHLC data
      const volatility = basePrice * 0.02 // 2% volatility
      const trend = (Math.random() - 0.48) * volatility // Slight upward bias
      
      const open = currentPrice
      const change = (Math.random() - 0.5) * volatility
      const high = open + Math.abs(change) + (Math.random() * volatility * 0.5)
      const low = open - Math.abs(change) - (Math.random() * volatility * 0.5)
      const close = open + trend + change
      
      currentPrice = close
      
      return {
        date: date.toISOString(),
        open: Math.max(open, 100),
        high: Math.max(high, open, close),
        low: Math.min(low, open, close),
        close: Math.max(close, 100),
        volume: Math.floor(Math.random() * 50) + 10,
        formattedDate: timeframe === '1D' 
          ? date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
          : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      }
    })
  }

  // Calculate technical indicators
  const calculateMovingAverage = (data: PriceData[], period: number) => {
    return data.map((item, index) => {
      if (index < period - 1) return { ...item, ma: null }
      
      const sum = data.slice(index - period + 1, index + 1)
        .reduce((acc, curr) => acc + curr.close, 0)
      
      return { ...item, ma: sum / period }
    })
  }

  useEffect(() => {
    setLoading(true)
    const data = generateMockData()
    const dataWithMA = calculateMovingAverage(data, 7)
    setPriceData(dataWithMA)
    setLoading(false)
  }, [cardId, timeframe])

  const currentPrice = priceData[priceData.length - 1]?.close || 0
  const previousPrice = priceData[priceData.length - 2]?.close || 0
  const priceChange = currentPrice - previousPrice
  const priceChangePercent = (priceChange / previousPrice) * 100

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white p-4 border border-periwinkle-200 rounded-lg shadow-lg min-w-48">
          <p className="text-sm text-periwinkle-600 mb-2">{label}</p>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-xs text-periwinkle-600">Open:</span>
              <span className="text-xs font-medium"></span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-periwinkle-600">High:</span>
              <span className="text-xs font-medium text-green-600"></span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-periwinkle-600">Low:</span>
              <span className="text-xs font-medium text-red-600"></span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-periwinkle-600">Close:</span>
              <span className="text-xs font-medium"></span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-periwinkle-600">Volume:</span>
              <span className="text-xs font-medium">{data.volume}</span>
            </div>
            {data.ma && (
              <div className="flex justify-between">
                <span className="text-xs text-periwinkle-600">MA7:</span>
                <span className="text-xs font-medium text-periwinkle-500"></span>
              </div>
            )}
          </div>
        </div>
      )
    }
    return null
  }

  const CandlestickBar = (props: any) => {
    const { payload, x, y, width, height } = props
    const { open, close, high, low } = payload
    
    const isPositive = close >= open
    const color = isPositive ? '#10B981' : '#EF4444'
    const bodyHeight = Math.abs(close - open) * height / (payload.high - payload.low)
    const bodyY = Math.min(open, close) === open ? y : y + height - bodyHeight
    
    return (
      <g>
        {/* Wick */}
        <line
          x1={x + width / 2}
          y1={y}
          x2={x + width / 2}
          y2={y + height}
          stroke={color}
          strokeWidth={1}
        />
        {/* Body */}
        <rect
          x={x + width * 0.2}
          y={bodyY}
          width={width * 0.6}
          height={bodyHeight}
          fill={color}
          stroke={color}
          strokeWidth={1}
        />
      </g>
    )
  }

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-periwinkle-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Chart Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div>
            <h3 className="text-2xl font-bold text-periwinkle-900">
              
            </h3>
            <div className="flex items-center mt-1">
              {priceChange >= 0 ? (
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
              )}
              <span className={	ext-sm font-medium }>
                {priceChange >= 0 ? '+' : ''} ({priceChangePercent.toFixed(2)}%)
              </span>
            </div>
          </div>
        </div>

        {/* Chart Controls */}
        <div className="flex items-center space-x-2">
          <div className="flex bg-periwinkle-100 rounded-lg p-1">
            {['line', 'candlestick', 'area'].map((type) => (
              <button
                key={type}
                className={px-3 py-1 rounded-md text-sm font-medium transition-colors }
              >
                {type === 'line' && <Activity className="w-4 h-4" />}
                {type === 'candlestick' && <BarChart3 className="w-4 h-4" />}
                {type === 'area' && <TrendingUp className="w-4 h-4" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chart */}
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={priceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
              domain={['dataMin - 50', 'dataMax + 50']}
              tickFormatter={(value) => ${value.toFixed(0)}}
            />
            <Tooltip content={<CustomTooltip />} />
            
            {/* Moving Average */}
            {selectedIndicators.includes('MA7') && (
              <Line
                type="monotone"
                dataKey="ma"
                stroke="#8A8AE6"
                strokeWidth={2}
                dot={false}
                strokeDasharray="5 5"
              />
            )}
            
            {/* Price Line */}
            <Line
              type="monotone"
              dataKey="close"
              stroke="#5B21B6"
              strokeWidth={3}
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Volume Chart */}
      <div className="h-24">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={priceData} margin={{ top: 0, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="formattedDate" hide />
            <YAxis hide />
            <Bar dataKey="volume" fill="#E6E6FF" />
          </ComposedChart>
        </ResponsiveContainer>
        <div className="flex items-center justify-center mt-2">
          <Volume2 className="w-4 h-4 text-periwinkle-600 mr-2" />
          <span className="text-sm text-periwinkle-600">Volume</span>
        </div>
      </div>
    </div>
  )
}

export default CardChart
