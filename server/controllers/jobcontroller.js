const Job = require('../models/job');

exports.createJob = async (req, res) => {
  try {
    const job = new Job({ ...req.body, postedBy: req.user.id });
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ message: 'Failed to post job', error: err });
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('postedBy', 'name');
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch jobs', error: err });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('postedBy', 'name');
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.status(200).json(job);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch job', error: err });
  }
};
