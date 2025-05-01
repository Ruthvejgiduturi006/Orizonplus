import React, { useState } from 'react';
import { Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
import './jobProvider.css';

const JobProviderOnboard = () => {
    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    jobTitle: '',
    jobType: '',
    location: '',
    workingDays: '',
    timingsAndDuration: '',
    payDetails: '',
    openings: '',
    contact: '',
    lastDateToApply: '',
    shift: '',
    workDescription: ''
  });

  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userId = user?.id;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert('You must be logged in to post a job.');
      return;
    }

    try {
      const token = localStorage.getItem('token');

      const response = await axios.post(
        'http://localhost:5000/api/jobProvider/details',
        {
          userId,
          jobDetails: formData
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert('Job Posted Successfully!');
      console.log(response.data);
      navigate('/dashboard');
    } catch (error) {
      alert('Error posting job');
      console.error('Error posting job:', error);
    }
  };

  return (
    <div className="login-page">
  <div className="circle blue-circle"></div>
  <div className="circle orange-circle"></div>
  <Link to="/dashboard" className="back-hhome">← Back to DASHBOARD</Link>

  <form className="glass-card" onSubmit={handleSubmit}>
    <h2 className="reveal">Post a Job</h2>

    <label className="reveal">Job Title</label>
    <input
      className="reveal"
      type="text"
      name="jobTitle"
      placeholder="e.g. Data Entry"
      onChange={handleChange}
      required
    />

    <label className="reveal">Job Type</label>
    <select
      className="reveal"
      name="jobType"
      onChange={handleChange}
      required
    >
      <option value="">Select</option>
      <option value="Full-time">Full-time</option>
      <option value="Part-time">Part-time</option>
      <option value="Temporary">Temporary</option>
    </select>

    <label className="reveal">Location</label>
    <input
      className="reveal"
      type="text"
      name="location"
      placeholder="e.g. Telangana"
      onChange={handleChange}
      required
    />

    <label className="reveal">Working Days</label>
    <input
      className="reveal"
      type="text"
      name="workingDays"
      placeholder="e.g. Monday to Friday"
      onChange={handleChange}
      required
    />

    <label className="reveal">Timings & Duration</label>
    <input
      className="reveal"
      type="text"
      name="timingsAndDuration"
      placeholder="e.g. 9 AM to 6 PM, 3 months"
      onChange={handleChange}
      required
    />

    <label className="reveal">Pay Details</label>
    <input
      className="reveal"
      type="text"
      name="payDetails"
      placeholder="e.g. $25/hour"
      onChange={handleChange}
    />

    <label className="reveal">Openings</label>
    <input
      className="reveal"
      type="number"
      name="openings"
      placeholder="e.g. 5"
      onChange={handleChange}
    />

    <label className="reveal">Contact</label>
    <input
      className="reveal"
      type="tel"
      name="contact"
      placeholder="e.g. 1234567890"
      onChange={handleChange}
      required
    />

    <label className="reveal">Last Date to Apply</label>
    <input
      className="reveal"
      type="date"
      name="lastDateToApply"
      onChange={handleChange}
    />

    <label className="reveal">Shift</label>
    <select
      className="reveal"
      name="shift"
      onChange={handleChange}
    >
      <option value="">Select</option>
      <option value="Morning">Morning</option>
      <option value="Evening">Evening</option>
      <option value="Night">Night</option>
    </select>

    <label className="reveal">Work Description</label>
    <textarea
      className="reveal"
      name="workDescription"
      rows="3"
      placeholder="e.g. Responsible for developing work"
      onChange={handleChange}
    ></textarea>

    <button type="submit" className="reveal">Post Job</button>
  </form>
</div>

  );
};

export default JobProviderOnboard;
