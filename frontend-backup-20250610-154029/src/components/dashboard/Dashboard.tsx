'use client'
import { useState } from 'react'
import { TrendingUp, TrendingDown, Search, Plus, Star } from 'lucide-react'

interface Card {
  id: string
  name: string
  set: string
  game: 'pokemon' | 'magic' | 'yugioh'
  currentPrice: number
  change24h: number
  imageUrl: string
}

interface PortfolioItem {
  card: Card
  quantity: number
  purchasePrice: number
  currentValue: number
  pnl: number
}

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGame, setSelectedGame] = useState<'all' | 'pokemon' | 'magic' | 'yugioh'>('all')

  // Mock data - will be replaced with real API data
  const portfolioItems: PortfolioItem[] = [
    {
      card: {
        id: '1',
        name: 'Charizard VMAX',
        set: 'Champion\'s Path',
        game: 'pokemon',
        currentPrice: 89.99,
        change24h: 5.2,
        imageUrl: '/api/placeholder/200/280'
      },
      quantity: 2,
      purchasePrice: 75.00,
      currentValue: 179.98,
      pnl: 29.98
    },
    {
      card: {
        id: '2',
        name: 'Black Lotus',
        set: 'Alpha',
        game: 'magic',
        currentPrice: 25000.00,
        change24h: -2.1,
        imageUrl: '/api/placeholder/200/280'
      },
      quantity: 1,
      purchasePrice: 22000.00,
      currentValue: 25000.00,
      pnl: 3000.00
    }
  ]

  const totalValue = portfolioItems.reduce((sum, item) => sum + item.currentValue, 0)
  const totalPnL = portfolioItems.reduce((sum, item) => sum + item.pnl, 0)
  const totalPnLPercent = (totalPnL / (totalValue - totalPnL)) * 100

  return (
    <div className=\"min-h-screen bg-periwinkle-50 p-4\">
      <div className=\"max-w-7xl mx-auto\">
        {/* Header */}
        <div className=\"flex justify-between items-center mb-8\">
          <h1 className=\"text-3xl font-bold text-periwinkle-900\">CardHood</h1>
          <div className=\"flex gap-4\">
            <button className=\"bg-periwinkle-500 text-white px-4 py-2 rounded-lg hover:bg-periwinkle-600 flex items-center gap-2\">
              <Plus size={16} />
              Add Card
            </button>
          </div>
        </div>

        {/* Portfolio Summary */}
        <div className=\"bg-white rounded-lg shadow-lg p-6 mb-6\">
          <h2 className=\"text-xl font-semibold text-periwinkle-900 mb-4\">Portfolio Overview</h2>
          <div className=\"grid grid-cols-1 md:grid-cols-3 gap-6\">
            <div>
              <p className=\"text-periwinkle-600 text-sm\">Total Value</p>
              <p className=\"text-2xl font-bold text-periwinkle-900\"></p>
            </div>
            <div>
              <p className=\"text-periwinkle-600 text-sm\">Total P&L</p>
              <p className={	ext-2xl font-bold \}>
                
              </p>
            </div>
            <div>
              <p className=\"text-periwinkle-600 text-sm\">P&L %</p>
              <div className=\"flex items-center gap-2\">
                <p className={	ext-2xl font-bold \}>
                  {totalPnLPercent >= 0 ? '+' : ''}{totalPnLPercent.toFixed(2)}%
                </p>
                {totalPnLPercent >= 0 ? <TrendingUp className=\"text-success\" size={20} /> : <TrendingDown className=\"text-red-500\" size={20} />}
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className=\"bg-white rounded-lg shadow-lg p-6 mb-6\">
          <div className=\"flex flex-col md:flex-row gap-4\">
            <div className=\"flex-1 relative\">
              <Search className=\"absolute left-3 top-3 text-periwinkle-400\" size={20} />
              <input
                type=\"text\"
                placeholder=\"Search cards...\"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className=\"w-full pl-10 pr-4 py-2 border border-periwinkle-200 rounded-lg focus:ring-2 focus:ring-periwinkle-400 focus:border-transparent\"
              />
            </div>
            <div className=\"flex gap-2\">
              {['all', 'pokemon', 'magic', 'yugioh'].map((game) => (
                <button
                  key={game}
                  onClick={() => setSelectedGame(game as any)}
                  className={px-4 py-2 rounded-lg capitalize \}
                >
                  {game}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Holdings */}
        <div className=\"bg-white rounded-lg shadow-lg p-6\">
          <h2 className=\"text-xl font-semibold text-periwinkle-900 mb-4\">Your Holdings</h2>
          <div className=\"space-y-4\">
            {portfolioItems.map((item) => (
              <div key={item.card.id} className=\"flex items-center justify-between p-4 border border-periwinkle-100 rounded-lg hover:bg-periwinkle-50\">
                <div className=\"flex items-center gap-4\">
                  <div className=\"w-16 h-16 bg-periwinkle-100 rounded-lg flex items-center justify-center\">
                    <span className=\"text-2xl\">{item.card.game === 'pokemon' ? '' : item.card.game === 'magic' ? '' : ''}</span>
                  </div>
                  <div>
                    <h3 className=\"font-semibold text-periwinkle-900\">{item.card.name}</h3>
                    <p className=\"text-periwinkle-600 text-sm\">{item.card.set}  {item.quantity} cards</p>
                  </div>
                </div>
                <div className=\"text-right\">
                  <p className=\"font-semibold text-periwinkle-900\"></p>
                  <div className=\"flex items-center gap-1\">
                    <p className={	ext-sm \}>
                      {item.pnl >= 0 ? '+' : ''}
                    </p>
                    {item.card.change24h >= 0 ? <TrendingUp size={14} className=\"text-success\" /> : <TrendingDown size={14} className=\"text-red-500\" />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
