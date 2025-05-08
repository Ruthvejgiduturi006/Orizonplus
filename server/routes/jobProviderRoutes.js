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
<<<<<<< HEAD

module.exports = router;
=======
// GET job provider details by ID
router.get('/api/jobProvider/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Job provider not found' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
  
>>>>>>> f902a766c2ae0a9842d279140f9b045c940f270e
