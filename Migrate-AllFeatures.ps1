# Migrate-AllFeatures.ps1 - Migrate ALL previous features
param([switch]$IncludeAI, [switch]$IncludeIPO, [switch]$IncludeNFT, [switch]$IncludeSocial, [switch]$All)

if ($All) { $IncludeAI = $IncludeIPO = $IncludeNFT = $IncludeSocial = $true }

Write-Host " MIGRATING ALL CARDHOOD FEATURES" -ForegroundColor Magenta
Write-Host "=================================" -ForegroundColor Magenta

# Install all required dependencies
Write-Host "Installing complete dependency stack..." -ForegroundColor Yellow
npm install chart.js react-chartjs-2 web3 ethers axios socket.io-client
npm install @tensorflow/tfjs @tensorflow/tfjs-react lodash moment
npm install react-router-dom @mui/x-data-grid @mui/x-charts
npm install framer-motion react-spring @emotion/react @emotion/styled

# Create directory structure for all features
$dirs = @(
  "client/src/components/ai", "client/src/components/ipo", 
  "client/src/components/nft", "client/src/components/social",
  "client/src/components/trading", "client/src/components/portfolio",
  "client/src/components/charts", "client/src/hooks", "client/src/services",
  "server/ai", "server/ipo", "server/nft", "server/social", "server/blockchain"
)

foreach ($dir in $dirs) {
  if (!(Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force }
}

if ($IncludeAI) {
  Write-Host "Migrating AI/ML Features..." -ForegroundColor Cyan
  
  # AI Prediction Component
  @"
import React, { useState, useEffect } from 'react';

const AIPredictions = ({ cardId }) => {
  const [prediction, setPrediction] = useState(null);
  const [confidence, setConfidence] = useState(0);
  const [analysis, setAnalysis] = useState([]);

  useEffect(() => {
    // Simulate advanced AI prediction
    const runAIAnalysis = () => {
      const scenarios = [
        { outcome: 'bullish', probability: 0.65, factors: ['market demand', 'scarcity', 'meta relevance'] },
        { outcome: 'bearish', probability: 0.25, factors: ['oversupply', 'reprint risk'] },
        { outcome: 'neutral', probability: 0.10, factors: ['market stability'] }
      ];
      
      const prediction = scenarios[0];
      setPrediction(prediction);
      setConfidence(85 + Math.random() * 10);
      setAnalysis([
        'Technical analysis shows strong support levels',
        'Social sentiment trending positive (+15%)',
        'Tournament meta driving demand',
        'Limited supply creating upward pressure'
      ]);
    };

    runAIAnalysis();
  }, [cardId]);

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(102,102,255,0.1), rgba(204,204,255,0.05))',
      border: '1px solid #6666FF',
      borderRadius: '12px',
      padding: '20px',
      margin: '16px 0'
    }}>
      <h3 style={{ color: '#CCCCFF', margin: '0 0 16px 0' }}> AI Market Analysis</h3>
      
      {prediction && (
        <>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ color: '#66FF66', fontSize: '1.2rem', fontWeight: 'bold' }}>
              {prediction.outcome.toUpperCase()} OUTLOOK
            </div>
            <div style={{ color: '#CCCCFF' }}>
              Confidence: {confidence.toFixed(1)}%
            </div>
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <h4 style={{ color: '#9999FF', margin: '0 0 8px 0' }}>Key Factors:</h4>
            {prediction.factors.map((factor, i) => (
              <div key={i} style={{ color: '#FFFFFF', marginBottom: '4px' }}>
                 {factor}
              </div>
            ))}
          </div>
          
          <div>
            <h4 style={{ color: '#9999FF', margin: '0 0 8px 0' }}>AI Analysis:</h4>
            {analysis.map((item, i) => (
              <div key={i} style={{ color: '#CCCCFF', marginBottom: '4px', fontSize: '0.9rem' }}>
                 {item}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AIPredictions;
"@ | Out-File -FilePath "client/src/components/ai/AIPredictions.jsx" -Encoding UTF8
}

if ($IncludeIPO) {
  Write-Host "Migrating IPO/Launch System..." -ForegroundColor Cyan
  
  # IPO Launch Tracker
  @"
import React, { useState, useEffect } from 'react';

const IPOLaunchTracker = () => {
  const [launches, setLaunches] = useState([]);
  const [preOrders, setPreOrders] = useState([]);

  useEffect(() => {
    const mockLaunches = [
      {
        id: 1,
        name: 'Murders at Karlov Manor',
        game: 'MTG',
        launchDate: '2025-02-09',
        preOrderPrice: 120,
        estimatedValue: 'High',
        allocationStatus: 'Available',
        keyCards: ['Deadly Cover-Up', 'Case File'],
        expectedROI: '25-40%',
        riskLevel: 'Medium'
      },
      {
        id: 2,
        name: 'Temporal Forces',
        game: 'Pokemon',
        launchDate: '2025-03-22',
        preOrderPrice: 150,
        estimatedValue: 'Medium-High',
        allocationStatus: 'Limited',
        keyCards: ['Iron Valiant ex', 'Roaring Moon ex'],
        expectedROI: '15-30%',
        riskLevel: 'Low'
      }
    ];
    
    setLaunches(mockLaunches);
  }, []);

  const handlePreOrder = (launchId) => {
    setPreOrders([...preOrders, launchId]);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: '#CCCCFF', marginBottom: '24px' }}> IPO Launch Calendar</h2>
      
      {launches.map(launch => (
        <div key={launch.id} style={{
          background: 'rgba(26, 26, 26, 0.8)',
          border: '1px solid rgba(204, 204, 255, 0.3)',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '16px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <div style={{ flex: 1 }}>
              <h3 style={{ color: '#FFFFFF', margin: '0 0 8px 0' }}>{launch.name}</h3>
              <div style={{ color: '#9999FF', marginBottom: '12px' }}>
                {launch.game}  {launch.launchDate}
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <div style={{ color: '#CCCCFF', fontSize: '0.9rem' }}>Pre-order Price</div>
                  <div style={{ color: '#66FF66', fontSize: '1.2rem', fontWeight: 'bold' }}>
                    ${launch.preOrderPrice}
                  </div>
                </div>
                <div>
                  <div style={{ color: '#CCCCFF', fontSize: '0.9rem' }}>Expected ROI</div>
                  <div style={{ color: '#FFD700', fontSize: '1.1rem', fontWeight: 'bold' }}>
                    {launch.expectedROI}
                  </div>
                </div>
              </div>
              
              <div style={{ marginBottom: '16px' }}>
                <div style={{ color: '#CCCCFF', fontSize: '0.9rem', marginBottom: '4px' }}>Key Cards:</div>
                <div style={{ color: '#FFFFFF' }}>
                  {launch.keyCards.join(', ')}
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                <span style={{
                  background: launch.allocationStatus === 'Available' ? '#66FF66' : '#FFD700',
                  color: '#000000',
                  padding: '4px 12px',
                  borderRadius: '16px',
                  fontSize: '0.8rem',
                  fontWeight: 'bold'
                }}>
                  {launch.allocationStatus}
                </span>
                <span style={{
                  background: launch.riskLevel === 'Low' ? '#66FF66' : 
                            launch.riskLevel === 'Medium' ? '#FFD700' : '#FF6666',
                  color: '#000000',
                  padding: '4px 12px',
                  borderRadius: '16px',
                  fontSize: '0.8rem',
                  fontWeight: 'bold'
                }}>
                  {launch.riskLevel} Risk
                </span>
              </div>
            </div>
            
            <button
              onClick={() => handlePreOrder(launch.id)}
              disabled={preOrders.includes(launch.id)}
              style={{
                background: preOrders.includes(launch.id) 
                  ? 'rgba(102, 255, 102, 0.3)' 
                  : 'linear-gradient(45deg, #CCCCFF, #9999FF)',
                color: preOrders.includes(launch.id) ? '#66FF66' : '#000000',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: preOrders.includes(launch.id) ? 'default' : 'pointer'
              }}
            >
              {preOrders.includes(launch.id) ? ' Pre-ordered' : 'Pre-order Now'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IPOLaunchTracker;
"@ | Out-File -FilePath "client/src/components/ipo/IPOLaunchTracker.jsx" -Encoding UTF8
}

if ($IncludeNFT) {
  Write-Host "Migrating NFT/Blockchain Features..." -ForegroundColor Cyan
  
  # NFT Integration Component
  @"
import React, { useState, useEffect } from 'react';

const NFTIntegration = ({ cardId }) => {
  const [nftData, setNftData] = useState(null);
  const [blockchain, setBlockchain] = useState('ethereum');
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    // Simulate NFT data
    const mockNFTData = {
      tokenId: `CARD_${cardId}_NFT`,
      blockchain: 'Ethereum',
      contract: '0x1234...abcd',
      verified: true,
      rarity: 'Legendary',
      traits: [
        { trait_type: 'Game', value: 'MTG' },
        { trait_type: 'Rarity', value: 'Mythic Rare' },
        { trait_type: 'Condition', value: 'Near Mint' },
        { trait_type: 'Authentication', value: 'PSA Verified' }
      ],
      lastSale: { price: 2.5, currency: 'ETH', date: '2024-01-15' },
      floorPrice: 1.8,
      volume24h: 12.4
    };
    
    setNftData(mockNFTData);
    setVerified(mockNFTData.verified);
  }, [cardId]);

  const handleMintNFT = () => {
    alert('NFT Minting interface would open here');
  };

  const handleTradeNFT = () => {
    alert('NFT Trading interface would open here');
  };

  if (!nftData) return null;

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(153,51,255,0.1), rgba(102,102,255,0.05))',
      border: '1px solid #9933FF',
      borderRadius: '12px',
      padding: '20px',
      margin: '16px 0'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
        <h3 style={{ color: '#9933FF', margin: '0', flex: 1 }}> NFT Information</h3>
        {verified && (
          <span style={{
            background: '#66FF66',
            color: '#000000',
            padding: '4px 12px',
            borderRadius: '16px',
            fontSize: '0.8rem',
            fontWeight: 'bold'
          }}>
             Verified
          </span>
        )}
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
        <div>
          <div style={{ color: '#CCCCFF', fontSize: '0.9rem' }}>Token ID</div>
          <div style={{ color: '#FFFFFF', fontFamily: 'monospace' }}>{nftData.tokenId}</div>
        </div>
        <div>
          <div style={{ color: '#CCCCFF', fontSize: '0.9rem' }}>Blockchain</div>
          <div style={{ color: '#FFFFFF' }}>{nftData.blockchain}</div>
        </div>
        <div>
          <div style={{ color: '#CCCCFF', fontSize: '0.9rem' }}>Floor Price</div>
          <div style={{ color: '#66FF66', fontWeight: 'bold' }}>{nftData.floorPrice} ETH</div>
        </div>
        <div>
          <div style={{ color: '#CCCCFF', fontSize: '0.9rem' }}>24h Volume</div>
          <div style={{ color: '#FFFFFF' }}>{nftData.volume24h} ETH</div>
        </div>
      </div>
      
      <div style={{ marginBottom: '16px' }}>
        <div style={{ color: '#CCCCFF', fontSize: '0.9rem', marginBottom: '8px' }}>Traits:</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {nftData.traits.map((trait, i) => (
            <span key={i} style={{
              background: 'rgba(153, 51, 255, 0.2)',
              color: '#CCCCFF',
              padding: '4px 8px',
              borderRadius: '8px',
              fontSize: '0.8rem'
            }}>
              {trait.trait_type}: {trait.value}
            </span>
          ))}
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: '12px' }}>
        <button
          onClick={handleMintNFT}
          style={{
            background: 'linear-gradient(45deg, #9933FF, #6666FF)',
            color: '#FFFFFF',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Mint NFT
        </button>
        <button
          onClick={handleTradeNFT}
          style={{
            background: 'transparent',
            color: '#9933FF',
            border: '1px solid #9933FF',
            padding: '10px 20px',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Trade on OpenSea
        </button>
      </div>
    </div>
  );
};

export default NFTIntegration;
"@ | Out-File -FilePath "client/src/components/nft/NFTIntegration.jsx" -Encoding UTF8
}

if ($IncludeSocial) {
  Write-Host "Migrating Social/Community Features..." -ForegroundColor Cyan
  
  # Social Feed Component
  @"
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
        content: 'Just picked up a NM Black Lotus for $42k. Market looking bullish! ',
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
"@ | Out-File -FilePath "client/src/components/social/SocialFeed.jsx" -Encoding UTF8
}

Write-Host " All features migrated successfully!" -ForegroundColor Green
Write-Host " Periwinkle theme applied to all components" -ForegroundColor Cyan
Write-Host " Ready to integrate into main app!" -ForegroundColor Magenta
