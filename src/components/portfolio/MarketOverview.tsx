'use client'

import React from 'react'
import { TrendingUp, TrendingDown, Activity } from 'lucide-react'

interface MarketCard {
  id: string
  name: string
  game: string
  price: number
  change: number
  changePercent: number
  volume: number
  imageUrl: string
}

const MarketOverview = () => {
  // Mock market data
  const trendingCards: MarketCard[] = [
    {
      id: '1',
      name: 'Pikachu Illustrator',
      game: 'Pokemon',
      price: 5275000,
      change: 125000,
      changePercent: 2.43,
      volume: 12,
      imageUrl: '/api/placeholder/60/80'
    },
    {
      id: '2',
      name: 'Ancestral Recall',
      game: 'Magic',
      price: 8500,
      change: -200,
      changePercent: -2.30,
      volume: 45,
      imageUrl: '/api/placeholder/60/80'
    },
    {
      id: '3',
      name: 'Dark Magician LOB',
      game: 'Yu-Gi-Oh',
      price: 890,
      change: 45,
      changePercent: 5.33,
      volume: 78,
      imageUrl: '/api/placeholder/60/80'
    }
  ]

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return $M
    } else if (price >= 1000) {
      return $k
    }
    return $
  }

  return (
    <div className="space-y-6">
      
      {/* Market Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-periwinkle-50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-periwinkle-600">Market Cap</p>
              <p className="text-xl font-bold text-periwinkle-900">.4B</p>
            </div>
            <Activity className="w-8 h-8 text-periwinkle-500" />
          </div>
          <p className="text-xs text-green-500 mt-2">+5.2% this week</p>
        </div>

        <div className="bg-periwinkle-50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-periwinkle-600">24h Volume</p>
              <p className="text-xl font-bold text-periwinkle-900">.8M</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
          <p className="text-xs text-green-500 mt-2">+12.4% vs yesterday</p>
        </div>

        <div className="bg-periwinkle-50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-periwinkle-600">Active Traders</p>
              <p className="text-xl font-bold text-periwinkle-900">47.2k</p>
            </div>
            <TrendingUp className="w-8 h-8 text-periwinkle-500" />
          </div>
          <p className="text-xs text-periwinkle-600 mt-2">+8.1% this month</p>
        </div>
      </div>

      {/* Trending Cards */}
      <div>
        <h4 className="text-lg font-bold text-periwinkle-900 mb-4">Trending Cards</h4>
        <div className="space-y-3">
          {trendingCards.map((card, index) => (
            <div 
              key={card.id}
              className="flex items-center justify-between p-4 rounded-xl bg-periwinkle-50 hover:bg-periwinkle-100 transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-periwinkle-200 text-periwinkle-700 font-bold text-sm">
                  {index + 1}
                </div>
                <div className="w-10 h-12 rounded bg-white shadow-sm"></div>
                <div>
                  <h5 className="font-medium text-periwinkle-900">{card.name}</h5>
                  <p className="text-sm text-periwinkle-600">{card.game}</p>
                </div>
              </div>

              <div className="text-right">
                <p className="font-bold text-periwinkle-900">{formatPrice(card.price)}</p>
                <div className="flex items-center justify-end mt-1">
                  {card.change >= 0 ? (
                    <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-red-500 mr-1" />
                  )}
                  <span className={	ext-sm font-medium }>
                    {card.change >= 0 ? '+' : ''}{card.changePercent.toFixed(2)}%
                  </span>
                </div>
                <p className="text-xs text-periwinkle-500">Vol: {card.volume}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MarketOverview
