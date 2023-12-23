// Importing necessary modules
const { wss, handleConnection } = require('./websocket');
const ai = require('./ai');
const polls = require('./polls');
const dashboard = require('./dashboard');

// Fetching elements from the DOM
const chatInput = document.getElementById('chat-input');
const chatSendButton = document.getElementById('chat-send-button');
const videoButton = document.getElementById('video-button');
const recommendationButton = document.getElementById('recommendation-button');
const agendaButton = document.getElementById('agenda-button');
const pollButton = document.getElementById('poll-button');
const metricsButton = document.getElementById('metrics-button');

// Creating a WebSocket connection
const ws = new WebSocket('ws://localhost:3000');

ws.onopen = () => {
  console.log('Connected to the server');
  handleConnection(ws);
};

ws.onmessage = (message) => {
  const data = JSON.parse(message.data);
  console.log('Received: %s', data);
  // Handle different types of messages here
};

ws.onerror = (error) => {
  console.log('WebSocket error: ' + error);
};

ws.onclose = () => {
  console.log('Disconnected from the server');
};

// Event listeners for buttons
chatSendButton.addEventListener('click', () => {
  const message = chatInput.value;
  ws.send(JSON.stringify({ type: 'chat', message }));
});

videoButton.addEventListener('click', () => {
  // Start a video call
  ws.send(JSON.stringify({ type: 'video', action: 'start' }));
});

recommendationButton.addEventListener('click', () => {
  // Fetch recommendations from the AI module
  ai.get('/recommendations', (recommendations) => {
    console.log(recommendations);
  });
});

agendaButton.addEventListener('click', () => {
  // Fetch agenda from the AI module
  ai.get('/agenda', (agenda) => {
    console.log(agenda);
  });
});

pollButton.addEventListener('click', () => {
  // Fetch polls from the Polls module
  polls.get('/', (polls) => {
    console.log(polls);
  });
});

metricsButton.addEventListener('click', () => {
  // Fetch metrics from the Dashboard module
  dashboard.get('/metrics', (metrics) => {
    console.log(metrics);
  });
});
