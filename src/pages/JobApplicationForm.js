import { useState } from 'react';

const ApplyJobComponent = ({ selectedJob }) => {
  const [showLetter, setShowLetter] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const seeker = JSON.parse(localStorage.getItem('user'));

  const handleSubmitApplication = () => {
    try {
      localStorage.setItem('selectedJob', JSON.stringify(selectedJob));

      // Simulate notification
      const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
      notifications.push({
        type: 'application',
        jobTitle: selectedJob.title,
        from: seeker.name,
        date: new Date().toISOString()
      });
      localStorage.setItem('notifications', JSON.stringify(notifications));

      alert('Application sent successfully!');
      setShowLetter(true); // Display the letter in the same page
    } catch (err) {
      console.error(err);
      alert('Application failed. Try again.');
    }
  };

  return (
    <div>
      {/* Application Form */}
      <button onClick={handleSubmitApplication}>Submit Application</button>

      {/* Show PDF-style letter after submission */}
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
            <p><strong>To:</strong> {selectedJob?.providerName} (Job Provider)</p>
            <p><strong>From:</strong> {seeker?.name} (Job Seeker)</p>
            <p>
              Dear {selectedJob?.providerName},
            </p>
            <p>
              I, <strong>{seeker?.name}</strong>, am applying for the part-time job titled <strong>“{selectedJob?.title}”</strong>. I agree to the fixed payment of <strong>₹{selectedJob?.payment}</strong> for the entire task, without any scope for negotiation or bargaining.
            </p>
            <p>
              This letter acts as an official confirmation of acceptance. Upon successful completion of the task, I expect timely payment.
            </p>
            <p>Thank you for the opportunity.</p>

            <p>
              Regards,<br />
              <strong>{seeker?.name}</strong><br />
              Phone: {seeker?.phone}<br />
              Location: {seeker?.location}
            </p>
          </div>

          <div className="role-buttons-2col">
            <button className="role-btn" onClick={() => window.location.href = '/browse-jobs'}>
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
