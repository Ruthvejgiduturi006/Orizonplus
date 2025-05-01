const express = require('express');
const router = express.Router();
const Job = require('../models/job'); // adjust based on your model

// GET /api/job/listings
router.get('/listings', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

module.exports = router;
