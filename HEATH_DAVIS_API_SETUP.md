# BRAINSTORM API KEYS SETUP GUIDE - HEATH DAVIS
## Personal Account: heath.hopefloats@gmail.com

### IMMEDIATE SETUP (Total: ~30 minutes)

## 1. Pokemon TCG API  (5 minutes - INSTANT)
**URL:** https://dev.pokemontcg.io/
**Steps:**
1. Click "Request API Key"
2. Fill form:
   - Name: Heath Davis
   - Email: heath.hopefloats@gmail.com
   - Organization: Personal Developer
   - Website: https://github.com/heathdavis
   - Description: Personal Pokemon TCG collection tracking and portfolio analytics
3. Submit form
4. Copy API key immediately
5. Paste into: C:\Brainstorm\backend\.env
   POKEMON_TCG_API_KEY=your_key_here

**Result:** 20,000 requests/day, instant activation

## 2. Stripe Account  (15 minutes - REVENUE READY)
**URL:** https://dashboard.stripe.com/register
**Steps:**
1. Sign up with:
   - Email: heath.hopefloats@gmail.com
   - Password: Monticello70!
   - Full Name: Heath Davis
2. Account type: Individual
3. Business info:
   - Business name: Heath Davis
   - Product: Brainstorm TCG Investment Platform
   - Industry: Software/Technology
4. Complete verification
5. Get live API keys
6. Update: C:\Brainstorm\backend\.env
   STRIPE_SECRET_KEY=sk_live_your_key
   STRIPE_PUBLISHABLE_KEY=pk_live_your_key

**Result:** /file revenue immediately active

## 3. MongoDB Atlas  (10 minutes - PRODUCTION DB)
**URL:** https://www.mongodb.com/cloud/atlas/register
**Steps:**
1. Register:
   - Email: heath.hopefloats@gmail.com
   - Password: Monticello70!
   - Name: Heath Davis
2. Create M0 cluster (free)
3. Region: AWS us-east-1
4. Cluster: brainstorm-production
5. Create database user: heath / Monticello70!
6. Get connection string
7. Update: C:\Brainstorm\backend\.env
   MONGODB_URI=mongodb+srv://heath:Monticello70!@brainstorm-production.xxx.mongodb.net/brainstorm

**Result:** Production-grade database, unlimited scaling

## 4. Google Vision API  (15 minutes - CARD SCANNING)
**URL:** https://console.cloud.google.com/
**Steps:**
1. Sign in: heath.hopefloats@gmail.com
2. Create project: brainstorm-card-scanner
3. Enable Vision API
4. Create service account
5. Download JSON credentials
6. Save to: C:\Brainstorm\backend\google-vision-key.json
7. Update: C:\Brainstorm\backend\.env
   GOOGLE_APPLICATION_CREDENTIALS=./google-vision-key.json

**Result:** AI card scanning, 1000 free/month

## SETUP PRIORITY:
1. Pokemon API (5 min) - Instant data improvement
2. Stripe (15 min) - Immediate revenue
3. MongoDB (10 min) - Production deployment ready
4. Google Vision (15 min) - Advanced features

## TOTAL IMPACT:
 Real-time Pokemon TCG data
 /file revenue active
 Production database
 AI card scanning
 Platform ready for 1000s of users
