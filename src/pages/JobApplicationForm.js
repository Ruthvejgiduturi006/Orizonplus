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
      await axios.post('http://localhost:5000/api/apply', {
        jobId: selectedJob._id,
        providerId: selectedJob.userId,
        seekerId: seeker?._id,
        userDetails,
      });

      // Store job and provider details for confirmation page
      localStorage.setItem('selectedJob', JSON.stringify(selectedJob));

      // Add notification for the dashboard
      const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
      notifications.push(`Applied for ${selectedJob.title}`);
      localStorage.setItem('notifications', JSON.stringify(notifications));

      // Redirect to confirmation page
      window.location.href = '/application-success.html';
    } catch (err) {
      console.error(err);
      alert('Application failed. Try again.');
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
