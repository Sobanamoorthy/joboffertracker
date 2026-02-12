import React from 'react';

function Joblist({ jobs, onDelete }) {
  if (!Array.isArray(jobs) || jobs.length === 0) {
    return <p>No job applications yet. Add your first one!</p>;
  }

  return (
    <div className="job-list">
      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Role</th>
            <th>Interview Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job, index) => (
            <tr key={job?._id || index}>
              <td>{job?.companyName || 'N/A'}</td>
              <td>{job?.role || 'N/A'}</td>
              <td>{job?.interviewDate ? new Date(job.interviewDate).toLocaleDateString() : 'N/A'}</td>
              <td className={`status-${job?.status?.toLowerCase() || 'applied'}`}>
                {job?.status || 'Applied'}
              </td>
              <td>
                <button
                  onClick={() => job?._id && onDelete(job._id)}
                  title="Delete"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Joblist;
