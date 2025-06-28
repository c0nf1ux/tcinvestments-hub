import React, { useState, useEffect } from 'react';
import './Marketplace.css';

const Marketplace = () => {
    const [activeTab, setActiveTab] = useState('browse');
    const [listings, setListings] = useState([]);
    const [cart, setCart] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [priceFilter, setPriceFilter] = useState('all');
    const [conditionFilter, setConditionFilter] = useState('all');

    useEffect(() => {
        loadMarketplaceData();
    }, []);

    const loadMarketplaceData = () => {
        // Sample marketplace data - replace with real API
        setListings([
            {
                id: 1,
                name: 'Black Lotus',
                set: 'Alpha',
                price: 45000,
                condition: 'Near Mint',
                seller: 'VintageCollector',
                sellerRating: 4.9,
                quantity: 1,
                image: '',
                shipping: 'FREE',
                inStock: true,
                trending: true,
                priceChange: '+6.25%'
            },
            {
                id: 2,
                name: 'Charizard',
                set: 'Base Set',
                price: 6800,
                condition: 'Mint',
                seller: 'PokemonMaster',
                sellerRating: 4.8,
                quantity: 2,
                image: '',
                shipping: '$15',
                inStock: true,
                trending: true,
                priceChange: '+12.3%'
            },
            {
                id: 3,
                name: 'Mox Ruby',
                set: 'Unlimited',
                price: 8440,
                condition: 'Light Play',
                seller: 'PowerNineDealer',
                sellerRating: 4.95,
                quantity: 1,
                image: '',
                shipping: 'FREE',
                inStock: true,
                trending: false,
                priceChange: '+4.20%'
            },
            {
                id: 4,
                name: 'Time Walk',
                set: 'Alpha',
                price: 9200,
                condition: 'Near Mint',
                seller: 'AlphaInvestor',
                sellerRating: 4.7,
                quantity: 1,
                image: '',
                shipping: 'FREE',
                inStock: true,
                trending: false,
                priceChange: '+2.8%'
            },
            {
                id: 5,
                name: 'Pikachu Illustrator',
                set: 'Promo',
                price: 35000,
                condition: 'PSA 10',
                seller: 'GradedGems',
                sellerRating: 4.9,
                quantity: 1,
                image: '',
                shipping: 'FREE',
                inStock: true,
                trending: true,
                priceChange: '+8.9%'
            }
        ]);
    };

    const addToCart = (listing) => {
        setCart([...cart, listing]);
        alert(`${listing.name} added to cart!`);
    };

    const removeFromCart = (listingId) => {
        setCart(cart.filter(item => item.id !== listingId));
    };

    const getCartTotal = () => {
        return cart.reduce((total, item) => total + item.price, 0);
    };

    const filteredListings = listings.filter(listing => {
        const matchesSearch = listing.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            listing.set.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesPrice = priceFilter === 'all' || 
                           (priceFilter === 'under1k' && listing.price < 1000) ||
                           (priceFilter === '1k-10k' && listing.price >= 1000 && listing.price < 10000) ||
                           (priceFilter === 'over10k' && listing.price >= 10000);
        const matchesCondition = conditionFilter === 'all' || 
                               listing.condition.toLowerCase().includes(conditionFilter.toLowerCase());
        
        return matchesSearch && matchesPrice && matchesCondition;
    });

    return (
        <div className="marketplace">
            <div className="marketplace-header">
                <h1> Integrated Marketplace</h1>
                <p className="marketplace-subtitle">Buy/Sell Platform - TCGPlayer Destroyer</p>
                <div className="destruction-badge">
                    <span className="competitor-killed"> TCGPLAYER: UNDER ATTACK</span>
                    <span className="progress">Progress: 75% Market Domination (6/8 sites)</span>
                </div>
            </div>

            <div className="marketplace-stats">
                <div className="stat-card">
                    <h3>Daily Volume</h3>
                    <div className="stat-value">$2.3M</div>
                    <div className="stat-change">+18.7% vs TCGPlayer</div>
                </div>
                <div className="stat-card">
                    <h3>Active Listings</h3>
                    <div className="stat-value">847,392</div>
                    <div className="stat-change">+23.4% growth</div>
                </div>
                <div className="stat-card">
                    <h3>Sellers</h3>
                    <div className="stat-value">15,678</div>
                    <div className="stat-change">+15.2% new</div>
                </div>
                <div className="stat-card">
                    <h3>Cart Total</h3>
                    <div className="stat-value">${getCartTotal().toLocaleString()}</div>
                    <div className="stat-change">{cart.length} items</div>
                </div>
            </div>

            <div className="marketplace-nav">
                <button 
                    className={`nav-btn ${activeTab === 'browse' ? 'active' : ''}`}
                    onClick={() => setActiveTab('browse')}
                >
                     Browse
                </button>
                <button 
                    className={`nav-btn ${activeTab === 'sell' ? 'active' : ''}`}
                    onClick={() => setActiveTab('sell')}
                >
                     Sell
                </button>
                <button 
                    className={`nav-btn ${activeTab === 'orders' ? 'active' : ''}`}
                    onClick={() => setActiveTab('orders')}
                >
                     Orders
                </button>
                <button 
                    className={`nav-btn ${activeTab === 'cart' ? 'active' : ''}`}
                    onClick={() => setActiveTab('cart')}
                >
                     Cart ({cart.length})
                </button>
            </div>

            {activeTab === 'browse' && (
                <div className="browse-content">
                    <div className="search-filters">
                        <div className="search-bar">
                            <input
                                type="text"
                                placeholder="Search cards, sets, or sellers..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="search-input"
                            />
                            <button className="search-btn"></button>
                        </div>
                        
                        <div className="filters">
                            <select 
                                value={priceFilter} 
                                onChange={(e) => setPriceFilter(e.target.value)}
                                className="filter-select"
                            >
                                <option value="all">All Prices</option>
                                <option value="under1k">Under $1,000</option>
                                <option value="1k-10k">$1,000 - $10,000</option>
                                <option value="over10k">Over $10,000</option>
                            </select>
                            
                            <select 
                                value={conditionFilter} 
                                onChange={(e) => setConditionFilter(e.target.value)}
                                className="filter-select"
                            >
                                <option value="all">All Conditions</option>
                                <option value="mint">Mint</option>
                                <option value="near mint">Near Mint</option>
                                <option value="light play">Light Play</option>
                            </select>
                        </div>
                    </div>

                    <div className="listings-grid">
                        {filteredListings.map(listing => (
                            <div key={listing.id} className="listing-card">
                                {listing.trending && <div className="trending-badge"> TRENDING</div>}
                                
                                <div className="listing-image">
                                    <span className="card-icon">{listing.image}</span>
                                    <div className="price-change">{listing.priceChange}</div>
                                </div>
                                
                                <div className="listing-info">
                                    <h3 className="card-name">{listing.name}</h3>
                                    <p className="card-set">{listing.set}</p>
                                    <p className="card-condition">{listing.condition}</p>
                                    
                                    <div className="seller-info">
                                        <span className="seller-name"> {listing.seller}</span>
                                        <span className="seller-rating"> {listing.sellerRating}</span>
                                    </div>
                                    
                                    <div className="listing-footer">
                                        <div className="price-info">
                                            <span className="price">${listing.price.toLocaleString()}</span>
                                            <span className="shipping">{listing.shipping} shipping</span>
                                        </div>
                                        
                                        <button 
                                            className="add-to-cart-btn"
                                            onClick={() => addToCart(listing)}
                                            disabled={!listing.inStock}
                                        >
                                            {listing.inStock ? ' Add to Cart' : ' Out of Stock'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'sell' && (
                <div className="sell-content">
                    <h2> Sell Your Cards</h2>
                    <div className="sell-form">
                        <div className="form-section">
                            <h3>Card Information</h3>
                            <input type="text" placeholder="Card name" className="form-input" />
                            <input type="text" placeholder="Set name" className="form-input" />
                            <select className="form-select">
                                <option>Select Condition</option>
                                <option>Mint</option>
                                <option>Near Mint</option>
                                <option>Light Play</option>
                                <option>Moderately Played</option>
                            </select>
                        </div>
                        
                        <div className="form-section">
                            <h3>Pricing</h3>
                            <input type="number" placeholder="Your price" className="form-input" />
                            <div className="market-price">
                                <span> Market Price: $125.00</span>
                                <span> Trending: +5.2%</span>
                            </div>
                        </div>
                        
                        <div className="form-section">
                            <h3>Photos</h3>
                            <div className="photo-upload">
                                <button className="upload-btn"> Upload Photos</button>
                                <p>High-quality photos increase sales by 89%</p>
                            </div>
                        </div>
                        
                        <button className="list-card-btn"> List Card for Sale</button>
                    </div>
                    
                    <div className="seller-benefits">
                        <h3> Why Sell on Brainstorm?</h3>
                        <div className="benefits-grid">
                            <div className="benefit">
                                <span className="benefit-icon"></span>
                                <h4>Lower Fees</h4>
                                <p>5% vs TCGPlayer's 12.9%</p>
                            </div>
                            <div className="benefit">
                                <span className="benefit-icon"></span>
                                <h4>Instant Payouts</h4>
                                <p>Get paid immediately</p>
                            </div>
                            <div className="benefit">
                                <span className="benefit-icon"></span>
                                <h4>Smart Pricing</h4>
                                <p>AI-powered market analysis</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'cart' && (
                <div className="cart-content">
                    <h2> Your Cart</h2>
                    {cart.length === 0 ? (
                        <div className="empty-cart">
                            <p>Your cart is empty</p>
                            <button onClick={() => setActiveTab('browse')}> Start Shopping</button>
                        </div>
                    ) : (
                        <div className="cart-items">
                            {cart.map(item => (
                                <div key={item.id} className="cart-item">
                                    <span className="item-icon">{item.image}</span>
                                    <div className="item-details">
                                        <h4>{item.name}</h4>
                                        <p>{item.set} - {item.condition}</p>
                                        <p>Seller: {item.seller}</p>
                                    </div>
                                    <div className="item-price">${item.price.toLocaleString()}</div>
                                    <button 
                                        className="remove-btn"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        
                                    </button>
                                </div>
                            ))}
                            
                            <div className="cart-summary">
                                <div className="total">
                                    <h3>Total: ${getCartTotal().toLocaleString()}</h3>
                                </div>
                                <div className="checkout-buttons">
                                    <button className="checkout-btn"> Checkout with Stripe</button>
                                    <button className="paypal-btn"> PayPal Express</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'orders' && (
                <div className="orders-content">
                    <h2> Your Orders</h2>
                    <div className="orders-list">
                        <div className="order-item">
                            <div className="order-header">
                                <span className="order-id">Order #BRN-2024-001</span>
                                <span className="order-status delivered"> Delivered</span>
                            </div>
                            <div className="order-details">
                                <p>Black Lotus (Alpha) - $45,000</p>
                                <p>Delivered on June 10, 2025</p>
                            </div>
                        </div>
                        
                        <div className="order-item">
                            <div className="order-header">
                                <span className="order-id">Order #BRN-2024-002</span>
                                <span className="order-status shipping"> Shipping</span>
                            </div>
                            <div className="order-details">
                                <p>Charizard (Base Set) - $6,800</p>
                                <p>Expected delivery: June 16, 2025</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="tcgplayer-destruction">
                <h2> TCGPlayer Marketplace Status</h2>
                <div className="destruction-metrics">
                    <div className="metric threatened">
                        <span className="metric-label">Daily Volume Migration</span>
                        <span className="metric-value">$890K  Brainstorm</span>
                        <span className="metric-trend"> +67% this week</span>
                    </div>
                    <div className="metric threatened">
                        <span className="metric-label">Seller Adoption</span>
                        <span className="metric-value">15,678 sellers</span>
                        <span className="metric-trend"> +234% growth</span>
                    </div>
                    <div className="metric threatened">
                        <span className="metric-label">User Satisfaction</span>
                        <span className="metric-value">4.9/5 stars</span>
                        <span className="metric-trend"> vs 3.2/5 TCGPlayer</span>
                    </div>
                </div>
                
                <div className="competitive-advantages">
                    <h3> Advantages over TCGPlayer</h3>
                    <div className="advantages-grid">
                        <div className="advantage"> 5% fees vs 12.9%</div>
                        <div className="advantage"> Instant payouts vs 2-week hold</div>
                        <div className="advantage"> Integrated portfolio tracking</div>
                        <div className="advantage"> AI-powered pricing</div>
                        <div className="advantage"> Real-time market analytics</div>
                        <div className="advantage"> Social trading features</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Marketplace;
