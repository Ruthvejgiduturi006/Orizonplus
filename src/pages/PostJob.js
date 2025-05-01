import React, { useState } from 'react';
import { postJob } from '../services/jobService';

const PostJob = () => {
  const [job, setJob] = useState({ title: '', description: '', location: '' });

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postJob(job);
    alert('Job Posted Successfully');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4">Post a Job</h2>
        <input name="title" placeholder="Job Title" onChange={handleChange} className="w-full p-2 mb-4 border rounded" required />
        <input name="location" placeholder="Location" onChange={handleChange} className="w-full p-2 mb-4 border rounded" required />
        <textarea name="description" placeholder="Description" onChange={handleChange} className="w-full p-2 mb-4 border rounded" required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 w-full rounded">Post Job</button>
      </form>
    </div>
  );
};

export default PostJob