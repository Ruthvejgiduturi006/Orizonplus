const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const jobSeekerRoutes = require('./routes/jobSeekerRoutes');
const jobProviderRoutes = require('./routes/jobProviderRoutes'); // ✅ NEW
const jobRoutes = require('./routes/job');
const findJobsRoute = require('./routes/findjob');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobSeeker', jobSeekerRoutes);
app.use('/api/jobProvider', jobProviderRoutes); // ✅ NEW
app.use('/api/job', jobRoutes); // ✅ Now /api/job/browse will work!
app.use('/api/findjobs', findJobsRoute);


// DB Connection
mongoose.connect('mongodb://127.0.0.1:27017/orizonplus', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected!');
}).catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
