'use client'

import React from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import Image from 'next/image'

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

interface HoldingsListProps {
  holdings: Holding[]
}

const HoldingsList = ({ holdings }: HoldingsListProps) => {
  return (
    <div className="space-y-3">
      {holdings.map((holding) => (
        <div 
          key={holding.id}
          className="flex items-center justify-between p-4 rounded-xl bg-periwinkle-50 hover:bg-periwinkle-100 transition-colors cursor-pointer"
        >
          {/* Card Info */}
          <div className="flex items-center space-x-4">
            <div className="relative w-12 h-16 rounded-lg overflow-hidden bg-white shadow-sm">
              <Image
                src={holding.imageUrl}
                alt={holding.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h4 className="font-medium text-periwinkle-900">{holding.name}</h4>
              <p className="text-sm text-periwinkle-600">{holding.game}</p>
              <p className="text-xs text-periwinkle-500">{holding.quantity} shares</p>
            </div>
          </div>

          {/* Performance */}
          <div className="text-right">
            <p className="font-medium text-periwinkle-900">
              
            </p>
            <div className="flex items-center justify-end mt-1">
              {holding.unrealizedPL >= 0 ? (
                <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="w-3 h-3 text-red-500 mr-1" />
              )}
              <span className={	ext-sm font-medium }>
                {holding.unrealizedPL >= 0 ? '+' : ''}
              </span>
            </div>
            <p className={	ext-xs }>
              {holding.unrealizedPL >= 0 ? '+' : ''}{holding.unrealizedPLPercent.toFixed(2)}%
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default HoldingsList
