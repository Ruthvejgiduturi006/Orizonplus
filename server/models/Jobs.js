const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  skills: [String],
  address: String,
  phone: String,
  preferences: String,
  jobProviderProfile: {
    jobTitle: String,
    jobType: String,
    location: String,
    days: String,                  // e.g., "Monday to Saturday"
    shift: String,                 // e.g., "Evening"
    salary: String,                // e.g., "₹500/Day"
    openings: String,              // e.g., "1"
    contact: String,               // e.g., "77802763"
    deadline: Date,                // e.g., "2025-04-26"
    description: String            // e.g., "Fix Fans and Lights"
  }
}, { timestamps: true });

module.exports = mongoose.model('Jobs', userSchema);
