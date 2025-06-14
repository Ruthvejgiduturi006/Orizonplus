import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiLogOut,FiMessageCircle } from 'react-icons/fi';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('home');
  const [profileData, setProfileData] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [messages] = useState([]);
  


  // Get user info from localStorage
  const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
  const userId = storedUser._id || 'N/A';
  const userName = storedUser.name || 'User';

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (storedUser) {
      setProfileData({
        name: storedUser.name || '',
        email: storedUser.email || '',
        phone: storedUser.phone || '',
        gender: storedUser.gender || '',
        dob: storedUser.dob || '',
      });
    }
  }, []); // Empty dependency array ensures this runs only once, after the first render.
  // Fetch notifications from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('notifications') || '[]');
    setNotifications(stored);
    const unread = stored.filter(msg => !msg.read).length;
    setUnreadCount(unread);
  }, []);
  const handleClickMessages = () => {
    setActiveSection('messages');
    // Optionally mark all as read:
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    localStorage.setItem('notifications', JSON.stringify(updated));
    setUnreadCount(0);
  };
  const handleLogout = () => {
    alert('Logged out');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleProfileSave = () => {
    localStorage.setItem('user', JSON.stringify(profileData));
    alert('Profile updated!');
  };

  const referData = [
    { reward: 'Flat $10 for every friend you refer who completes a job.', color: 'linear-gradient(45deg, #6e7dff, #b1c4fd)', icon: '💵' },
    { reward: 'Earn 5% of the hourly wage for each hourly job your referral completes.', color: 'linear-gradient(45deg, #ff7d7d, #ffb0b0)', icon: '💼' },
    { reward: 'Special Offer: Double rewards this month!', color: 'linear-gradient(45deg, #ffbd69, #ff9d00)', icon: '🎉' },
    { reward: 'Get $20 in credits for your next job post when your referral posts a job.', color: 'linear-gradient(45deg, #64f9d1, #6fc5f9)', icon: '💳' },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return (
          <div className="main-cards">
            <div className="action-card" onClick={() => navigate('/jobseeker-onboard')}>
              <img src="on.webp" alt="Onboarding" />
              <p>Job Seeker Onboarding</p>
              <button>Onboarding</button>
            </div>
            <div className="action-card" onClick={() => navigate('/BrowseJobs')}>
              <img src="need.jpg" alt="Find a Job" />
              <p>Find part-time & hourly jobs</p>
              <button>Find a Job</button>
            </div>
            <div className="action-card" onClick={() => navigate('/jobprovider-onboard')}>
              <img src="hire.jpeg" alt="Post a Job" />
              <p>Get staff in</p>
              <button>Post a Job</button>
            </div>
            <div className="action-card" onClick={() => setActiveSection('profile')}>
              <img src="profile.png" alt="Profile" />
              <p>View & Update Profile</p>
              <button>Profile</button>
            </div>
            <div className="action-card" onClick={() => setActiveSection('refer')}>
              <img src="earnn.jpg" alt="Refer & Earn" />
              <p>Refer & Earn</p>
              <button>Refer & Earn</button>
            </div>
            <div className="action-card" onClick={() => setActiveSection('reviews')}>
              <img src="review.png" alt="Reviews" />
              <p>Reviews & Ratings</p>
              <button>Reviews</button>
            </div>
            <div className="orange-circle circle"></div>
          </div>
        );

      case 'refer':
        return (
          <div className="content">
            <h3>Refer & Earn Program</h3>
            <div className="refer-tickets">
              {referData.map((item, index) => (
                <div key={index} className="refer-ticket" style={{ background: item.color }}>
                  <span className="refer-icon">{item.icon}</span>
                  <p>{item.reward}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="content">
            <h3>User Profile</h3>
            <label>Name:</label>
            <input name="name" value={profileData.name || ''} onChange={handleProfileChange} />
            <label>Email:</label>
            <input name="email" value={profileData.email || ''} onChange={handleProfileChange} />
            <label>Phone:</label>
            <input name="phone" value={profileData.phone || ''} onChange={handleProfileChange} />
            <label>Gender:</label>
            <input name="Gender" value={profileData.gender || ''} onChange={handleProfileChange} />
            <label>Date of Birth:</label>
            <input name="DOB" value={profileData.dob || ''} onChange={handleProfileChange} />
            <button onClick={handleProfileSave}>Save</button>
          </div>
        );

      case 'messages':
        return (
          <div className="content">
            <h2>📩 Your Messages</h2>
            {messages.length === 0 ? (
              <p>No messages yet.</p>
            ) : (
              <ul>
                {messages.map((msg, idx) => (
                  <li
                    key={idx}
                    style={{
                      background: msg.read ? '#f0f0f0' : '#fff',
                      padding: '10px',
                      border: '1px solid #ccc',
                      marginBottom: '8px',
                    }}
                  >
                    <strong>{msg.title}</strong>
                    <p>{msg.content}</p>
                    <small>{new Date(msg.timestamp).toLocaleString()}</small>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      case 'myjobs':
        return <div className="content">My Posted Jobs</div>;

      case 'help':
  return (
    <div className="content px-4 py-6 max-w-xl mx-auto text-gray-800">
      <h2 className="text-2xl font-bold mb-4 text-primary">Help & Support</h2>
      
      <p className="mb-3">
        Welcome to <strong>OrizonPlus Support</strong>.
      </p>

      <p className="mb-3">
        Having trouble signing in, posting a job, or applying for one? Just reach out — we’re happy to help!
      </p>

      <p className="mb-2">
        🧑‍💼 <strong>For Job Seekers:</strong>  
        <br />
        Email us at <a href="mailto:support-seeker@orizonplus.site" className="text-blue-600 underline">support-seeker@orizonplus.site</a>
        <br />
        For questions related to profiles, applications, and job alerts.
      </p>

      <p className="mb-2">
        🧑‍💻 <strong>For Job Providers:</strong>  
        <br />
        Email us at <a href="mailto:support-provider@orizonplus.site" className="text-blue-600 underline">support-provider@orizonplus.site</a>
        <br />
        For help with job posting, managing applicants, or verification.
      </p>

      <p className="mt-4">
        💬 For general inquiries or technical issues, contact us at:  
        <br />
        <a href="mailto:help@orizonplus.site" className="text-blue-600 underline">help@orizonplus.site</a>
      </p>

      <p className="mt-4 text-sm text-gray-500">
        We usually respond within 24 hours. For urgent support, mention "URGENT" in your email subject.
      </p>
    </div>
  );

      case 'reviews':
        const sampleReviews = [
          {
            reviewer: 'Sravan Kumar',
            rating: 5,
            comment: 'Great experience working with this provider!',
            date: '2024-04-10',
          },
          {
            reviewer: 'Prasad Rao',
            rating: 4,
            comment: 'Work completed successfully, good communication.',
            date: '2024-03-28',
          },
        ];
        return (
          <div className="content">
            <h3>Reviews & Ratings</h3>
            <p>Currently logged in as: <strong>{userName}</strong> (User ID: {userId})</p>
            <div className="reviews-list">
              {sampleReviews.map((review, index) => (
                <div key={index} className="review-card">
                  <h4>{review.reviewer}</h4>
                  <p>⭐ {review.rating} Stars</p>
                  <p>{review.comment}</p>
                  <small>{review.date}</small>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return <div className="content">Welcome!</div>;
    }
  };

  return (
    <div className="dashboard-container">
      <header className="topbar">
        <div className="left">
          <FiUser className="icon" />
          <span>Hello, {userName}!</span>
        </div>
        <nav className="top-menu">
          <button onClick={() => setActiveSection('home')}>Home</button>
          <button onClick={handleClickMessages} style={{ position: 'relative' }}>
        <FiMessageCircle className="icon" />
        Messages
        {unreadCount > 0 && (
          <span style={{
            position: 'absolute',
            top: '-5px',
            right: '-5px',
            background: 'red',
            color: 'white',
            borderRadius: '50%',
            padding: '2px 6px',
            fontSize: '12px',
          }}>
            {unreadCount}
          </span>
        )}
      </button>
       <button onClick={() => setActiveSection('help')}>Help</button>
        </nav>
        <div className="right">
          <button className="logout-btn" onClick={handleLogout}>
            <FiLogOut className="icon" /> Logout
          </button>
        </div>
      </header>
      <main className="main-content">{renderSection()}</main>
    </div>
  );
};

export default Dashboard;
