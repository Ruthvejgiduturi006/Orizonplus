const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // ✅ Load environment variables

const authRoutes = require('./routes/auth');
const jobSeekerRoutes = require('./routes/jobSeekerRoutes');
const jobProviderRoutes = require('./routes/jobProviderRoutes');
const jobRoutes = require('./routes/job');
const findJobsRoute = require('./routes/findjob');

const app = express();
const PORT = process.env.PORT || 5000; // ✅ Read from env

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobSeeker', jobSeekerRoutes);
app.use('/api/jobProvider', jobProviderRoutes);
app.use('/api/job', jobRoutes);
app.use('/api/findjobs', findJobsRoute);

// ✅ Correct DB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected!');
})
.catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
