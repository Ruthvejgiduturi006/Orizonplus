const express = require('express');
const router = express.Router();
const User = require('../models/user');

// POST /api/jobs/post
router.post('/post', async (req, res) => {
  const userId = req.body.userId; // Or from token if using JWT
  const jobDetails = req.body.job;

  try {
    const user = await User.findById(userId);
    if (!user || user.role !== 'provider') {
      return res.status(404).json({ error: 'User not found or not a provider' });
    }

    user.postedJobs.push(jobDetails);
    await user.save();

    res.status(200).json({ message: 'Job posted successfully', job: jobDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
