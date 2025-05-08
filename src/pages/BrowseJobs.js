import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BrowseJobs.css';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Custom Pin Icon for the map marker
const pinIcon = new L.Icon({
  iconUrl: 'placeholder.png', // Replace with your red pin image URL
  iconSize: [25, 41], // Standard size for a pin icon
  iconAnchor: [12, 41], // Adjust anchor point to center at the bottom of the icon
  popupAnchor: [0, -40], // Adjust popup position above the marker
});

// Modal for Apply Now
const ApplyModal = ({ isOpen, onClose, job, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    gender: '',
    dob: '',
    languages: '',
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      const detailedUser = JSON.parse(localStorage.getItem(`user_${user.id}`)) || {};
      setFormData({
        name: detailedUser.name || user.name || '',
        email: detailedUser.email || user.email || '',
        phone: detailedUser.phone || user.phone || '',
        location: detailedUser.location || '',
        gender: detailedUser.gender || '',
        dob: detailedUser.dob || '',
        languages: detailedUser.languages?.join(', ') || '',
      });
    }
  }, [job]);

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  if (!isOpen || !job) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <h2>Confirm Application</h2>
        <div className="user-details">
          {Object.entries(formData).map(([key, value]) => (
            <p key={key}><strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value || 'N/A'}</p>
          ))}
        </div>
        <hr />
        <p>Fixed Pay: <strong>{job.payDetails || 'Not specified'}</strong></p>
        <div className="modal-actions">
          <button className="modal-btn" onClick={handleSubmit}>Agree & Submit</button>
          <button className="modal-btn cancel" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

// Modal for Map
const MapModal = ({ isOpen, onClose, jobs }) => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      setLoading(true);
      const promises = jobs.map(async (user) => {
        const profile = user.jobProviderProfile;
        const locationName = `${profile.doorNo || ''}, ${profile.street || ''}, ${profile.location || ''}, ${profile.city || ''}, ${profile.state || ''}, India`;
    
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationName)}`);
          const data = await res.json();
          if (data.length > 0) {
            return {
              lat: parseFloat(data[0].lat),
              lon: parseFloat(data[0].lon),
              job: user.jobProviderProfile,
            };
          }
        } catch (error) {
          console.error('Error geocoding location:', locationName, error);
        }
        return null;
      });
      
      const results = await Promise.all(promises);
      setLocations(results.filter(l => l !== null));
      setLoading(false);
    };
    

    if (isOpen) {
      fetchLocations();
    }
  }, [isOpen, jobs]);

  if (!isOpen) return null;

  const defaultPosition = [20.5937, 78.9629]; // Center of India

  return (
    <div className="modal-backdrop">
      <div className="modal-box large-map">
        <h2>Jobs Location Map</h2>

        {loading ? (
          <div className="spinner-container">
            <div className="spinner"></div>
            <p>Loading locations...</p>
          </div>
        ) : (
          <MapContainer center={defaultPosition} zoom={5} style={{ height: '400px', width: '100%' }}>
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {locations.map((loc, idx) => (
              <Marker key={idx} position={[loc.lat, loc.lon]} icon={pinIcon}>
                <Popup>
                  <strong>{loc.job.jobTitle}</strong><br />
                  {loc.job.location}<br />
                  {loc.job.payDetails}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}

        <button className="modal-btn cancel" onClick={onClose}>Close Map</button>
      </div>
    </div>
  );
};

const BrowseJobs = () => {
  const [users, setUsers] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ location: '', minPay: '', shift: '', timeLimit: '' }); // Added timeLimit filter
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [mapOpen, setMapOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('https://orizonplus.onrender.com/api/findjobs');
        const providers = res.data.filter(u => u.jobProviderProfile);
        setUsers(providers);
        setFilteredJobs(providers);
      } catch (err) {
        console.error('Error fetching jobs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleApply = (job, userId) => {
    setSelectedJob({ ...job, userId });
    setModalOpen(true);
  };

  const handleSubmitApplication = async () => {
    try {
      // Retrieve the logged-in job seeker and selected job details
      const seeker = JSON.parse(localStorage.getItem('user'));
      const selectedJob = JSON.parse(localStorage.getItem('selectedJob'));
  
      if (!selectedJob) {
        alert("No job selected. Please choose a job before applying.");
        return;
      }
  
      // Fetch actual job provider details if not already available
      let jobProvider = selectedJob.providerDetails;
      if (!jobProvider || !jobProvider.name) {
        const response = await fetch(`https://orizonplus.onrender.com/api/jobProvider/${selectedJob.providerId}`);
        jobProvider = await response.json();
      }
  
      // Log application notification
      const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
      notifications.push({
        type: 'application',
        jobTitle: selectedJob.jobTitle,
        from: seeker.name,
        date: new Date().toISOString(),
      });
      localStorage.setItem('notifications', JSON.stringify(notifications));
  
      // Generate the application confirmation letter
      const applicationLetter = `
        <div style="padding: 20px; font-family: Arial, sans-serif; max-width: 700px; margin: auto; background: #f9f9f9; border-radius: 10px;">
          <h2 style="text-align: center; color: #007bff;">🎯 Job Application Confirmation</h2>
          <p><strong>Job Title:</strong> ${selectedJob.jobTitle}</p>
          <p><strong>Payment:</strong> ₹${selectedJob.payDetails}</p>
          <p><strong>Job ID:</strong> ${selectedJob._id || 'N/A'}</p>
          <hr />
          <p><strong>Job Seeker:</strong> ${seeker.name} (${seeker.phone})</p>
          <p><strong>Job Provider:</strong> ${jobProvider.name || 'N/A'} (${jobProvider.phone || 'N/A'})</p>
          <hr />
          <p>This letter serves as an official confirmation that <strong>${seeker.name}</strong> has applied for the job "<strong>${selectedJob.jobTitle}</strong>" and agrees to the listed payment terms.</p>
          <div style="margin-top: 30px; display: flex; gap: 10px;">
            <button onclick="window.location.href='https://orizonplus.netlify.app/BrowseJobs'" style="flex: 1; background: #007bff; color: white; border: none; padding: 10px; border-radius: 5px;">← Back to Jobs</button>
            <button onclick="window.print()" style="flex: 1; background: #28a745; color: white; border: none; padding: 10px; border-radius: 5px;">🖨 Print Proof</button>
          </div>
        </div>
      `;
  
      // Replace the page content with the application proof letter
      document.body.innerHTML = applicationLetter;
  
      // Show Success Popup
      showSuccessPopup();
  
    } catch (err) {
      console.error(err);
      alert("Application failed. Please try again.");
    }
  };
  
  // Function to show the "Successfully Applied" popup
  const showSuccessPopup = () => {
    const popup = document.createElement('div');
    popup.id = 'success-popup';
    popup.innerHTML = `
      <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); padding: 20px; background: #4CAF50; color: white; border-radius: 10px; font-size: 16px; text-align: center; z-index: 9999;">
        <strong>Success!</strong> You have successfully applied for the job.
      </div>
    `;
    document.body.appendChild(popup);
  
    // Remove the popup after 3 seconds
    setTimeout(() => {
      popup.remove();
    }, 3000); // 3 seconds delay
  };  
  
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    let jobs = [...users];

    // Location Filter
    if (filters.location) {
      jobs = jobs.filter(user => user.jobProviderProfile && user.jobProviderProfile.location && user.jobProviderProfile.location.toLowerCase().includes(filters.location.toLowerCase()));
    }

    // Minimum Pay Filter
    if (filters.minPay) {
      jobs = jobs.filter(user => {
        const payDetails = user.jobProviderProfile?.payDetails || ''; // Default to empty string if undefined
        const pay = payDetails ? parseInt(payDetails.replace(/[^\d]/g, '')) : 0;
        return pay >= parseInt(filters.minPay);
      });
    }

    // Shift Filter
    if (filters.shift) {
      jobs = jobs.filter(user => user.jobProviderProfile && user.jobProviderProfile.shift.toLowerCase() === filters.shift.toLowerCase());
    }

    // Time Limit Filter
    if (filters.timeLimit) {
      const currentDate = new Date();
      if (filters.timeLimit === 'open') {
        jobs = jobs.filter(user => {
          const lastDate = new Date(user.jobProviderProfile?.lastDateToApply);
          return lastDate >= currentDate; // Only show jobs that are still open for applications
        });
      } else if (filters.timeLimit === 'expired') {
        jobs = jobs.filter(user => {
          const lastDate = new Date(user.jobProviderProfile?.lastDateToApply);
          return lastDate < currentDate; // Only show jobs that have expired
        });
      }
    }

    setFilteredJobs(jobs);
  }, [filters, users]);

  if (loading) return <div className="loading">Loading Jobs...</div>;

  return (
    <div className="browse-jobs-container">
      <div className="background-shape"></div>
      <Link to="/dashboard" className="back-home">← Back to DASHBOARD</Link>

      <h1 className="browse-title">Explore Jobs</h1>

      {/* Filters */}
      <div className="filters-section">
        <input
          type="text"
          name="location"
          placeholder="Filter by Location..."
          value={filters.location}
          onChange={handleFilterChange}
          className="filter-input"
        />
        <input
          type="number"
          name="minPay"
          placeholder="Minimum Pay..."
          value={filters.minPay}
          onChange={handleFilterChange}
          className="filter-input"
        />
        <select
          name="shift"
          value={filters.shift}
          onChange={handleFilterChange}
          className="filter-select"
        >
          <option value="">Select Shift</option>
          <option value="Morning">Morning</option>
          <option value="Evening">Evening</option>
          <option value="Night">Night</option>
        </select>

        {/* Time Limit Filter */}
        <select
          name="timeLimit"
          value={filters.timeLimit}
          onChange={handleFilterChange}
          className="filter-select"
        >
          <option value="">All Time Limits</option>
          <option value="open">Open for Application</option>
          <option value="expired">Expired</option>
        </select>
      </div>

      {/* View on Map Button */}
      <div className="map-button-container">
        <button className="view-map-btn" onClick={() => setMapOpen(true)}>
          View Jobs on Map 🗺️
        </button>
      </div>

      {/* Job Cards */}
      <div className="job-cards-wrapper">
        <AnimatePresence>
          {filteredJobs.length > 0 ? filteredJobs.map(user => {
            const profile = user.jobProviderProfile;
            return (
              <motion.div
                key={user._id}
                className="job-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="job-card-header">
                  <img src="/job-seeker.png" alt="Job Icon" className="job-icon" />
                  <div>
                    <h2>{profile.jobTitle}</h2>
                    <p className="company-name">{user.name}</p>
                  </div>
                </div>

                <div className="job-card-body">
                  <p><i className="fas fa-map-marker-alt"></i> <strong>Location:</strong> {profile.location}</p>
                  <p><i className="fas fa-clock"></i> <strong>Shift:</strong> {profile.shift}</p>
                  <p><i className="fas fa-calendar-alt"></i> <strong>Last Date:</strong> {profile.lastDateToApply ? new Date(profile.lastDateToApply).toLocaleDateString() : 'N/A'}</p>
                  <p><i className="fas fa-rupee-sign"></i> <strong>Pay:</strong> {profile.payDetails}</p>
                  <p><i className="fas fa-tasks"></i> <strong>Description:</strong> {profile.workDescription}</p>
                  <p><i className="fas fa-calendar-day"></i> <strong>Working Days:</strong> {profile.workingDays}</p>
                  <p><i className="fas fa-clock"></i> <strong>Timings & Duration:</strong> {profile.timingsAndDuration}</p>
                  <p><i className="fas fa-phone-alt"></i> <strong>Contact:</strong> {profile.contact}</p>
                  <p><i className="fas fa-users"></i> <strong>Openings:</strong> {profile.openings}</p>
                </div>

                <div className="job-card-footer">
                  <button className="apply-btn" onClick={() => handleApply(profile, user._id)}>
                    Apply Now
                  </button>
                </div>
              </motion.div>
            );
          }) : (
            <p className="no-jobs-message">No jobs match your filters.</p>
          )}
        </AnimatePresence>
      </div>

      {/* Modals */}
      <ApplyModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        job={selectedJob}
        onSubmit={handleSubmitApplication}
      />

      <MapModal
        isOpen={mapOpen}
        onClose={() => setMapOpen(false)}
        jobs={filteredJobs}
      />
    </div>
  );
};

export default BrowseJobs;

