// src/pages/Dashboard.js
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Jobform from '../components/Jobform';
import Joblist from '../components/Joblist';
import './dashboard.css'; // Importing the CSS file

function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [counts, setCounts] = useState({
    total: 0,
    applied: 0,
    interview: 0,
    selected: 0,
    rejected: 0,
  });

  const navigate = useNavigate();

  // Fetch jobs from backend
  const fetchJobs = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return navigate('/login');

      const response = await axios.get('http://localhost:5000/api/jobs', {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log('Fetched jobs:', response.data); // Debug log

      // Ensure backend returns { jobs, counts }
      setJobs(response.data.jobs || []);
      setCounts(response.data.counts || {
        total: 0,
        applied: 0,
        interview: 0,
        selected: 0,
        rejected: 0,
      });
    } catch (error) {
      console.error('Error fetching jobs:', error); //
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    }
  }, [navigate]);

  // Load jobs on mount
  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  // Add a new job
  const handleAddJob = async (jobData) => {
    try {
      const token = localStorage.getItem('token');

      // Do NOT send userId from frontend; backend sets it automatically
      const payload = {
        companyName: jobData.companyName,
        role: jobData.role,
        interviewDate: jobData.interviewDate,
        status: jobData.status,
      };

      await axios.post('http://localhost:5000/api/jobs', payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Re-fetch jobs after successful POST
      fetchJobs();
    } catch (error) {
      console.error('Error adding job:', error); //
      alert('Failed to add job');
    }
  };

  // Delete a job
  const handleDeleteJob = async (jobId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/jobs/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Re-fetch jobs after deletion
      fetchJobs();
    } catch (error) {
      console.error('Error deleting job:', error); //
      alert('Failed to delete job');
    }
  };

  return (
    <div className="dashboard-page">
      <h1>Your Job Dashboard</h1>

      {/*  */}
      <div className="stats">
        <div>Total Jobs: {counts?.total || 0}</div>
        <div>Applied: {counts?.applied || 0}</div>
        <div>Interview: {counts?.interview || 0}</div>
        <div>Selected: {counts?.selected || 0}</div>
        <div>Rejected: {counts?.rejected || 0}</div>
      </div>

      <div className="job-section">
        <Jobform onAddJob={handleAddJob} />
        <Joblist jobs={jobs} onDelete={handleDeleteJob} />
      </div>
    </div>
  );
}

export default Dashboard;