const assert = require('assert');
const WebSocket = require('ws');
const http = require('http');

const server = require('./server');
const ai = require('./ai');
const polls = require('./polls');
const dashboard = require('./dashboard');

describe('Virtual Event Platform', () => {
  let app;
  let server;
  let ws;

  before(() => {
    // Start the server before the tests
    app = server.listen(3000);
    ws = new WebSocket('ws://localhost:3000');
  });

  after(() => {
    // Close the server after the tests
    ws.close();
    app.close();
  });

  describe('WebSocket communication', () => {
    it('should receive messages sent by the client', (done) => {
      ws.on('message', (message) => {
        assert.strictEqual(message, 'Test message');
        done();
      });

      ws.send('Test message');
    });
  });

  describe('AI recommendations', () => {
    it('should return recommendations for a user', async () => {
      const user = 'testUser';
      const recommendations = await ai.getRecommendations(user);
      assert(recommendations);
      assert(Array.isArray(recommendations));
    });
  });

  describe('Polls', () => {
    it('should create a new poll', async () => {
      const poll = {
        question: 'Test question',
        options: ['Option 1', 'Option 2']
      };

      const response = await polls.create(poll);
      assert(response);
      assert.strictEqual(response.question, poll.question);
      assert.deepStrictEqual(response.options, poll.options);
    });
  });

  describe('Dashboard', () => {
    it('should return engagement metrics', async () => {
      const metrics = await dashboard.getMetrics();
      assert(metrics);
      assert(metrics.activeUsers >= 0);
      assert(metrics.totalMessages >= 0);
      assert(metrics.totalVideoCalls >= 0);
      assert(metrics.totalPolls >= 0);
      assert(metrics.totalVotes >= 0);
    });
  });
});
