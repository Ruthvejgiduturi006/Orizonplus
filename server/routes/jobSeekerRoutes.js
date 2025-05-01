// routes/jobseekerRoutes.js
const express = require('express');
const User = require('../models/user');
const router = express.Router();

// Update profile for job seeker
router.post('/', async (req, res) => {
  try {
    const { email, phone, address, location, dob, gender, languages } = req.body;

    // Validate the incoming data
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Find user and update job seeker details in the User model
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { phone, address, location, dob, gender, languages },
      { new: true } // Returns the updated user object
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found to update profile' });
    }

    res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: 'Error updating profile', error: err.message });
  }
});

module.exports = router;
