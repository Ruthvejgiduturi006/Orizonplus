const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // Job Seeker details
  phone: { type: String },
  address: { type: String },
  location: { type: String },
  dob: { type: Date },
  gender: { type: String },
  languages: [{ type: String }],

  // Job Provider details
  jobProviderProfile: {
    jobTitle: { type: String },
    jobType: { type: String },
    location: { type: String },
    workingDays: { type: String },
    timingsAndDuration: { type: String },
    payDetails: { type: String },
    openings: { type: String },
    contact: { type: String },
    lastDateToApply: { type: String },
    shift: { type: String },
    workDescription: { type: String },

    // Optional fields for future or extended use
    genderPreference: { type: String },
    logoUrl: { type: String },
    locationLink: { type: String },
    postedBy: { type: String }
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
