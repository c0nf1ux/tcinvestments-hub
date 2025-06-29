# Brainstorm TCG - AI-Powered Trading Card Platform

##  Beta Launch Ready - All 7 Core APIs Operational

A comprehensive TCG platform with AI-powered price predictions, portfolio tracking, and deck building across Magic: The Gathering, Pokemon, Yu-Gi-Oh, and Sports Cards.

##  Current Status
-  **7/7 Core APIs Active**
-  **Real-time card search** (63+ Magic cards, Pokemon, Yu-Gi-Oh)
-  **Portfolio tracking** (+ value tracking)
-  **Tournament data** (4 upcoming events)
-  **News feed** (5 articles)
-  **AI Deck Builder** (Magic, Pokemon)
-  **MongoDB Atlas** connected
-  **Beta launch ready**

##  Tech Stack
- **Backend**: Node.js, Express.js, MongoDB Atlas
- **APIs**: Scryfall (Magic), Pokemon TCG API, YGOPRODeck
- **Frontend**: HTML5, Vanilla JS, CSS3
- **Deployment**: Vercel (frontend), MongoDB Atlas (database)

##  Project Structure
C:\Brainstorm\
 server/
    server.js (7 endpoints, all working)
    package.json
    .env (MongoDB connection)
 pure-html/
    index.html (main platform)
    search.html (card search)
    tournaments.html (tournament data)
    trading-dashboard.html (portfolio)
    deck-builder.html (AI deck building)
 README.md

##  Development Setup
# Backend
cd server
npm install
npm start

# Frontend  
cd pure-html
python -m http.server 8080

##  API Endpoints
- GET /api/search?query=lightning&tcg=magic - Card search
- GET /api/portfolio/summary - Portfolio data
- GET /api/tournaments - Tournament events
- GET /api/news - News feed
- POST /api/deck-builder/suggest - AI deck building
- GET /api/database/status - System health
- GET /health - Server health check

##  Beta Launch Goals
- **Target**: 50 beta users from TCG communities
- **Communities**: r/mtgfinance, r/PokemonTCG, r/yugioh
- **Timeline**: 7 days to beta launch
- **Revenue target**:  MRR within 30 days

##  Collaboration Guidelines
- **No backup files** - Git handles version control
- **Work in separate branches** for features
- **Pull requests** for all changes to main
- **Test locally** before pushing
- **Document API changes** in this README

##  Deployment
- **Frontend**: Deployed via Vercel
- **Backend**: MongoDB Atlas cloud database
- **Domain**: tcinvestments.net (pending SSL)

Last Updated: 2025-06-28 18:58 PST
Status: All systems operational, beta launch ready
