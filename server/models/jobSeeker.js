const mongoose = require('mongoose');

const jobSeekerSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: String,
  phone: String,
  phone: String ,
  address: { type: String },
  location: { type: String },  // New field for location
  dob: { type: Date },         // New field for date of birth
  gender: { type: String },    // New field for gender
  languages: [{ type: String }], // New field for languages
});

module.exports = mongoose.model('JobSeeker', jobSeekerSchema);
