const WebSocket = require('ws');

// Create WebSocket server
const wss = new WebSocket.Server({ noServer: true });

// Function to handle WebSocket connections
function handleConnection(ws) {
  console.log('Client connected');

  ws.on('message', (message) => {
    console.log('Received: %s', message);
    // Handle different types of messages here
    handleMessage(ws, message);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
}

// Function to handle incoming messages
function handleMessage(ws, message) {
  // Parse the message
  const data = JSON.parse(message);

  // Handle different types of messages
  switch (data.type) {
    case 'chat':
      handleChatMessage(ws, data);
      break;
    case 'video':
      handleVideoMessage(ws, data);
      break;
    default:
      console.log('Unknown message type: ' + data.type);
  }
}

// Function to handle chat messages
function handleChatMessage(ws, data) {
  // Broadcast the message to all connected clients
  wss.clients.forEach((client) => {
    if (client !== ws && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

// Function to handle video messages
function handleVideoMessage(ws, data) {
  // Broadcast the message to all connected clients
  wss.clients.forEach((client) => {
    if (client !== ws && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

// Export the WebSocket server and the connection handler
module.exports = { wss, handleConnection };
