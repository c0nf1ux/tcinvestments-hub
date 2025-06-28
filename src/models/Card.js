const mongoose = require('mongoose');

// Universal card schema supporting all trading card types
const cardSchema = new mongoose.Schema({
    // Universal identifiers
    id: { type: String, required: true, unique: true },
    cardType: { 
        type: String, 
        required: true, 
        enum: ['mtg', 'pokemon', 'yugioh', 'baseball', 'football', 'basketball', 'hockey', 'soccer', 'other'],
        index: true 
    },
    
    // Basic card information
    name: { type: String, required: true, index: true },
    setName: { type: String, required: true, index: true },
    setCode: { type: String },
    cardNumber: { type: String },
    year: { type: Number, index: true },
    rarity: { type: String, index: true },
    condition: { 
        type: String, 
        enum: ['Mint', 'Near Mint', 'Excellent', 'Very Good', 'Good', 'Fair', 'Poor'],
        default: 'Near Mint'
    },
    language: { type: String, default: 'English' },
    
    // Pricing and market data
    pricing: {
        current: { type: Number, default: 0, index: true },
        low: { type: Number, default: 0 },
        high: { type: Number, default: 0 },
        average: { type: Number, default: 0 },
        market: { type: Number, default: 0 },
        lastUpdated: { type: Date, default: Date.now },
        sources: [{
            name: String,
            price: Number,
            url: String,
            lastChecked: Date
        }],
        priceHistory: [{
            price: Number,
            date: Date,
            source: String
        }]
    },
    
    // Investment analytics
    analytics: {
        priceChange24h: { type: Number, default: 0 },
        priceChange7d: { type: Number, default: 0 },
        priceChange30d: { type: Number, default: 0 },
        priceChange90d: { type: Number, default: 0 },
        priceChange1y: { type: Number, default: 0 },
        volatility: { type: Number, default: 0 },
        volume: { type: Number, default: 0 },
        marketCap: { type: Number, default: 0 },
        investmentGrade: { 
            type: String, 
            enum: ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F'],
            default: 'C'
        },
        trending: { type: Boolean, default: false },
        watchlistCount: { type: Number, default: 0 }
    },
    
    // MTG-specific data
    mtgData: {
        manaCost: String,
        cmc: Number,
        colors: [String],
        colorIdentity: [String],
        type: String,
        supertypes: [String],
        types: [String],
        subtypes: [String],
        power: String,
        toughness: String,
        loyalty: String,
        text: String,
        flavorText: String,
        artist: String,
        collectorNumber: String,
        scryfallId: String,
        multiverseId: Number,
        tcgplayerId: Number,
        layout: String,
        frame: String,
        foil: Boolean,
        nonfoil: Boolean,
        reserved: Boolean,
        reprint: Boolean,
        variation: Boolean,
        digital: Boolean,
        promo: Boolean
    },
    
    // Pokemon-specific data
    pokemonData: {
        types: [String],
        hp: Number,
        attacks: [{
            name: String,
            cost: [String],
            damage: String,
            text: String
        }],
        weakness: {
            type: String,
            value: String
        },
        resistance: {
            type: String,
            value: String
        },
        retreatCost: [String],
        pokemonNumber: Number,
        stage: String,
        evolvesFrom: String,
        evolvesTo: [String],
        artist: String,
        holo: Boolean,
        reverse: Boolean,
        firstEdition: Boolean,
        shadowless: Boolean,
        unlimited: Boolean,
        promo: Boolean,
        pokemonTcgId: String
    },
    
    // Yu-Gi-Oh-specific data
    yugiohData: {
        type: String,
        attribute: String,
        level: Number,
        rank: Number,
        attack: Number,
        defense: Number,
        cardText: String,
        pendulumText: String,
        archetype: String,
        race: String,
        linkRating: Number,
        linkMarkers: [String],
        pendulumScale: Number,
        tcgplayerId: Number,
        konamiId: Number,
        password: Number,
        banlist: {
            tcg: String,
            ocg: String,
            goat: String
        }
    },
    
    // Sports card data (Baseball, Football, Basketball, etc.)
    sportsData: {
        sport: String,
        player: String,
        team: String,
        position: String,
        league: String,
        season: String,
        rookie: Boolean,
        autograph: Boolean,
        memorabilia: Boolean,
        patch: Boolean,
        serial: {
            numbered: Boolean,
            total: Number,
            current: Number
        },
        manufacturer: String,
        parallel: String,
        insert: Boolean,
        base: Boolean,
        graded: {
            company: String,
            grade: Number,
            population: Number
        }
    },
    
    // Collection tracking
    collection: {
        owned: { type: Number, default: 0 },
        wanted: { type: Number, default: 0 },
        averageCost: { type: Number, default: 0 },
        totalCost: { type: Number, default: 0 },
        totalValue: { type: Number, default: 0 },
        lots: [{
            quantity: Number,
            costBasis: Number,
            acquisitionDate: Date,
            source: String,
            condition: String,
            notes: String
        }],
        location: String,
        notes: String,
        tags: [String],
        wishlist: Boolean,
        forTrade: Boolean,
        forSale: Boolean
    },
    
    // Metadata
    images: {
        small: String,
        normal: String,
        large: String,
        art_crop: String,
        border_crop: String
    },
    
    // Search and categorization
    searchText: String,
    tags: [String],
    categories: [String],
    
    // Timestamps
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Indexes for performance
cardSchema.index({ name: 'text', searchText: 'text' });
cardSchema.index({ cardType: 1, year: -1 });
cardSchema.index({ 'pricing.current': -1 });
cardSchema.index({ 'analytics.priceChange30d': -1 });
cardSchema.index({ 'collection.owned': 1 });
cardSchema.index({ setName: 1, cardNumber: 1 });

// Virtual for total portfolio value
cardSchema.virtual('portfolioValue').get(function() {
    return this.collection.owned * this.pricing.current;
});

// Pre-save middleware
cardSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    this.searchText = `${this.name} ${this.setName} ${this.cardType}`.toLowerCase();
    next();
});

// Static methods
cardSchema.statics.getPortfolioSummary = async function(cardType = null) {
    const match = cardType ? { cardType } : {};
    return this.aggregate([
        { $match: match },
        {
            $group: {
                _id: '$cardType',
                totalCards: { $sum: '$collection.owned' },
                totalValue: { $sum: '$collection.totalValue' },
                totalCost: { $sum: '$collection.totalCost' },
                avgPrice: { $avg: '$pricing.current' },
                topCard: { $max: '$pricing.current' }
            }
        }
    ]);
};

cardSchema.statics.getTrendingCards = async function(limit = 10) {
    return this.find({ 'analytics.trending': true })
        .sort({ 'analytics.priceChange24h': -1 })
        .limit(limit)
        .select('name cardType pricing.current analytics.priceChange24h');
};

module.exports = mongoose.model('Card', cardSchema);
