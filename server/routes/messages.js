const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// POST /api/messages
router.post('/', async (req, res) => {
  try {
    const { toUserId, title, content } = req.body;

    const newMessage = new Message({
      toUserId,
      title,
      content,
    });

    await newMessage.save();
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (err) {
    console.error('Error sending message:', err);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// GET /api/messages/:userId (for dashboard)
router.get('/:userId', async (req, res) => {
  try {
    const messages = await Message.find({ toUserId: req.params.userId }).sort({ timestamp: -1 });
    res.json(messages);
  } catch (err) {
    console.error('Error fetching messages:', err);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

module.exports = router;
