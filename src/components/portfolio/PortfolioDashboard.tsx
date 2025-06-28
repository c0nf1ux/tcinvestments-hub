'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, DollarSign, PieChart, Activity, Eye } from 'lucide-react'
import PortfolioChart from './PortfolioChart'
import AssetAllocation from './AssetAllocation'
import HoldingsList from './HoldingsList'
import MarketOverview from './MarketOverview'

interface PortfolioData {
  totalValue: number
  totalReturn: number
  totalReturnPercent: number
  dayChange: number
  dayChangePercent: number
  holdings: Holding[]
  allocation: AllocationData[]
}

interface Holding {
  id: string
  name: string
  game: string
  quantity: number
  avgCost: number
  currentPrice: number
  totalValue: number
  unrealizedPL: number
  unrealizedPLPercent: number
  imageUrl: string
}

interface AllocationData {
  game: string
  value: number
  percentage: number
  color: string
}

const PortfolioDashboard = () => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null)
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D')
  const [loading, setLoading] = useState(true)

  // Mock data - replace with real API calls
  useEffect(() => {
    const mockData: PortfolioData = {
      totalValue: 15847.32,
      totalReturn: 2847.32,
      totalReturnPercent: 21.87,
      dayChange: 234.56,
      dayChangePercent: 1.51,
      holdings: [
        {
          id: '1',
          name: 'Charizard Base Set',
          game: 'Pokemon',
          quantity: 2,
          avgCost: 1200.00,
          currentPrice: 1450.00,
          totalValue: 2900.00,
          unrealizedPL: 500.00,
          unrealizedPLPercent: 20.83,
          imageUrl: '/api/placeholder/100/140'
        },
        {
          id: '2', 
          name: 'Black Lotus Alpha',
          game: 'Magic',
          quantity: 1,
          avgCost: 8500.00,
          currentPrice: 9200.00,
          totalValue: 9200.00,
          unrealizedPL: 700.00,
          unrealizedPLPercent: 8.24,
          imageUrl: '/api/placeholder/100/140'
        },
        {
          id: '3',
          name: 'Blue-Eyes White Dragon LOB',
          game: 'Yu-Gi-Oh',
          quantity: 3,
          avgCost: 450.00,
          currentPrice: 520.00,
          totalValue: 1560.00,
          unrealizedPL: 210.00,
          unrealizedPLPercent: 15.56,
          imageUrl: '/api/placeholder/100/140'
        }
      ],
      allocation: [
        { game: 'Magic', value: 9200.00, percentage: 58.1, color: '#8A8AE6' },
        { game: 'Pokemon', value: 4587.32, percentage: 28.9, color: '#C5C5FF' },
        { game: 'Yu-Gi-Oh', value: 2060.00, percentage: 13.0, color: '#E6E6FF' }
      ]
    }
    
    setTimeout(() => {
      setPortfolioData(mockData)
      setLoading(false)
    }, 1000)
  }, [])

  const timeframes = ['1D', '1W', '1M', '3M', '1Y', 'ALL']

  if (loading) {
    return (
      <div className="min-h-screen bg-periwinkle-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-periwinkle-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-periwinkle-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Portfolio Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-periwinkle-900">Portfolio</h1>
            <div className="flex items-center space-x-2">
              <Eye className="w-5 h-5 text-periwinkle-600" />
              <span className="text-sm text-periwinkle-600">Live</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Value */}
            <div>
              <p className="text-sm text-periwinkle-600 mb-1">Total Value</p>
              <p className="text-3xl font-bold text-periwinkle-900">
                
              </p>
              <div className="flex items-center mt-2">
                {portfolioData && portfolioData.dayChange >= 0 ? (
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                )}
                <span className={	ext-sm font-medium }>
                   ({portfolioData?.dayChangePercent.toFixed(2)}%)
                </span>
                <span className="text-xs text-periwinkle-600 ml-2">Today</span>
              </div>
            </div>

            {/* Total Return */}
            <div>
              <p className="text-sm text-periwinkle-600 mb-1">Total Return</p>
              <p className="text-2xl font-bold text-green-500">
                +
              </p>
              <p className="text-sm text-green-500 mt-2">
                +{portfolioData?.totalReturnPercent.toFixed(2)}% All Time
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <DollarSign className="w-8 h-8 text-periwinkle-500 mx-auto mb-2" />
                <p className="text-sm text-periwinkle-600">Holdings</p>
                <p className="font-bold text-periwinkle-900">{portfolioData?.holdings.length}</p>
              </div>
              <div className="text-center">
                <Activity className="w-8 h-8 text-periwinkle-500 mx-auto mb-2" />
                <p className="text-sm text-periwinkle-600">Trades</p>
                <p className="font-bold text-periwinkle-900">247</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Portfolio Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-periwinkle-900">Performance</h2>
            <div className="flex bg-periwinkle-100 rounded-lg p-1">
              {timeframes.map((timeframe) => (
                <button
                  key={timeframe}
                  onClick={() => setSelectedTimeframe(timeframe)}
                  className={px-3 py-1 rounded-md text-sm font-medium transition-colors }
                >
                  {timeframe}
                </button>
              ))}
            </div>
          </div>
          <PortfolioChart timeframe={selectedTimeframe} />
        </motion.div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Asset Allocation */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center mb-4">
              <PieChart className="w-5 h-5 text-periwinkle-600 mr-2" />
              <h3 className="text-lg font-bold text-periwinkle-900">Asset Allocation</h3>
            </div>
            <AssetAllocation data={portfolioData?.allocation || []} />
          </motion.div>

          {/* Holdings List */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6"
          >
            <h3 className="text-lg font-bold text-periwinkle-900 mb-4">Holdings</h3>
            <HoldingsList holdings={portfolioData?.holdings || []} />
          </motion.div>
        </div>

        {/* Market Overview */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h3 className="text-lg font-bold text-periwinkle-900 mb-4">Market Overview</h3>
          <MarketOverview />
        </motion.div>

      </div>
    </div>
  )
}

export default PortfolioDashboard
