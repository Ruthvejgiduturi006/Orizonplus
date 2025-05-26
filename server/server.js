const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const jobSeekerRoutes = require('./routes/jobSeekerRoutes');
const jobProviderRoutes = require('./routes/jobProviderRoutes');
const jobRoutes = require('./routes/job');
const findJobsRoute = require('./routes/findjob');
const applyRoute = require('./routes/apply'); // <-- Add this
const jobProviderRoute = require('./routes/jobprivder');


const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS Configuration
app.use(cors({
  origin: ['http://localhost:5173','http://localhost:3000', 'https://orizonplus.netlify.app'], // Allow both local and production frontends
  credentials: true,
}));

// ✅ Body Parser
app.use(express.json());

// ✅ API Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobSeeker', jobSeekerRoutes);
app.use('/api/jobProvider', jobProviderRoutes);
app.use('/api/job', jobRoutes);
app.use('/api/findjobs', findJobsRoute);
app.use('/api/apply', applyRoute); // <-- Add this
app.use('/api/jobProvide', jobProviderRoute);

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ MongoDB connected!');
})
.catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
