// server.js
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

// Import scheduler
const scheduleInterviewEmails = require("./utils/scheduleEmails");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// Routes
app.use("/api/users", require("./routes/userrouter"));
app.use("/api/jobs", require("./routes/jobrouters"));

// Schedule daily email reminders for interviews
scheduleInterviewEmails();

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to JobOfferTracker API!");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
