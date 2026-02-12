// src/components/Jobform.js
import React, { useState } from 'react';

function Jobform({ onAddJob }) {
  const [companyName, setCompanyName] = useState('');
  const [role, setRole] = useState('');
  const [interviewDate, setInterviewDate] = useState('');
  const [status, setStatus] = useState('Applied');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!companyName || !role || !interviewDate || !status) {
      alert('Please fill all fields');
      return;
    }

    onAddJob({ companyName, role, interviewDate, status });

    // Reset form
    setCompanyName('');
    setRole('');
    setInterviewDate('');
    setStatus('Applied');
  };

  return (
    <form className="job-form" onSubmit={handleSubmit}>
      <label htmlFor="companyName">Company Name</label>
      <input
        type="text"
        id="companyName"
        name="companyName"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        required
      />

      <label htmlFor="role">Role</label>
      <input
        type="text"
        id="role"
        name="role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        required
      />

      <label htmlFor="interviewDate">Interview Date</label>
      <input
        type="date"
        id="interviewDate"
        name="interviewDate"
        value={interviewDate}
        onChange={(e) => setInterviewDate(e.target.value)}
        required
      />

      <label htmlFor="status">Status</label>
      <select
        id="status"
        name="status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        required
      >
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Selected">Selected</option>
        <option value="Rejected">Rejected</option>
      </select>

      <button type="submit">Add Job</button>
    </form>
  );
}

export default Jobform;
