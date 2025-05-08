const express = require('express');
const router = express.Router();
const User = require('../models/user'); // adjust the path as needed

// GET job provider by ID
router.get('/:id', async (req, res) => {
  try {
    const provider = await User.findById(req.params.id);
    if (!provider || !provider.jobProviderProfile) {
      return res.status(404).json({ message: 'Job provider not found' });
    }
    res.json(provider.jobProviderProfile); // or res.json(provider) if you want all user data
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
