import React, { useState, useEffect } from 'react';

const NewsFeed = () => {
  const [news, setNews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNews();
  }, [selectedCategory]);

  const loadNews = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/news?category=${selectedCategory}`);
      const data = await response.json();
      setNews(data.articles || []);
    } catch (error) {
      console.error('Error loading news:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { key: 'all', label: ' All News', color: '#CCCCFF' },
    { key: 'mtg', label: ' Magic', color: '#9999FF' },
    { key: 'pokemon', label: ' Pokemon', color: '#FFD700' },
    { key: 'yugioh', label: ' Yu-Gi-Oh', color: '#9933FF' },
    { key: 'sports', label: ' Sports', color: '#00BFFF' }
  ];

  const getImpactColor = (impact) => {
    switch(impact) {
      case 'very-high': return '#FF6666';
      case 'high': return '#FFD700';
      case 'medium': return '#9999FF';
      default: return '#66FF66';
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ 
        color: '#CCCCFF', 
        marginBottom: '24px',
        fontSize: '2rem',
        background: 'linear-gradient(45deg, #CCCCFF, #9999FF)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
         Trading Card News
      </h2>
      
      {/* Category Filters */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
        {categories.map(category => (
          <button
            key={category.key}
            onClick={() => setSelectedCategory(category.key)}
            style={{
              background: selectedCategory === category.key 
                ? `linear-gradient(45deg, ${category.color}, ${category.color}80)`
                : 'transparent',
              color: selectedCategory === category.key ? '#000000' : category.color,
              border: `1px solid ${category.color}`,
              padding: '8px 16px',
              borderRadius: '20px',
              cursor: 'pointer',
              fontWeight: selectedCategory === category.key ? 'bold' : 'normal',
              fontSize: '0.9rem'
            }}
          >
            {category.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', color: '#CCCCFF', padding: '40px' }}>
          Loading news...
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '20px' }}>
          {news.map(article => (
            <div key={article.id} style={{
              background: 'linear-gradient(135deg, #1a1a1a, #2d2d2d)',
              border: '1px solid rgba(204, 204, 255, 0.3)',
              borderRadius: '12px',
              padding: '20px',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 102, 255, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                <h3 style={{ color: '#FFFFFF', margin: '0', fontSize: '1.2rem', flex: 1 }}>
                  {article.title}
                </h3>
                
                <div style={{
                  background: getImpactColor(article.impact),
                  color: '#000000',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '0.7rem',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  marginLeft: '12px'
                }}>
                  {article.impact} IMPACT
                </div>
              </div>

              <p style={{ color: '#CCCCFF', margin: '0 0 12px 0', lineHeight: 1.5 }}>
                {article.summary}
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ color: '#9999FF', fontSize: '0.8rem' }}>{article.source}</span>
                  <span style={{ color: '#6666FF', fontSize: '0.8rem' }}>{article.timestamp}</span>
                </div>
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', gap: '6px', marginBottom: '12px', flexWrap: 'wrap' }}>
                {article.tags.map((tag, index) => (
                  <span key={index} style={{
                    background: 'rgba(102, 102, 255, 0.2)',
                    color: '#9999FF',
                    padding: '2px 8px',
                    borderRadius: '8px',
                    fontSize: '0.7rem'
                  }}>
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Price Impact */}
              {article.priceImpact && (
                <div style={{
                  background: 'rgba(0, 0, 0, 0.3)',
                  border: '1px solid rgba(102, 255, 102, 0.3)',
                  borderRadius: '6px',
                  padding: '8px 12px'
                }}>
                  <div style={{ color: '#66FF66', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '4px' }}>
                     Expected Price Impact:
                  </div>
                  {article.priceImpact.map((impact, index) => (
                    <div key={index} style={{ 
                      color: '#CCCCFF', 
                      fontSize: '0.75rem',
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}>
                      <span>{impact.card}</span>
                      <span style={{ 
                        color: impact.expectedChange.startsWith('+') ? '#66FF66' : '#FF6666',
                        fontWeight: 'bold'
                      }}>
                        {impact.expectedChange}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsFeed;
