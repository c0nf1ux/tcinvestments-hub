import React, { useState, useEffect } from 'react';

const SocialFeed = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  useEffect(() => {
    const mockPosts = [
      {
        id: 1,
        user: 'MTGWhale',
        avatar: '',
        timestamp: '2h ago',
        content: 'Just picked up a NM Black Lotus for . Market looking bullish! ',
        likes: 24,
        comments: 8,
        cardMention: 'Black Lotus'
      },
      {
        id: 2,
        user: 'PokemonMaster',
        avatar: '',
        timestamp: '4h ago',
        content: 'Charizard prices dipping - good entry point or falling knife? ',
        likes: 15,
        comments: 12,
        cardMention: 'Charizard'
      },
      {
        id: 3,
        user: 'CardAnalyst',
        avatar: '',
        timestamp: '6h ago',
        content: 'AI model predicting 25% increase in Vintage MTG over next quarter. Thoughts?',
        likes: 31,
        comments: 18
      }
    ];
    
    setPosts(mockPosts);
  }, []);

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  const handlePost = () => {
    if (!newPost.trim()) return;
    
    const post = {
      id: Date.now(),
      user: 'You',
      avatar: '',
      timestamp: 'now',
      content: newPost,
      likes: 0,
      comments: 0
    };
    
    setPosts([post, ...posts]);
    setNewPost('');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: '#CCCCFF', marginBottom: '24px' }}> Community Feed</h2>
      
      {/* New Post */}
      <div style={{
        background: 'rgba(26, 26, 26, 0.8)',
        border: '1px solid rgba(204, 204, 255, 0.3)',
        borderRadius: '12px',
        padding: '16px',
        marginBottom: '20px'
      }}>
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Share your trading insights..."
          style={{
            width: '100%',
            background: 'transparent',
            color: '#FFFFFF',
            border: '1px solid rgba(204, 204, 255, 0.2)',
            borderRadius: '8px',
            padding: '12px',
            minHeight: '80px',
            resize: 'vertical',
            fontFamily: 'inherit'
          }}
        />
        <button
          onClick={handlePost}
          style={{
            background: 'linear-gradient(45deg, #CCCCFF, #9999FF)',
            color: '#000000',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginTop: '12px'
          }}
        >
          Post
        </button>
      </div>
      
      {/* Posts Feed */}
      {posts.map(post => (
        <div key={post.id} style={{
          background: 'rgba(26, 26, 26, 0.8)',
          border: '1px solid rgba(204, 204, 255, 0.3)',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '1.5rem', marginRight: '12px' }}>{post.avatar}</span>
            <div style={{ flex: 1 }}>
              <div style={{ color: '#CCCCFF', fontWeight: 'bold' }}>{post.user}</div>
              <div style={{ color: '#9999FF', fontSize: '0.9rem' }}>{post.timestamp}</div>
            </div>
            {post.cardMention && (
              <span style={{
                background: 'rgba(102, 102, 255, 0.2)',
                color: '#6666FF',
                padding: '4px 8px',
                borderRadius: '8px',
                fontSize: '0.8rem'
              }}>
                #{post.cardMention}
              </span>
            )}
          </div>
          
          <div style={{ color: '#FFFFFF', marginBottom: '12px', lineHeight: 1.5 }}>
            {post.content}
          </div>
          
          <div style={{ display: 'flex', gap: '16px' }}>
            <button
              onClick={() => handleLike(post.id)}
              style={{
                background: 'transparent',
                color: '#9999FF',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
               {post.likes}
            </button>
            <button
              style={{
                background: 'transparent',
                color: '#9999FF',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
               {post.comments}
            </button>
            <button
              style={{
                background: 'transparent',
                color: '#9999FF',
                border: 'none',
                cursor: 'pointer'
              }}
            >
               Share
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SocialFeed;
