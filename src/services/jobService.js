// client/src/services/jobService.js

import axios from 'axios';

const API = 'http://localhost:5000/api/jobs';

export const createJob = async (jobData) => {
  const res = await axios.post(API, jobData);
  return res.data;
};

export const getAllJobs = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const getJobById = async (id) => {
  const res = await axios.get(`${API}/${id}`);
  return res.data;
};

export const applyToJob = async (jobId, userId) => {
  const res = await axios.post(`${API}/${jobId}/apply`, { userId });
  return res.data;
};
