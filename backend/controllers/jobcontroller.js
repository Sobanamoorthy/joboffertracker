exports.getAllJobs = async (req, res) => {
  try {
    // Filter jobs by userId from auth middleware
    const jobs = await Job.find({ userId: req.userId });
    
    // Calculate counts for dashboard
    const counts = {
      applied: jobs.filter(job => job.status === 'Applied').length,
      interview: jobs.filter(job => job.status === 'Interview').length,
      selected: jobs.filter(job => job.status === 'Selected').length,
      rejected: jobs.filter(job => job.status === 'Rejected').length,
      total: jobs.length
    };
    
    // Send response with both jobs and counts
    res.json({
      jobs: jobs,
      counts: counts // Make sure this matches frontend expectation
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};