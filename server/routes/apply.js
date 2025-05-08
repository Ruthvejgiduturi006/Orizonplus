const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  jobId: String,
  providerId: String,
  seekerId: String,
  userDetails: {
    phone: String,
    location: String
  },
  appliedAt: {
    type: Date,
    default: Date.now
  }
});

// Prevent re-registration of model during hot reloads/dev
const Application = mongoose.models.Application || mongoose.model('Application', applicationSchema);

router.post('/', async (req, res) => {
  try {
    const { jobId, providerId, seekerId, userDetails } = req.body;

    // Validate inputs
    if (!jobId || !providerId || !seekerId || !userDetails?.phone || !userDetails?.location) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Prevent duplicate applications
    const existing = await Application.findOne({ jobId, seekerId });
    if (existing) {
      return res.status(400).json({ message: 'Already applied for this job' });
    }

    const application = new Application({
      jobId,
      providerId,
      seekerId,
      userDetails
    });

    await application.save();
    res.status(201).json({ message: 'Application submitted successfully' });
  } catch (err) {
    console.error('❌ Error saving application:', err);
    res.status(500).json({ message: 'Failed to apply' });
  }
});

module.exports = router;
