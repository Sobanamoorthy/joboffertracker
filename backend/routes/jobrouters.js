const express = require('express');
const router = express.Router();
const Job = require('../models/job');
const User = require('../models/user'); // Make sure path is correct
const authMiddleware = require('../middleware/authmiddleware');
const sendInterviewEmail = require('../utils/mailer');

// Helper to calculate counts for a user
const calculateCounts = (jobs) => {
  const counts = { total: 0, applied: 0, interview: 0, selected: 0, rejected: 0 };
  counts.total = jobs.length;

  jobs.forEach(job => {
    const status = job.status.toLowerCase();
    if (status === 'applied') counts.applied++;
    else if (status === 'interview') counts.interview++;
    else if (status === 'selected') counts.selected++;
    else if (status === 'rejected') counts.rejected++;
  });

  return counts;
};



// ✅ GET all jobs for logged-in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const jobs = await Job.find({ userId: req.userId }).sort({ createdAt: -1 });
    const counts = calculateCounts(jobs);

    res.json({ jobs, counts });
  } catch (err) {
    console.error('Error fetching jobs:', err);
    res.status(500).json({ message: 'Error fetching jobs' });
  }
});



// ✅ ADD new job
router.post('/', authMiddleware, async (req, res) => {
  const { companyName, role, interviewDate, status } = req.body;

  try {
    const newJob = new Job({
      companyName,
      role,
      interviewDate,
      status,
      userId: req.userId
    });

    await newJob.save();

    // 🔥 SEND EMAIL ONLY IF STATUS IS "interview"
    if (status && status.toLowerCase() === "interview" && interviewDate) {

      // Get logged-in user's email
      const user = await User.findById(req.userId);

      if (user && user.email) {
        const today = new Date();
        const jobDate = new Date(interviewDate);

        const diffDays = Math.ceil(
          (jobDate - today) / (1000 * 60 * 60 * 24)
        );

        let when = "tomorrow";
        if (diffDays === 0) when = "today";

        sendInterviewEmail(user.email, companyName, role, when);
      }
    }

    const jobs = await Job.find({ userId: req.userId }).sort({ createdAt: -1 });
    const counts = calculateCounts(jobs);

    res.status(201).json({ jobs, counts });

  } catch (err) {
    console.error('Error adding job:', err);
    res.status(500).json({ message: 'Error adding job' });
  }
});



// ✅ DELETE job
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const job = await Job.findOne({ _id: req.params.id, userId: req.userId });

    if (!job)
      return res.status(404).json({ message: 'Job not found or unauthorized' });

    await job.deleteOne();

    const jobs = await Job.find({ userId: req.userId }).sort({ createdAt: -1 });
    const counts = calculateCounts(jobs);

    res.json({ jobs, counts });

  } catch (err) {
    console.error('Error deleting job:', err);
    res.status(500).json({ message: 'Error deleting job' });
  }
});



module.exports = router;
