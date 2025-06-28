import React, { useState, useEffect } from 'react';
import './CommunityPlatform.css';

const CommunityPlatform = () => {
    const [activeTab, setActiveTab] = useState('feed');
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState('');

    useEffect(() => {
        loadCommunityData();
    }, []);

    const loadCommunityData = () => {
        // Sample community data - replace with real API
        setPosts([
            {
                id: 1,
                user: 'ProTrader_Heath',
                avatar: '',
                time: '2 hours ago',
                content: 'Just pulled a Black Lotus from a vintage pack! ',
                image: null,
                likes: 247,
                comments: 89,
                shares: 34,
                tags: ['vintage', 'pulls', 'blacklotus']
            },
            {
                id: 2,
                user: 'DeckBuilder_Pro',
                avatar: '',
                time: '4 hours ago',
                content: 'New Atraxa deck tech is insane! Check out this mana curve optimization.',
                image: null,
                likes: 156,
                comments: 42,
                shares: 28,
                tags: ['edh', 'decktech', 'atraxa']
            },
            {
                id: 3,
                user: 'MarketAnalyst_AI',
                avatar: '',
                time: '6 hours ago',
                content: 'Pokemon TCG prices are surging! Charizard up 15% this week. Perfect time to buy more.',
                image: null,
                likes: 312,
                comments: 67,
                shares: 89,
                tags: ['pokemon', 'market', 'investing']
            },
            {
                id: 4,
                user: 'Tournament_Scout',
                avatar: '',
                time: '8 hours ago',
                content: 'Live from GP Vegas! Meta is shifting hard toward aggro. Burn decks everywhere!',
                image: null,
                likes: 98,
                comments: 23,
                shares: 15,
                tags: ['tournament', 'meta', 'modern']
            }
        ]);
    };

    const handlePost = () => {
        if (newPost.trim()) {
            const post = {
                id: posts.length + 1,
                user: 'Heath_Davis',
                avatar: '',
                time: 'Just now',
                content: newPost,
                image: null,
                likes: 0,
                comments: 0,
                shares: 0,
                tags: ['discussion']
            };
            setPosts([post, ...posts]);
            setNewPost('');
        }
    };

    const likePost = (postId) => {
        setPosts(posts.map(post => 
            post.id === postId 
                ? { ...post, likes: post.likes + 1 }
                : post
        ));
    };

    return (
        <div className="community-platform">
            <div className="community-header">
                <h1> Community Platform</h1>
                <p className="community-subtitle">Social Trading Hub - Reddit TCG Destroyer</p>
                <div className="destruction-badge">
                    <span className="competitor-killed"> REDDIT TCG: UNDER SIEGE</span>
                    <span className="progress">Progress: 62.5% Market Domination (5/8 sites)</span>
                </div>
            </div>

            <div className="community-nav">
                <button 
                    className={`nav-btn ${activeTab === 'feed' ? 'active' : ''}`}
                    onClick={() => setActiveTab('feed')}
                >
                     Feed
                </button>
                <button 
                    className={`nav-btn ${activeTab === 'trending' ? 'active' : ''}`}
                    onClick={() => setActiveTab('trending')}
                >
                     Trending
                </button>
                <button 
                    className={`nav-btn ${activeTab === 'groups' ? 'active' : ''}`}
                    onClick={() => setActiveTab('groups')}
                >
                     Groups
                </button>
                <button 
                    className={`nav-btn ${activeTab === 'live' ? 'active' : ''}`}
                    onClick={() => setActiveTab('live')}
                >
                     Live Events
                </button>
            </div>

            {activeTab === 'feed' && (
                <div className="community-content">
                    <div className="post-creator">
                        <div className="creator-header">
                            <span className="user-avatar"></span>
                            <div className="creator-info">
                                <span className="username">Heath Davis</span>
                                <span className="user-title">Platform Creator  $125K Portfolio</span>
                            </div>
                        </div>
                        <textarea
                            value={newPost}
                            onChange={(e) => setNewPost(e.target.value)}
                            placeholder="Share your latest pulls, trades, or market insights..."
                            className="post-input"
                        />
                        <div className="creator-actions">
                            <button className="action-btn"> Photo</button>
                            <button className="action-btn"> Chart</button>
                            <button className="action-btn"> Deck</button>
                            <button className="post-btn" onClick={handlePost}>Post</button>
                        </div>
                    </div>

                    <div className="posts-feed">
                        {posts.map(post => (
                            <div key={post.id} className="post-card">
                                <div className="post-header">
                                    <span className="post-avatar">{post.avatar}</span>
                                    <div className="post-info">
                                        <span className="post-username">{post.user}</span>
                                        <span className="post-time">{post.time}</span>
                                    </div>
                                </div>
                                <div className="post-content">
                                    {post.content}
                                </div>
                                {post.tags && (
                                    <div className="post-tags">
                                        {post.tags.map(tag => (
                                            <span key={tag} className="tag">#{tag}</span>
                                        ))}
                                    </div>
                                )}
                                <div className="post-actions">
                                    <button 
                                        className="action-btn like-btn"
                                        onClick={() => likePost(post.id)}
                                    >
                                         {post.likes}
                                    </button>
                                    <button className="action-btn"> {post.comments}</button>
                                    <button className="action-btn"> {post.shares}</button>
                                    <button className="action-btn"> Share</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'trending' && (
                <div className="trending-content">
                    <h2> Trending Topics</h2>
                    <div className="trending-list">
                        <div className="trending-item">
                            <span className="trend-rank">#1</span>
                            <div className="trend-info">
                                <span className="trend-topic">Black Lotus Market Surge</span>
                                <span className="trend-posts">2,847 posts</span>
                            </div>
                            <span className="trend-change">+145%</span>
                        </div>
                        <div className="trending-item">
                            <span className="trend-rank">#2</span>
                            <div className="trend-info">
                                <span className="trend-topic">Pokemon TCG Reprint</span>
                                <span className="trend-posts">1,923 posts</span>
                            </div>
                            <span className="trend-change">+89%</span>
                        </div>
                        <div className="trending-item">
                            <span className="trend-rank">#3</span>
                            <div className="trend-info">
                                <span className="trend-topic">GP Vegas Results</span>
                                <span className="trend-posts">1,567 posts</span>
                            </div>
                            <span className="trend-change">+67%</span>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'groups' && (
                <div className="groups-content">
                    <h2> Trading Groups</h2>
                    <div className="groups-grid">
                        <div className="group-card">
                            <div className="group-header">
                                <span className="group-icon"></span>
                                <h3>Black Lotus Investors</h3>
                            </div>
                            <p>Elite vintage investors. Min $50K portfolio.</p>
                            <div className="group-stats">
                                <span>1,247 members</span>
                                <button className="join-btn">Join</button>
                            </div>
                        </div>
                        <div className="group-card">
                            <div className="group-header">
                                <span className="group-icon"></span>
                                <h3>Pokemon TCG Masters</h3>
                            </div>
                            <p>Competitive Pokemon trading community.</p>
                            <div className="group-stats">
                                <span>8,932 members</span>
                                <button className="join-btn">Join</button>
                            </div>
                        </div>
                        <div className="group-card">
                            <div className="group-header">
                                <span className="group-icon"></span>
                                <h3>Tournament Grinders</h3>
                            </div>
                            <p>Competitive Magic players and traders.</p>
                            <div className="group-stats">
                                <span>5,678 members</span>
                                <button className="join-btn">Join</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'live' && (
                <div className="live-content">
                    <h2> Live Events</h2>
                    <div className="live-events">
                        <div className="live-event">
                            <div className="live-indicator"> LIVE</div>
                            <h3>GP Vegas - Round 8</h3>
                            <p>Modern tournament coverage</p>
                            <span className="viewers">2,341 watching</span>
                        </div>
                        <div className="live-event">
                            <div className="live-indicator"> LIVE</div>
                            <h3>Pack Opening Stream</h3>
                            <p>Vintage pack opening session</p>
                            <span className="viewers">892 watching</span>
                        </div>
                    </div>
                </div>
            )}

            <div className="community-stats">
                <h2> Community Impact</h2>
                <div className="stats-grid">
                    <div className="stat-card">
                        <h3>Active Users</h3>
                        <div className="stat-value">24,567</div>
                        <div className="stat-change">+12.3% today</div>
                    </div>
                    <div className="stat-card">
                        <h3>Daily Posts</h3>
                        <div className="stat-value">1,847</div>
                        <div className="stat-change">+8.9% today</div>
                    </div>
                    <div className="stat-card">
                        <h3>Trading Volume</h3>
                        <div className="stat-value">$2.3M</div>
                        <div className="stat-change">+15.7% today</div>
                    </div>
                </div>
            </div>

            <div className="reddit-destruction">
                <h2> Reddit TCG Subreddits Status</h2>
                <div className="reddit-list">
                    <div className="reddit-item threatened">
                        <span className="subreddit">/r/magicTCG</span>
                        <span className="status"> UNDER SIEGE</span>
                        <span className="users">2.1M  Migrating to Brainstorm</span>
                    </div>
                    <div className="reddit-item threatened">
                        <span className="subreddit">/r/PokemonTCG</span>
                        <span className="status"> UNDER SIEGE</span>
                        <span className="users">1.8M  Superior features here</span>
                    </div>
                    <div className="reddit-item threatened">
                        <span className="subreddit">/r/EDH</span>
                        <span className="status"> UNDER SIEGE</span>
                        <span className="users">900K  AI deck builder wins</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommunityPlatform;
