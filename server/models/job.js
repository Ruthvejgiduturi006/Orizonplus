const express = require('express');
const router = express.Router();
const Job = require('../models/job');
const User = require('../models/user');

// Get all job listings with provider details
router.get('/browse', async (req, res) => {
  try {
    const jobs = await Job.find().populate('postedBy', 'name email'); // populate provider info
    res.status(200).json(jobs);
  } catch (err) {
    console.error('Error fetching jobs:', err);
    res.status(500).json({ message: 'Error fetching job listings' });
  }
});

module.exports = router;
