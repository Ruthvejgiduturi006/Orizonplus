import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './JobSeeker.css';

const JobSeekerOnboard = () => {
  const navigate = useNavigate();

  // Load the user data from localStorage using 'user' as the key
  const user = JSON.parse(localStorage.getItem('user'));

  // Initialize userId after loading the user data
  const userId = user ? user.id : null;

  // Early return logic should happen after hooks
  useEffect(() => {
    if (!userId) {
      alert('User data is not available. Please log in.');
      navigate('/login');
    }
  }, [userId, navigate]); // Add dependencies to ensure it only runs when userId changes

  // Declare state hooks unconditionally
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    dob: '',
    gender: '',
    languages: [],
  });

  const [step, setStep] = useState(1);

  // Load data from localStorage if it exists for the given user ID
  useEffect(() => {
    if (userId) {
      const storedUser = JSON.parse(localStorage.getItem(`user_${userId}`));
      if (storedUser) {
        setFormData(storedUser);
      }
    }
  }, [userId]); // Re-run whenever the userId changes

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLanguageChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const updatedLanguages = checked
        ? [...prev.languages, value]
        : prev.languages.filter((lang) => lang !== value);
      return { ...prev, languages: updatedLanguages };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the form data to the backend (optional, depends on your API)
      await axios.post('http://localhost:5000/api/jobseeker', formData);

      // Save the data in localStorage under the user's unique ID
      localStorage.setItem(`user_${userId}`, JSON.stringify(formData));

      alert('Profile saved successfully!');
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Failed to save profile');
    }
  };

  const renderStep = () => {
    const showPrev = step > 1;
    const showNext = step < 7;

    return (
      <div className="step-form">
        {step === 1 && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        )}
        {step === 2 && (
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        )}
        {step === 3 && (
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        )}
        {step === 4 && (
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        )}
        {step === 5 && (
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        )}
        {step === 6 && (
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        )}
        {step === 7 && (
          <div className="language-section">
            <label><strong>Languages Known:</strong></label>
            <div className="checkbox-group">
              <label><input type="checkbox" value="Telugu" onChange={handleLanguageChange} checked={formData.languages.includes("Telugu")} /> Telugu</label>
              <label><input type="checkbox" value="Hindi" onChange={handleLanguageChange} checked={formData.languages.includes("Hindi")} /> Hindi</label>
              <label><input type="checkbox" value="English" onChange={handleLanguageChange} checked={formData.languages.includes("English")} /> English</label>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="button-group">
          {showPrev && (
            <button type="button" onClick={() => setStep(step - 1)}>
              ← Previous
            </button>
          )}
          {showNext && (
            <button type="button" onClick={() => setStep(step + 1)}>
              Next →
            </button>
          )}
          {step === 7 && (
            <button type="submit">Save & Continue</button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="onboard-page">
      <div className="header">
        <img
          src="jobprofile.jpg"
          alt="Job Seeker"
          className="onboard-image"
          style={{ width: '100px', marginBottom: '10px' }}
        />
        <h1>Job Seeker Onboarding</h1>
      </div>

      <Link to="/dashboard" className="back-home">← Back to DASHBOARD</Link>
      <div className="circle blue-circle"></div>
      <div className="circle orange-circle"></div>

      <div className="progress-bar">
        <div className="progress-line"></div>
        <div
          className="progress-line-fill"
          style={{ width: `${(step - 1) / (7 - 1) * 100}%` }}
        ></div>

        {[...Array(7)].map((_, index) => {
          const icons = ['user', 'envelope', 'phone', 'map-marker', 'calendar', 'transgender', 'language'];
          return (
            <div
              key={index}
              className={`progress-step ${step > index ? 'completed' : ''}`}
            >
              <div className="step-icon">
                {step > index ? (
                  <span>{index + 1}</span>
                ) : (
                  <i className={`fa fa-${icons[index]} icon`}></i>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="content">
        <form onSubmit={handleSubmit} className="form-container">
          {renderStep()}
        </form>
      </div>
    </div>
  );
};

export default JobSeekerOnboard;
