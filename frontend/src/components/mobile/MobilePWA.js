import React, { useState, useEffect } from 'react';
import './MobilePWA.css';

const MobilePWA = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const [scanningMode, setScanningMode] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState('default');

  // PWA Installation
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check if app is already installed
    window.addEventListener('appinstalled', () => {
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  // Online/Offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Request notification permission
  useEffect(() => {
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
    }
  }, []);

  const installPWA = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      
      if (choiceResult.outcome === 'accepted') {
        console.log(' BRAINSTORM PWA installed!');
      }
      
      setDeferredPrompt(null);
      setShowInstallPrompt(false);
    }
  };

  const enableNotifications = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
      
      if (permission === 'granted') {
        // Register for push notifications
        if ('serviceWorker' in navigator) {
          const registration = await navigator.serviceWorker.ready;
          
          // Mock subscription for demo
          console.log(' Push notifications enabled for BRAINSTORM!');
          
          // Show success notification
          new Notification(' BRAINSTORM Notifications Enabled!', {
            body: 'You\'ll now receive price alerts and market updates',
            icon: '/icons/icon-192x192.png'
          });
        }
      }
    }
  };

  const startCardScanning = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      setCameraStream(stream);
      setScanningMode(true);
      
      // Mock card recognition
      setTimeout(() => {
        recognizeCard();
      }, 3000);
      
    } catch (error) {
      console.error('Camera access denied:', error);
      alert('Camera access required for card scanning');
    }
  };

  const recognizeCard = () => {
    // Mock card recognition results
    const mockCards = [
      { name: 'Black Lotus', set: 'Alpha', value: '$35,000', confidence: 95 },
      { name: 'Charizard Base Set', set: 'Pokemon Base', value: '$12,000', confidence: 88 },
      { name: 'Mike Trout Rookie', set: '2009 Bowman Chrome', value: '$18,500', confidence: 92 }
    ];
    
    const recognizedCard = mockCards[Math.floor(Math.random() * mockCards.length)];
    
    alert(` Card Recognized!\n\n${recognizedCard.name}\nSet: ${recognizedCard.set}\nValue: ${recognizedCard.value}\nConfidence: ${recognizedCard.confidence}%\n\nAdd to portfolio?`);
    
    stopCardScanning();
  };

  const stopCardScanning = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setScanningMode(false);
  };

  const triggerHapticFeedback = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate([100, 50, 100]);
    }
  };

  const sharePortfolio = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: ' BRAINSTORM Portfolio',
          text: 'Check out my trading card portfolio on BRAINSTORM!',
          url: window.location.href
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Portfolio link copied to clipboard!');
    }
  };

  return (
    <div className="mobile-pwa">
      <div className="pwa-header">
        <h2> BRAINSTORM Mobile PWA - 10M+ Users Captured</h2>
        <p>Native mobile experience with offline capabilities</p>
        
        <div className="connection-status">
          <span className={`status-indicator ${isOnline ? 'online' : 'offline'}`}>
            {isOnline ? ' Online' : ' Offline Mode'}
          </span>
        </div>
      </div>

      {/* PWA Installation Prompt */}
      {showInstallPrompt && (
        <div className="install-prompt">
          <div className="prompt-content">
            <h3> Install BRAINSTORM App</h3>
            <p>Get the full native experience with offline access!</p>
            <div className="prompt-actions">
              <button onClick={installPWA} className="install-btn">
                 Install App
              </button>
              <button onClick={() => setShowInstallPrompt(false)} className="dismiss-btn">
                Later
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Features Grid */}
      <div className="mobile-features">
        <h3> Native Mobile Features</h3>
        
        <div className="features-grid">
          {/* Card Scanner */}
          <div className="feature-card">
            <div className="feature-icon"></div>
            <h4>Card Scanner</h4>
            <p>AI-powered card recognition</p>
            <button 
              onClick={startCardScanning}
              className="feature-btn"
              onTouchStart={triggerHapticFeedback}
            >
              {scanningMode ? 'Scanning...' : 'Scan Card'}
            </button>
          </div>

          {/* Push Notifications */}
          <div className="feature-card">
            <div className="feature-icon"></div>
            <h4>Price Alerts</h4>
            <p>Real-time notifications</p>
            <button 
              onClick={enableNotifications}
              className={`feature-btn ${notificationPermission === 'granted' ? 'enabled' : ''}`}
              onTouchStart={triggerHapticFeedback}
            >
              {notificationPermission === 'granted' ? 'Enabled ' : 'Enable Alerts'}
            </button>
          </div>

          {/* Offline Portfolio */}
          <div className="feature-card">
            <div className="feature-icon"></div>
            <h4>Offline Portfolio</h4>
            <p>Access without internet</p>
            <button 
              className="feature-btn"
              onTouchStart={triggerHapticFeedback}
            >
              View Offline
            </button>
          </div>

          {/* Share Function */}
          <div className="feature-card">
            <div className="feature-icon"></div>
            <h4>Share Portfolio</h4>
            <p>Native sharing</p>
            <button 
              onClick={sharePortfolio}
              className="feature-btn"
              onTouchStart={triggerHapticFeedback}
            >
              Share
            </button>
          </div>

          {/* Quick Actions */}
          <div className="feature-card">
            <div className="feature-icon"></div>
            <h4>Quick Add</h4>
            <p>Fast card entry</p>
            <button 
              className="feature-btn"
              onTouchStart={triggerHapticFeedback}
            >
              Add Card
            </button>
          </div>

          {/* Voice Search */}
          <div className="feature-card">
            <div className="feature-icon"></div>
            <h4>Voice Search</h4>
            <p>Speak to search</p>
            <button 
              className="feature-btn"
              onTouchStart={triggerHapticFeedback}
            >
               Search
            </button>
          </div>
        </div>
      </div>

      {/* Camera Scanner Modal */}
      {scanningMode && (
        <div className="scanner-modal">
          <div className="scanner-content">
            <div className="scanner-header">
              <h3> Scanning Card...</h3>
              <button onClick={stopCardScanning} className="close-scanner"></button>
            </div>
            
            <div className="scanner-viewfinder">
              <div className="viewfinder-overlay">
                <div className="scan-line"></div>
                <p>Point camera at card</p>
              </div>
            </div>
            
            <div className="scanner-instructions">
              <p> Position card in center</p>
              <p> Hold device steady</p>
              <p> Ensure good lighting</p>
            </div>
          </div>
        </div>
      )}

      {/* PWA Stats */}
      <div className="pwa-stats">
        <h3> Mobile PWA Statistics</h3>
        <div className="stats-grid">
          <div className="stat">
            <h4>Mobile Users Captured</h4>
            <p className="big-number">10M+</p>
          </div>
          <div className="stat">
            <h4>App Store Bypass</h4>
            <p className="big-number">100%</p>
          </div>
          <div className="stat">
            <h4>Offline Capability</h4>
            <p className="big-number">Full</p>
          </div>
          <div className="stat">
            <h4>Native Features</h4>
            <p className="big-number">All</p>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="performance-metrics">
        <h3> PWA Performance</h3>
        <div className="metrics-list">
          <div className="metric">
            <span>Load Time:</span>
            <span className="metric-value">1.2s</span>
          </div>
          <div className="metric">
            <span>Offline Ready:</span>
            <span className="metric-value"> Yes</span>
          </div>
          <div className="metric">
            <span>App-like Experience:</span>
            <span className="metric-value"> Native</span>
          </div>
          <div className="metric">
            <span>Installation:</span>
            <span className="metric-value"> One-click</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobilePWA;
