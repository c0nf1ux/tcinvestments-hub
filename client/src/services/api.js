// client/src/services/api.js
const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
  async get(endpoint) {
    const response = await fetch(${API_BASE_URL});
    if (!response.ok) throw new Error(API Error: );
    return response.json();
  }

  async post(endpoint, data) {
    const response = await fetch(${API_BASE_URL}, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(API Error: );
    return response.json();
  }

  async delete(endpoint) {
    const response = await fetch(${API_BASE_URL}, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error(API Error: );
    return response.json();
  }

  // Portfolio methods
  getPortfolio() { return this.get('/portfolio'); }
  getPortfolioHistory(timeframe) { return this.get(/portfolio/history/); }
  
  // Cards methods
  getCards() { return this.get('/cards'); }
  getCard(id) { return this.get(/cards/); }
  getCardHistory(id, timeframe) { return this.get(/cards//history/); }
  
  // Watchlist methods
  getWatchlist() { return this.get('/watchlist'); }
  addToWatchlist(cardId) { return this.post(/watchlist/); }
  removeFromWatchlist(cardId) { return this.delete(/watchlist/); }
  
  // IPO methods
  getIPOs() { return this.get('/ipo'); }
  getIPO(id) { return this.get(/ipo/); }
  
  // AI methods
  getAIPredictions() { return this.get('/ai/predictions'); }
  getPortfolioOptimization() { return this.get('/ai/portfolio-optimization'); }
  
  // Market methods
  getMarketOverview() { return this.get('/market/overview'); }
  search(query) { return this.get(/search?q=); }
}

export default new ApiService();
