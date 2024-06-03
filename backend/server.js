const jsonServer = require('json-server');
const path = require('path');
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

// Set default port or use 3000
const PORT = process.env.PORT || 3000;

// Use default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Use the router with custom routes
server.use(router);

// Start the server
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
