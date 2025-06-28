app.get('/api/database/status', (req, res) => {
  const isConnected = mongoose.connection.readyState === 1;
  const hasUri = !!process.env.MONGODB_URI;
  
  res.json({
    success: true,
    message: 'Database connection active',
    mongodb: isConnected ? 'connected' : (hasUri ? 'configured' : 'not configured'),
    connectionState: mongoose.connection.readyState,
    timestamp: new Date().toISOString()
  });
});
