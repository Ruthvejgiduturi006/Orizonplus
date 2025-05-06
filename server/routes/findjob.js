const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// This assumes you're using the existing 'users' collection with embedded jobProviderProfile
// No need to import a new model, just query the collection directly

router.get('/', async (req, res) => {
  try {
    const users = await mongoose.connection.db
      .collection('users')
      .find({ "jobProviderProfile": { $exists: true } }) // filter only job providers
      .toArray();

    res.json(users);
  } catch (err) {
    console.error('Error fetching jobs:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
