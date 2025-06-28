'use client'

import React, { useState, useEffect  | Out-File -FilePath "src\lib\trading\index.ts" -Encoding UTF8

Write-Host " Trading Interface components created successfully!" -ForegroundColor Green
Write-Host " Files created:" -ForegroundColor Yellow
Write-Host "   - src/components/trading/BuySellModal.tsx" -ForegroundColor White
Write-Host "   - src/components/trading/CardDetailPage.tsx" -ForegroundColor White
Write-Host "   - src/components/trading/TransactionHistory.tsx" -ForegroundColor White
Write-Host "   - src/components/trading/OrderManagement.tsx" -ForegroundColor White
Write-Host "   - src/lib/trading/index.ts" -ForegroundColor White
Write-Host "" -ForegroundColor White
Write-Host " Trading Features include:" -ForegroundColor Cyan
Write-Host "    Buy/Sell modal with order types" -ForegroundColor Green
Write-Host "    Real-time price charts" -ForegroundColor Green
Write-Host "    Transaction history tracking" -ForegroundColor Green
Write-Host "    Order management system" -ForegroundColor Green
Write-Host "    Portfolio impact calculations" -ForegroundColor Green
Write-Host "    2.5% transaction fees" -ForegroundColor Green
Write-Host "    Risk assessment tools" -ForegroundColor Green
Write-Host "" -ForegroundColor White
Write-Host " Next: Run the premium features & revenue script!" -ForegroundColor Cyan from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Heart, Share, TrendingUp, TrendingDown, Plus, Minus, Eye, BarChart3 } from 'lucide-react'
import Image from 'next/image'
import CardChart from '../charts/CardChart'
import BuySellModal from './BuySellModal'
import TransactionHistory from './TransactionHistory'

interface CardDetailPageProps {
  cardId: string
  onBack: () => void
}

interface CardData {
  id: string
  name: string
  game: string
  currentPrice: number
  priceChange: number
  priceChangePercent: number
  imageUrl: string
  description: string
  rarity: string
  set: string
  condition: string
  marketCap: number
  volume24h: number
  userHoldings: number
  avgCost: number
}

const CardDetailPage = ({ cardId, onBack }: CardDetailPageProps) => {
  const [cardData, setCardData] = useState<CardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D')
  const [buySellModal, setBuySellModal] = useState<{
    isOpen: boolean
    mode: 'buy' | 'sell'
  }>({ isOpen: false, mode: 'buy' })
  const [isWatchlisted, setIsWatchlisted] = useState(false)

  // Mock card data - replace with real API call
  useEffect(() => {
    const mockData: CardData = {
      id: cardId,
      name: 'Charizard Base Set Shadowless',
      game: 'Pokemon',
      currentPrice: 1450.00,
      priceChange: 75.50,
      priceChangePercent: 5.49,
      imageUrl: '/api/placeholder/200/280',
      description: 'A rare Charizard card from the Base Set Shadowless collection. This iconic fire-type Pokemon card is one of the most sought-after cards in the Pokemon TCG.',
      rarity: 'Rare Holo',
      set: 'Base Set Shadowless',
      condition: 'Near Mint',
      marketCap: 2900000,
      volume24h: 1250000,
      userHoldings: 2,
      avgCost: 1200.00
    }
    
    setTimeout(() => {
      setCardData(mockData)
      setLoading(false)
    }, 1000)
  }, [cardId])

  const timeframes = ['1D', '1W', '1M', '3M', '1Y', 'ALL']

  if (loading) {
    return (
      <div className="min-h-screen bg-periwinkle-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-periwinkle-500"></div>
      </div>
    )
  }

  if (!cardData) return null

  const unrealizedPL = (cardData.currentPrice - cardData.avgCost) * cardData.userHoldings
  const unrealizedPLPercent = ((cardData.currentPrice - cardData.avgCost) / cardData.avgCost) * 100

  return (
    <div className="min-h-screen bg-periwinkle-50">
      <div className="max-w-7xl mx-auto p-4 space-y-6">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-periwinkle-600 hover:text-periwinkle-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Portfolio</span>
          </button>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsWatchlisted(!isWatchlisted)}
              className={p-2 rounded-lg transition-colors }
            >
              <Heart className={w-5 h-5 } />
            </button>
            <button className="p-2 rounded-lg bg-periwinkle-100 text-periwinkle-600 hover:bg-periwinkle-200 transition-colors">
              <Share className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Main Card Info and Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Card Information */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            {/* Card Image */}
            <div className="relative w-full max-w-xs mx-auto mb-6">
              <div className="aspect-[2.5/3.5] rounded-xl overflow-hidden bg-gradient-to-br from-periwinkle-100 to-periwinkle-200 shadow-lg">
                <Image
                  src={cardData.imageUrl}
                  alt={cardData.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Card Details */}
            <div className="space-y-4">
              <div>
                <h1 className="text-2xl font-bold text-periwinkle-900 mb-2">
                  {cardData.name}
                </h1>
                <div className="flex items-center space-x-2 text-sm text-periwinkle-600">
                  <span>{cardData.game}</span>
                  <span></span>
                  <span>{cardData.rarity}</span>
                  <span></span>
                  <span>{cardData.condition}</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-periwinkle-600">Set:</span>
                  <span className="font-medium text-periwinkle-900">{cardData.set}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-periwinkle-600">Market Cap:</span>
                  <span className="font-medium text-periwinkle-900">
                    M
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-periwinkle-600">24h Volume:</span>
                  <span className="font-medium text-periwinkle-900">
                    M
                  </span>
                </div>
              </div>

              <div className="p-4 bg-periwinkle-50 rounded-xl">
                <p className="text-sm text-periwinkle-700 leading-relaxed">
                  {cardData.description}
                </p>
              </div>

              {/* Your Holdings */}
              {cardData.userHoldings > 0 && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                  <h3 className="font-medium text-green-900 mb-2">Your Holdings</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-green-700">Shares:</span>
                      <span className="font-medium text-green-900">{cardData.userHoldings}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-700">Avg Cost:</span>
                      <span className="font-medium text-green-900"></span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-700">Total Value:</span>
                      <span className="font-medium text-green-900">
                        
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-green-300 pt-2">
                      <span className="text-green-700">Unrealized P&L:</span>
                      <span className={ont-bold }>
                        {unrealizedPL >= 0 ? '+' : ''} 
                        ({unrealizedPL >= 0 ? '+' : ''}{unrealizedPLPercent.toFixed(2)}%)
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Trading Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setBuySellModal({ isOpen: true, mode: 'buy' })}
                  className="flex items-center justify-center space-x-2 py-3 px-4 bg-green-500 hover:bg-green-600 text-white font-medium rounded-xl transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Buy</span>
                </button>
                <button
                  onClick={() => setBuySellModal({ isOpen: true, mode: 'sell' })}
                  disabled={cardData.userHoldings === 0}
                  className="flex items-center justify-center space-x-2 py-3 px-4 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Minus className="w-4 h-4" />
                  <span>Sell</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Price Chart */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6"
          >
            {/* Price Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-3xl font-bold text-periwinkle-900">
                    
                  </h2>
                  <div className="flex items-center">
                    {cardData.priceChange >= 0 ? (
                      <TrendingUp className="w-5 h-5 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-red-500 mr-1" />
                    )}
                    <span className={	ext-lg font-medium }>
                      {cardData.priceChange >= 0 ? '+' : ''} 
                      ({cardData.priceChangePercent >= 0 ? '+' : ''}{cardData.priceChangePercent.toFixed(2)}%)
                    </span>
                  </div>
                </div>
                <p className="text-sm text-periwinkle-600 mt-1">
                  Last updated: {new Date().toLocaleTimeString()}
                </p>
              </div>
              
              {/* Timeframe Selector */}
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

            {/* Chart Component */}
            <CardChart 
              cardId={cardData.id} 
              timeframe={selectedTimeframe}
              chartType="line"
            />
          </motion.div>
        </div>

        {/* Transaction History */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-periwinkle-900">Recent Transactions</h3>
            <div className="flex items-center space-x-2 text-sm text-periwinkle-600">
              <BarChart3 className="w-4 h-4" />
              <span>Activity</span>
            </div>
          </div>
          <TransactionHistory cardId={cardData.id} />
        </motion.div>

      </div>

      {/* Buy/Sell Modal */}
      <BuySellModal
        isOpen={buySellModal.isOpen}
        onClose={() => setBuySellModal({ ...buySellModal, isOpen: false })}
        card={cardData}
        mode={buySellModal.mode}
        userHoldings={cardData.userHoldings}
      />
    </div>
  )
}

export default CardDetailPage
