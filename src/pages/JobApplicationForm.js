// JobApplicationForm.js
import React, { useState } from 'react';
import axios from 'axios';

const JobApplicationForm = ({ selectedJob }) => {
  const [userDetails, setUserDetails] = useState({
    phone: '',
    location: '',
  });

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    try {
      const seeker = JSON.parse(localStorage.getItem('user'));
      if (!seeker || !selectedJob?._id) {
        alert('Missing user or job details. Please try again.');
        return;
      }

      await axios.post('https://orizonplus.onrender.com/api/apply', {
        jobId: selectedJob._id,
        providerId: selectedJob.userId,
        seekerId: seeker._id,
        userDetails,
      });

      // Store job and provider details for confirmation
      localStorage.setItem('selectedJob', JSON.stringify(selectedJob));

      // Add notification for dashboard
      const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
      notifications.push(`Applied for ${selectedJob.title}`);
      localStorage.setItem('notifications', JSON.stringify(notifications));

      // Redirect to confirmation page
      window.location.href = '/application-success.html';
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 400) {
        alert(err.response.data.message || 'Already applied for this job.');
      } else {
        alert('Application failed. Please try again.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmitApplication}>
      <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        value={userDetails.phone}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={userDetails.location}
        onChange={handleChange}
        required
      />
      <button type="submit">Apply</button>
    </form>
  );
};

export default JobApplicationForm;
