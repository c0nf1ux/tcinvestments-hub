'use client'

import React, { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, Calendar, Filter } from 'lucide-react'

interface Transaction {
  id: string
  type: 'buy' | 'sell'
  quantity: number
  price: number
  total: number
  fee: number
  date: string
  status: 'completed' | 'pending' | 'cancelled'
}

interface TransactionHistoryProps {
  cardId?: string
  userId?: string
  showFilters?: boolean
}

const TransactionHistory = ({ cardId, userId, showFilters = true }: TransactionHistoryProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [filter, setFilter] = useState<'all' | 'buy' | 'sell'>('all')
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date')
  const [loading, setLoading] = useState(true)

  // Generate mock transaction data
  const generateMockTransactions = (): Transaction[] => {
    const mockTransactions: Transaction[] = []
    
    for (let i = 0; i < 15; i++) {
      const type = Math.random() > 0.5 ? 'buy' : 'sell'
      const quantity = Math.floor(Math.random() * 5) + 1
      const price = 1200 + (Math.random() - 0.5) * 400
      const total = price * quantity
      const fee = total * 0.025
      
      const date = new Date()
      date.setDate(date.getDate() - Math.floor(Math.random() * 30))
      
      mockTransactions.push({
        id: 	rans-,
        type,
        quantity,
        price,
        total: type === 'buy' ? total + fee : total - fee,
        fee,
        date: date.toISOString(),
        status: Math.random() > 0.9 ? 'pending' : 'completed'
      })
    }
    
    return mockTransactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  useEffect(() => {
    setTimeout(() => {
      setTransactions(generateMockTransactions())
      setLoading(false)
    }, 500)
  }, [cardId, userId])

  const filteredTransactions = transactions
    .filter(transaction => filter === 'all' || transaction.type === filter)
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      } else {
        return b.total - a.total
      }
    })

  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="animate-pulse bg-periwinkle-100 h-16 rounded-lg"></div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      
      {/* Filters */}
      {showFilters && (
        <div className="flex items-center justify-between">
          <div className="flex bg-periwinkle-100 rounded-lg p-1">
            {[
              { key: 'all', label: 'All' },
              { key: 'buy', label: 'Buys' },
              { key: 'sell', label: 'Sells' }
            ].map((option) => (
              <button
                key={option.key}
                onClick={() => setFilter(option.key as any)}
                className={px-3 py-1 rounded-md text-sm font-medium transition-colors }
              >
                {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-3">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-periwinkle-600">No orders found</p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className="p-4 bg-white border border-periwinkle-200 rounded-xl hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {getStatusIcon(order.status)}
                  
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className={ont-medium }>
                        {order.type.toUpperCase()}
                      </span>
                      <span className="text-periwinkle-900 font-medium">
                        {order.quantity} shares
                      </span>
                      <span className="text-periwinkle-600">of</span>
                      <span className="text-periwinkle-900 font-medium">
                        {order.cardName}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-4 mt-1 text-sm text-periwinkle-600">
                      <span>
                        {order.orderType === 'market' ? 'Market Order' : Limit }
                      </span>
                      <span></span>
                      <span>
                        Created: {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                      {order.expiresAt && (
                        <>
                          <span></span>
                          <span>
                            Expires: {new Date(order.expiresAt).toLocaleDateString()}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-medium text-periwinkle-900">
                       per share
                    </p>
                    {order.status === 'partial' && (
                      <p className="text-sm text-orange-600">
                        {order.filled}/{order.quantity} filled
                      </p>
                    )}
                    <span className={inline-block px-2 py-1 text-xs rounded-full }>
                      {order.status}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    {(order.status === 'pending' || order.status === 'partial') && (
                      <>
                        <button className="p-2 text-periwinkle-600 hover:bg-periwinkle-100 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => cancelOrder(order.id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default OrderManagement
