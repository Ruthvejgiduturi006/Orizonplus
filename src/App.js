// src/App.js

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroSection from './sections/HeroSection';
import JourneySection from './sections/JourneySection';
import ValueSection from './sections/ValueSection';
import ProcessSection from './sections/ProcessSection';
import Statistics from './sections/Statistics';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import JobSeekerOnboard from './pages/JobSeekerOnboard';
import JobProviderOnboard from './pages/JobProviderOnboard';
import BrowseJobs from './pages/BrowseJobs'; // This now contains UsersList logic


export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <JourneySection />
              <ValueSection />
              <Statistics />
              <ProcessSection />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/jobseeker-onboard" element={<JobSeekerOnboard />} />
        <Route path="/jobprovider-onboard" element={<JobProviderOnboard />} />
        <Route path="/BrowseJobs" element={<BrowseJobs />} />
      </Routes>
    </Router>
    
  );
}
