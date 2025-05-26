import { useState, useEffect } from 'react';

const ApplyJobComponent = ({ selectedJob }) => {
  const [showLetter, setShowLetter] = useState(false);
  const [jobProviderDetails, setJobProviderDetails] = useState(null);
  const seeker = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!seeker) {
      alert('User details are missing. Please log in again.');
      return;
    }

    // Fetch job provider details using selectedJob.userId
    const fetchJobProviderDetails = async () => {
      try {
        const response = await fetch(`/api/users/${selectedJob.userId}`);
        if (!response.ok) throw new Error('Failed to fetch provider details');
        const data = await response.json();
        setJobProviderDetails(data);
      } catch (error) {
        console.error('Error fetching job provider details:', error);
      }
    };

    if (selectedJob?.userId) {
      fetchJobProviderDetails();
    }
  }, [selectedJob, seeker]);

  const handleSubmitApplication = () => {
    try {
      localStorage.setItem('selectedJob', JSON.stringify(selectedJob));

      const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
      notifications.push({
        type: 'application',
        jobTitle: selectedJob.title,
        from: seeker.name,
        date: new Date().toISOString()
      });
      localStorage.setItem('notifications', JSON.stringify(notifications));

      alert('Application sent successfully!');
      setShowLetter(true);
    } catch (err) {
      console.error(err);
      alert('Application failed. Try again.');
    }
  };

  // Job and provider fallback info
  const jobTitle = selectedJob?.title || "Job Title not available";
  const payment = selectedJob?.payment || "Not specified";
  const jobLocation = selectedJob?.location || "Not Available";
  const jobShift = selectedJob?.shift || "Not Available";
  const jobDescription = selectedJob?.description || "Not Available";
  const jobLastDate = selectedJob?.lastDate || "Not Available";

  const providerName = jobProviderDetails?.name || "Not Available";
  const providerEmail = jobProviderDetails?.email || "Not Available";
  const providerPhone = jobProviderDetails?.phone || "Not Available";
  const providerLocation = jobProviderDetails?.location || "Not Available";

  return (
    <div>
      <button onClick={handleSubmitApplication}>Submit Application</button>

      {showLetter && (
        <div className="glass-card dashboard-card" style={{ marginTop: '2rem' }}>
          <div className="dashboard-header">
            <div className="dashboard-user-info">
              <span className="icon">👤</span> <span>{seeker?.name}</span>
            </div>
            <div className="dashboard-actions">
              <span className="icon">🔔</span>
              <span className="icon logout-icon">🚪</span>
            </div>
          </div>

          <h2 className="text-center">🎉 Application Submitted</h2>

          <div className="info-box">
            This is a fixed price job. No bargaining is allowed. Below is your proof letter.
          </div>

          <div className="letter">
            <p><strong>Date:</strong> {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            <p><strong>To:</strong> {providerName} (Job Provider)</p>
            <p><strong>From:</strong> {seeker?.name} (Job Seeker)</p>
            <p>Dear {providerName},</p>
            <p>
              I, <strong>{seeker?.name}</strong>, am applying for the part-time job titled <strong>“{jobTitle}”</strong>. I agree to the fixed payment of <strong>₹{payment}</strong> for the entire task, without any scope for negotiation or bargaining.
            </p>
            <p>
              This letter acts as an official confirmation of acceptance. Upon successful completion of the task, I expect timely payment.
            </p>
            <p>Thank you for the opportunity.</p>

            <p>
              Regards,<br />
              <strong>{seeker?.name}</strong><br />
              Phone: {seeker?.phone || 'Not Available'}<br />
              Location: {seeker?.location || 'Not Available'}
            </p>

            <h3>Job Details:</h3>
            <ul>
              <li><strong>Job Title:</strong> {jobTitle}</li>
              <li><strong>Location:</strong> {jobLocation}</li>
              <li><strong>Shift:</strong> {jobShift}</li>
              <li><strong>Last Date:</strong> {jobLastDate}</li>
              <li><strong>Pay:</strong> ₹{payment}/Day</li>
              <li><strong>Description:</strong> {jobDescription}</li>
            </ul>

            <h3>Job Provider Details:</h3>
            <ul>
              <li><strong>Name:</strong> {providerName}</li>
              <li><strong>Email:</strong> {providerEmail}</li>
              <li><strong>Phone:</strong> {providerPhone}</li>
              <li><strong>Location:</strong> {providerLocation}</li>
            </ul>

            <h3>Job Seeker Details:</h3>
            <ul>
              <li><strong>Name:</strong> {seeker?.name}</li>
              <li><strong>Email:</strong> {seeker?.email}</li>
              <li><strong>Phone:</strong> {seeker?.phone}</li>
              <li><strong>Location:</strong> {seeker?.location || 'Not Available'}</li>
            </ul>
          </div>

          <div className="role-buttons-2col">
            <button className="role-btn" onClick={() => window.location.href = '/BrowseJobs'}>
              ← Back to Jobs<br /><span>Return to job listings</span>
            </button>
            <button className="role-btn" onClick={() => window.print()}>
              🖨 Print Proof<br /><span>Download/Print this letter</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplyJobComponent;
