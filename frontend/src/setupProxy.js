const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://stackbackend-y1d5.onrender.com',
      changeOrigin: true,
    })
  );
};
