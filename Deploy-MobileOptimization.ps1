#  CARDHOOD MOBILE OPTIMIZATION
Write-Host " Deploying mobile-first design..." -ForegroundColor Cyan

Set-Location "C:\CardHood\frontend\src"

# Update App.css with mobile-first design
@"
/* CardHood Mobile-First - Robinhood Style */
:root {
  --primary: #6366f1;
  --secondary: #8b5cf6;
  --dark-bg: #0f0f23;
  --card-bg: #1a1a2e;
  --text-primary: #ffffff;
  --text-secondary: #a1a1aa;
  --success: #10b981;
  --danger: #ef4444;
  --border: #374151;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: var(--dark-bg);
  color: var(--text-primary);
  line-height: 1.5;
  overflow-x: hidden;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Mobile Header */
.header {
  background: var(--card-bg);
  border-bottom: 1px solid var(--border);
  padding: 1rem;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Mobile Navigation */
.nav-container {
  background: var(--card-bg);
  border-top: 1px solid var(--border);
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 0.5rem 0;
}

.nav-tabs {
  display: flex;
  justify-content: space-around;
}

.nav-tab {
  flex: 1;
  padding: 0.75rem;
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  transition: color 0.3s;
}

.nav-tab.active {
  color: var(--primary);
}

/* Content */
.content {
  flex: 1;
  padding: 1rem;
  padding-bottom: 6rem;
  overflow-y: auto;
}

/* Portfolio */
.portfolio-header {
  text-align: center;
  margin-bottom: 2rem;
}

.portfolio-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--success);
  margin-bottom: 0.5rem;
}

.portfolio-change {
  color: var(--success);
}

.portfolio-chart {
  background: var(--card-bg);
  border-radius: 12px;
  padding: 1rem;
  margin: 1rem 0;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Cards */
.holdings-grid,
.cards-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
}

.holding-card,
.card-item {
  background: var(--card-bg);
  border-radius: 12px;
  padding: 1rem;
  border: 1px solid var(--border);
  transition: all 0.2s;
}

.holding-card:hover,
.card-item:hover {
  transform: translateY(-2px);
}

/* Search */
.search-container {
  margin-bottom: 2rem;
}

.search-input {
  width: 100%;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1rem;
  color: var(--text-primary);
  font-size: 1rem;
}

.search-input:focus {
  outline: none;
  border-color: var(--primary);
}

.filters {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.5rem;
  margin: 1rem 0;
}

.filter-select {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 0.75rem;
  color: var(--text-primary);
}

/* Responsive */
@media (min-width: 768px) {
  .content {
    padding: 2rem;
    padding-bottom: 2rem;
  }
  
  .nav-container {
    position: static;
    border-top: none;
    border-bottom: 1px solid var(--border);
  }
  
  .nav-tab {
    flex-direction: row;
    gap: 0.5rem;
    padding: 1rem;
  }
  
  .holdings-grid,
  .cards-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}

@media (min-width: 1024px) {
  .content {
    max-width: 1200px;
    margin: 0 auto;
  }
}
"@ | Out-File -FilePath "App.css" -Encoding UTF8

Write-Host " Mobile-first CSS deployed!" -ForegroundColor Green
