// Card API utilities and data fetching
const API_ENDPOINTS = {
  pokemon: 'https://api.pokemontcg.io/v2/cards',
  magic: 'https://api.scryfall.com/cards/search',
  yugioh: 'https://db.ygoprodeck.com/api/v7/cardinfo.php'
}

export interface Card {
  id: string
  name: string
  set: string
  game: 'pokemon' | 'magic' | 'yugioh'
  currentPrice: number
  change24h: number
  rarity: string
  imageUrl: string
  marketData?: {
    low: number
    mid: number
    high: number
    market: number
    directLow: number
  }
}

export class CardAPI {
  // Pokemon TCG API integration
  static async searchPokemonCards(query: string): Promise<Card[]> {
    try {
      const response = await fetch(\?q=name:\*&pageSize=20)
      const data = await response.json()
      
      return data.data?.map((card: any) => ({
        id: card.id,
        name: card.name,
        set: card.set?.name || 'Unknown Set',
        game: 'pokemon' as const,
        currentPrice: card.tcgplayer?.prices?.holofoil?.market || 
                     card.tcgplayer?.prices?.normal?.market || 
                     Math.random() * 50 + 10, // Fallback for demo
        change24h: (Math.random() - 0.5) * 20, // Mock 24h change
        rarity: card.rarity || 'Common',
        imageUrl: card.images?.small || '/api/placeholder/200/280',
        marketData: card.tcgplayer?.prices?.holofoil || card.tcgplayer?.prices?.normal
      })) || []
    } catch (error) {
      console.error('Pokemon API error:', error)
      return this.getMockPokemonCards(query)
    }
  }

  // Magic: The Gathering API integration
  static async searchMagicCards(query: string): Promise<Card[]> {
    try {
      const response = await fetch(\?q=\&format=json&page=1)
      const data = await response.json()
      
      return data.data?.map((card: any) => ({
        id: card.id,
        name: card.name,
        set: card.set_name,
        game: 'magic' as const,
        currentPrice: card.prices?.usd ? parseFloat(card.prices.usd) : Math.random() * 100 + 5,
        change24h: (Math.random() - 0.5) * 15,
        rarity: card.rarity || 'common',
        imageUrl: card.image_uris?.normal || '/api/placeholder/200/280',
        marketData: {
          low: card.prices?.usd ? parseFloat(card.prices.usd) * 0.8 : 0,
          mid: card.prices?.usd ? parseFloat(card.prices.usd) : 0,
          high: card.prices?.usd ? parseFloat(card.prices.usd) * 1.2 : 0,
          market: card.prices?.usd ? parseFloat(card.prices.usd) : 0,
          directLow: card.prices?.usd ? parseFloat(card.prices.usd) * 0.9 : 0
        }
      })) || []
    } catch (error) {
      console.error('Magic API error:', error)
      return this.getMockMagicCards(query)
    }
  }

  // Yu-Gi-Oh API integration
  static async searchYugiohCards(query: string): Promise<Card[]> {
    try {
      const response = await fetch(\?fname=\&num=20&offset=0)
      const data = await response.json()
      
      return data.data?.map((card: any) => ({
        id: card.id.toString(),
        name: card.name,
        set: card.card_sets?.[0]?.set_name || 'Unknown Set',
        game: 'yugioh' as const,
        currentPrice: card.card_prices?.[0]?.tcgplayer_price ? 
                     parseFloat(card.card_prices[0].tcgplayer_price) : 
                     Math.random() * 30 + 5,
        change24h: (Math.random() - 0.5) * 10,
        rarity: card.card_sets?.[0]?.set_rarity || 'Common',
        imageUrl: card.card_images?.[0]?.image_url || '/api/placeholder/200/280',
        marketData: card.card_prices?.[0] ? {
          low: parseFloat(card.card_prices[0].tcgplayer_price || '0') * 0.8,
          mid: parseFloat(card.card_prices[0].tcgplayer_price || '0'),
          high: parseFloat(card.card_prices[0].tcgplayer_price || '0') * 1.2,
          market: parseFloat(card.card_prices[0].tcgplayer_price || '0'),
          directLow: parseFloat(card.card_prices[0].tcgplayer_price || '0') * 0.9
        } : undefined
      })) || []
    } catch (error) {
      console.error('Yu-Gi-Oh API error:', error)
      return this.getMockYugiohCards(query)
    }
  }

  // Unified search across all games
  static async searchAllCards(query: string, gameFilter?: 'pokemon' | 'magic' | 'yugioh'): Promise<Card[]> {
    const searches: Promise<Card[]>[] = []
    
    if (!gameFilter || gameFilter === 'pokemon') {
      searches.push(this.searchPokemonCards(query))
    }
    if (!gameFilter || gameFilter === 'magic') {
      searches.push(this.searchMagicCards(query))
    }
    if (!gameFilter || gameFilter === 'yugioh') {
      searches.push(this.searchYugiohCards(query))
    }

    try {
      const results = await Promise.all(searches)
      return results.flat().sort((a, b) => b.currentPrice - a.currentPrice)
    } catch (error) {
      console.error('Search error:', error)
      return []
    }
  }

  // Mock data fallbacks for demo purposes
  static getMockPokemonCards(query: string): Card[] {
    return [
      {
        id: 'mock-poke-1',
        name: \ Pikachu,
        set: 'Base Set',
        game: 'pokemon',
        currentPrice: 89.99,
        change24h: 5.2,
        rarity: 'Rare',
        imageUrl: '/api/placeholder/200/280'
      }
    ]
  }

  static getMockMagicCards(query: string): Card[] {
    return [
      {
        id: 'mock-magic-1',
        name: \ Lightning Bolt,
        set: 'Alpha',
        game: 'magic',
        currentPrice: 899.99,
        change24h: -2.1,
        rarity: 'Common',
        imageUrl: '/api/placeholder/200/280'
      }
    ]
  }

  static getMockYugiohCards(query: string): Card[] {
    return [
      {
        id: 'mock-yugioh-1',
        name: \ Blue-Eyes White Dragon,
        set: 'LOB',
        game: 'yugioh',
        currentPrice: 299.99,
        change24h: 7.8,
        rarity: 'Ultra Rare',
        imageUrl: '/api/placeholder/200/280'
      }
    ]
  }

  // Trending cards across all games
  static async getTrendingCards(): Promise<Card[]> {
    try {
      // Get popular searches from each game
      const trendingPromises = [
        this.searchPokemonCards('charizard'),
        this.searchMagicCards('lightning bolt'),
        this.searchYugiohCards('blue-eyes')
      ]
      
      const results = await Promise.all(trendingPromises)
      return results.flat().slice(0, 10)
    } catch (error) {
      console.error('Trending cards error:', error)
      return []
    }
  }

  // Price history simulation (replace with real price tracking)
  static generatePriceHistory(currentPrice: number, days: number = 30): Array<{date: string, price: number}> {
    const history = []
    let price = currentPrice
    
    for (let i = days; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      
      // Simulate price fluctuation
      const change = (Math.random() - 0.5) * 0.1 // 10% max change per day
      price = Math.max(price * (1 + change), 0.01)
      
      history.push({
        date: date.toISOString().split('T')[0],
        price: Math.round(price * 100) / 100
      })
    }
    
    return history
  }
}

// Real-time price updates (WebSocket simulation)
export class PriceUpdater {
  private static intervals: Map<string, NodeJS.Timeout> = new Map()

  static startPriceUpdates(cardId: string, callback: (price: number, change: number) => void) {
    if (this.intervals.has(cardId)) {
      clearInterval(this.intervals.get(cardId))
    }

    const interval = setInterval(() => {
      // Simulate real-time price changes
      const change = (Math.random() - 0.5) * 0.02 // 2% max change
      const newPrice = Math.random() * 1000 + 10 // Mock price
      callback(newPrice, change * 100)
    }, 5000) // Update every 5 seconds

    this.intervals.set(cardId, interval)
  }

  static stopPriceUpdates(cardId: string) {
    const interval = this.intervals.get(cardId)
    if (interval) {
      clearInterval(interval)
      this.intervals.delete(cardId)
    }
  }

  static stopAllUpdates() {
    this.intervals.forEach(interval => clearInterval(interval))
    this.intervals.clear()
  }
}
