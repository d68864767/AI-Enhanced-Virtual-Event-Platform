const express = require('express');
const WebSocket = require('ws');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Importing other modules
const ai = require('./ai');
const polls = require('./polls');
const dashboard = require('./dashboard');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// WebSocket connection
wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    console.log('Received: %s', message);
    // Handle different types of messages here
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Routes for other features
app.use('/ai', ai);
app.use('/polls', polls);
app.use('/dashboard', dashboard);

// Start the server
server.listen(process.env.PORT || 3000, () => {
  console.log(`Server started on port ${server.address().port}`);
});
