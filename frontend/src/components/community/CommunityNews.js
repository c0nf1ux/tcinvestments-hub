/* eslint-disable unicode-bom */
import React, { useState, useEffect } from 'react';
import './CommunityNews.css';

const CommunityNews = () => {
 const [activeFilter, setActiveFilter] = useState('all');
 const [selectedTCG, setSelectedTCG] = useState('all');
 const [posts, setPosts] = useState([]);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
   // Multi-TCG community data
   const mockPosts = [
     {
       id: 1,
       type: 'analysis',
       title: 'Deep Dive: Why Pokemon 25th Anniversary Cards Are Undervalued',
       author: 'PokemonInvestor',
       timestamp: '1 hour ago',
       content: 'Comprehensive analysis of Pokemon 25th anniversary cards showing 60% upside potential compared to other milestone sets...',
       likes: 245,
       comments: 67,
       tags: ['Analysis', 'Pokemon', 'Anniversary', 'Investment'],
       bullish: true,
       tcg: 'Pokemon'
     },
     {
       id: 2,
       type: 'discussion',
       title: 'NFL Draft Impact: Which Rookie Cards to Target',
       author: 'SportsCardPro',
       timestamp: '2 hours ago',
       content: 'Breaking down the 2024 NFL draft class and identifying the top rookie card investment opportunities for the next season...',
       likes: 156,
       comments: 89,
       tags: ['Discussion', 'Sports', 'NFL', 'Rookies'],
       bullish: true,
       tcg: 'Sports'
     },
     {
       id: 3,
       type: 'alert',
       title: ' SPIKE ALERT: MTG Modern Horizons 3 Spoilers Drop Prices',
       author: 'MTGMarketBot',
       timestamp: '3 hours ago',
       content: 'Several Modern staples seeing 15-30% price drops as new spoilers reveal powerful reprints and alternatives...',
       likes: 423,
       comments: 134,
       tags: ['Alert', 'MTG', 'Modern', 'Spoilers'],
       bullish: false,
       tcg: 'MTG'
     },
     {
       id: 4,
       type: 'prediction',
       title: 'Yu-Gi-Oh Format Prediction: Tear 0 Meta Incoming',
       author: 'DuelMaster',
       timestamp: '4 hours ago',
       content: 'Analysis suggests Tearlaments will dominate the next format, driving up prices for specific tech cards and counters...',
       likes: 198,
       comments: 76,
       tags: ['Prediction', 'Yu-Gi-Oh', 'Meta', 'Competitive'],
       bullish: true,
       tcg: 'Yu-Gi-Oh'
     },
     {
       id: 5,
       type: 'analysis',
       title: 'Cross-TCG Portfolio Diversification Strategy',
       author: 'TCGAnalyst',
       timestamp: '6 hours ago',
       content: 'How spreading investments across MTG, Pokemon, Sports, and Yu-Gi-Oh can reduce risk while maintaining growth potential...',
       likes: 334,
       comments: 92,
       tags: ['Analysis', 'Portfolio', 'Diversification', 'Strategy'],
       bullish: true,
       tcg: 'All'
     },
     {
       id: 6,
       type: 'discussion',
       title: 'PSA vs BGS: Which Grading Service for Sports Cards?',
       author: 'GradingGuru',
       timestamp: '8 hours ago',
       content: 'Detailed comparison of PSA and BGS grading services for sports cards, including market perception and resale values...',
       likes: 267,
       comments: 156,
       tags: ['Discussion', 'Sports', 'Grading', 'PSA', 'BGS'],
       bullish: null,
       tcg: 'Sports'
     }
   ];

   setTimeout(() => {
     setPosts(mockPosts);
     setLoading(false);
   }, 800);
 }, []);

 const getPostIcon = (type) => {
   switch(type) {
     case 'analysis': return '';
     case 'discussion': return '';
     case 'alert': return '';
     case 'prediction': return '';
     case 'warning': return '';
     default: return '';
   }
 };

 const getPostTypeColor = (type) => {
   switch(type) {
     case 'analysis': return 'var(--periwinkle-primary)';
     case 'discussion': return 'var(--periwinkle-secondary)';
     case 'alert': return 'var(--warning-orange)';
     case 'prediction': return 'var(--accent-gold)';
     case 'warning': return 'var(--warning-orange)';
     default: return 'var(--periwinkle-light)';
   }
 };

 const getTCGColor = (tcg) => {
   switch(tcg) {
     case 'MTG': return 'var(--periwinkle-primary)';
     case 'Pokemon': return '#FFD700';
     case 'Sports': return '#FF6B35';
     case 'Yu-Gi-Oh': return '#9D4EDD';
     case 'All': return 'var(--accent-gold)';
     default: return 'var(--periwinkle-secondary)';
   }
 };

 let filteredPosts = posts;
 
 if (activeFilter !== 'all') {
   filteredPosts = filteredPosts.filter(post => post.type === activeFilter);
 }
 
 if (selectedTCG !== 'all') {
   filteredPosts = filteredPosts.filter(post => post.tcg === selectedTCG || post.tcg === 'All');
 }

 if (loading) {
   return (
     <div className="community-news">
       <div className="loading-community">Loading multi-TCG community discussions...</div>
     </div>
   );
 }

 return (
   <div className="community-news">
     <div className="community-header">
       <h3>Multi-TCG Community & Expert Analysis</h3>
       
       <div className="filter-controls">
         <div className="tcg-filters">
           <label>TCG:</label>
           {['all', 'MTG', 'Pokemon', 'Sports', 'Yu-Gi-Oh'].map(tcg => (
             <button
               key={tcg}
               className={`tcg-filter-btn ${selectedTCG === tcg ? 'active' : ''}`}
               onClick={() => setSelectedTCG(tcg)}
               style={{ borderColor: tcg !== 'all' ? getTCGColor(tcg) : 'var(--periwinkle-dark)' }}
             >
               {tcg}
             </button>
           ))}
         </div>
         
         <div className="post-filters">
           <label>Type:</label>
           {['all', 'analysis', 'discussion', 'alert', 'prediction'].map(filter => (
             <button
               key={filter}
               className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
               onClick={() => setActiveFilter(filter)}
             >
               {filter.charAt(0).toUpperCase() + filter.slice(1)}
             </button>
           ))}
         </div>
       </div>
     </div>
     
     <div className="posts-feed">
       {filteredPosts.map(post => (
         <div key={post.id} className="post-item">
           <div className="post-header">
             <div className="post-type" style={{ color: getPostTypeColor(post.type) }}>
               <span className="post-icon">{getPostIcon(post.type)}</span>
               <span className="post-category">{post.type.toUpperCase()}</span>
             </div>
             <div className="post-tcg">
               <span className="tcg-badge" style={{ backgroundColor: getTCGColor(post.tcg) }}>
                 {post.tcg}
               </span>
             </div>
             <div className="post-meta">
               <span className="post-author">by {post.author}</span>
               <span className="post-time">{post.timestamp}</span>
             </div>
           </div>
           
           <div className="post-content">
             <h4 className="post-title">{post.title}</h4>
             <p className="post-excerpt">{post.content}</p>
             
             <div className="post-tags">
               {post.tags.map(tag => (
                 <span key={tag} className="post-tag">{tag}</span>
               ))}
             </div>
           </div>
           
           <div className="post-footer">
             <div className="post-engagement">
               <button className="engagement-btn"> {post.likes}</button>
               <button className="engagement-btn"> {post.comments}</button>
               <button className="engagement-btn"> Share</button>
             </div>
             
             {post.bullish !== null && (
               <div className={`sentiment-indicator ${post.bullish ? 'bullish' : 'bearish'}`}>
                 {post.bullish ? ' Bullish' : ' Bearish'}
               </div>
             )}
           </div>
         </div>
       ))}
     </div>
     
     <div className="community-actions">
       <button className="new-post-btn">+ New Post</button>
       <button className="expert-analysis-btn"> AI Analysis</button>
       <button className="cross-tcg-btn"> Cross-TCG Insights</button>
     </div>
   </div>
 );
};

export default CommunityNews;
