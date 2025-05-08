// routes/jobProviderRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');

// POST /api/jobProvider/details
router.post('/details', async (req, res) => {
  const { userId, jobDetails } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.jobProviderProfile = jobDetails;
    await user.save();

    res.status(200).json({ message: 'Job Provider details saved successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error saving details', error });
  }
});

module.exports = router;
