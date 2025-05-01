const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Route to store job provider's job posting in user's document
router.post('/jobprovider/onboard', async (req, res) => {
  const { userId, jobData } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Push job data into postedJobs array
    user.postedJobs.push(jobData);
    await user.save();

    res.status(200).json({ message: 'Job posted successfully' });
  } catch (err) {
    console.error('Error saving job post:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
