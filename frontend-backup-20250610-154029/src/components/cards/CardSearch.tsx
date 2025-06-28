'use client'
import { useState, useEffect } from 'react'
import { Search, Star, TrendingUp, TrendingDown, ExternalLink } from 'lucide-react'
import { CardAPI, type Card } from '@/lib/cardAPI'

export default function CardSearch() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Card[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedGame, setSelectedGame] = useState<'all' | 'pokemon' | 'magic' | 'yugioh'>('all')
  const [trendingCards, setTrendingCards] = useState<Card[]>([])

  useEffect(() => {
    const loadTrending = async () => {
      const trending = await CardAPI.getTrendingCards()
      setTrendingCards(trending)
    }
    loadTrending()
  }, [])

  useEffect(() => {
    if (searchQuery.length > 2) {
      setIsLoading(true)
      const searchCards = async () => {
        try {
          const gameFilter = selectedGame === 'all' ? undefined : selectedGame
          const results = await CardAPI.searchAllCards(searchQuery, gameFilter)
          setSearchResults(results)
        } catch (error) {
          console.error('Search error:', error)
          setSearchResults([])
        } finally {
          setIsLoading(false)
        }
      }
      
      const timeoutId = setTimeout(searchCards, 300)
      return () => clearTimeout(timeoutId)
    } else {
      setSearchResults([])
    }
  }, [searchQuery, selectedGame])

  const addToPortfolio = (card: Card) => {
    console.log('Adding to portfolio:', card)
    alert(`Added ${card.name} to portfolio!`)
  }

  const addToWatchlist = (card: Card) => {
    console.log('Adding to watchlist:', card)
    alert(`Added ${card.name} to watchlist!`)
  }

  const CardItem = ({ card }: { card: Card }) => (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-200 border border-periwinkle-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-20 h-28 bg-periwinkle-100 rounded-lg flex items-center justify-center overflow-hidden">
            {card.imageUrl && card.imageUrl !== '/api/placeholder/200/280' ? (
              <img 
                src={card.imageUrl} 
                alt={card.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-3xl">
                {card.game === 'pokemon' ? '' : card.game === 'magic' ? '' : ''}
              </div>
            )}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-periwinkle-900">{card.name}</h3>
            <p className="text-periwinkle-600">{card.set}  {card.rarity}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="inline-block px-2 py-1 bg-periwinkle-100 text-periwinkle-700 text-xs rounded-full capitalize">
                {card.game}
              </span>
              {card.marketData && (
                <span className="text-xs text-periwinkle-500">
                  Market Data Available
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl font-bold text-periwinkle-900">
              ${card.currentPrice.toFixed(2)}
            </span>
            <div className={card.change24h >= 0 ? 'text-success flex items-center gap-1' : 'text-red-500 flex items-center gap-1'}>
              {card.change24h >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              <span className="text-sm font-medium">
                {card.change24h >= 0 ? '+' : ''}{card.change24h.toFixed(1)}%
              </span>
            </div>
          </div>
          
          {card.marketData && (
            <div className="text-xs text-periwinkle-600 mb-2">
              Low: ${card.marketData.low?.toFixed(2)} | High: ${card.marketData.high?.toFixed(2)}
            </div>
          )}
          
          <div className="flex gap-2">
            <button
              onClick={() => addToWatchlist(card)}
              className="px-3 py-1 text-periwinkle-600 border border-periwinkle-300 rounded hover:bg-periwinkle-50 flex items-center gap-1 transition-colors"
            >
              <Star size={14} />
              Watch
            </button>
            <button
              onClick={() => addToPortfolio(card)}
              className="px-4 py-1 bg-periwinkle-500 text-white rounded hover:bg-periwinkle-600 transition-colors"
            >
              Buy
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-periwinkle-900 mb-6">Search Trading Cards</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-4 text-periwinkle-400" size={20} />
            <input
              type="text"
              placeholder="Search Pokemon, Magic, or Yu-Gi-Oh cards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-periwinkle-200 rounded-lg focus:ring-2 focus:ring-periwinkle-400 focus:border-transparent text-lg"
            />
          </div>
          <div className="flex gap-2">
            {(['all', 'pokemon', 'magic', 'yugioh'] as const).map((game) => (
              <button
                key={game}
                onClick={() => setSelectedGame(game)}
                className={selectedGame === game ? 'px-4 py-3 rounded-lg capitalize font-medium transition-all bg-periwinkle-500 text-white shadow-md' : 'px-4 py-3 rounded-lg capitalize font-medium transition-all bg-periwinkle-100 text-periwinkle-700 hover:bg-periwinkle-200'}
              >
                {game}
              </button>
            ))}
          </div>
        </div>
        
        <div className="text-sm text-periwinkle-600">
          {searchQuery ? `Searching for "${searchQuery}"` : 'Enter a card name to search across all trading card games'}
        </div>
      </div>

      {isLoading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-periwinkle-500"></div>
          <p className="text-periwinkle-600 mt-4 text-lg">Searching cards across all games...</p>
        </div>
      )}

      {searchResults.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-periwinkle-900 mb-4">
            Search Results ({searchResults.length})
          </h2>
          <div className="space-y-4">
            {searchResults.map((card) => (
              <CardItem key={`${card.game}-${card.id}`} card={card} />
            ))}
          </div>
        </div>
      )}

      {searchQuery.length > 2 && searchResults.length === 0 && !isLoading && (
        <div className="text-center py-12 bg-white rounded-lg shadow-lg">
          <p className="text-periwinkle-600 text-lg">No cards found for "{searchQuery}"</p>
          <p className="text-periwinkle-500 text-sm mt-2">Try searching for a different card name or check your spelling</p>
        </div>
      )}

      {!searchQuery && trendingCards.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold text-periwinkle-900 mb-4 flex items-center gap-2">
            <TrendingUp className="text-success" size={24} />
            Trending Cards
          </h2>
          <div className="space-y-4">
            {trendingCards.map((card) => (
              <CardItem key={`trending-${card.game}-${card.id}`} card={card} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
