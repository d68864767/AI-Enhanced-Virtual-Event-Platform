const express = require('express');
const router = express.Router();

let polls = [];

// Route to create a new poll
router.post('/create', (req, res) => {
  const { question, options } = req.body;

  if (!question || !options) {
    return res.status(400).json({ error: 'Question and options are required' });
  }

  const poll = {
    id: polls.length + 1,
    question,
    options: options.map((option, index) => ({ id: index + 1, text: option, votes: 0 })),
    active: true
  };

  polls.push(poll);

  res.status(201).json(poll);
});

// Route to get all polls
router.get('/', (req, res) => {
  res.json(polls);
});

// Route to vote on a poll
router.post('/:pollId/vote', (req, res) => {
  const { pollId } = req.params;
  const { optionId } = req.body;

  const poll = polls.find(p => p.id === parseInt(pollId));

  if (!poll) {
    return res.status(404).json({ error: 'Poll not found' });
  }

  const option = poll.options.find(o => o.id === parseInt(optionId));

  if (!option) {
    return res.status(404).json({ error: 'Option not found' });
  }

  option.votes += 1;

  res.json(poll);
});

// Route to close a poll
router.post('/:pollId/close', (req, res) => {
  const { pollId } = req.params;

  const poll = polls.find(p => p.id === parseInt(pollId));

  if (!poll) {
    return res.status(404).json({ error: 'Poll not found' });
  }

  poll.active = false;

  res.json(poll);
});

module.exports = router;
