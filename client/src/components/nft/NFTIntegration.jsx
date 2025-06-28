import React, { useState, useEffect } from 'react';

const NFTIntegration = ({ cardId }) => {
  const [nftData, setNftData] = useState(null);
  const [blockchain, setBlockchain] = useState('ethereum');
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    // Simulate NFT data
    const mockNFTData = {
      tokenId: CARD__NFT,
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
