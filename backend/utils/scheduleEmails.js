const schedule = require("node-schedule");
const sendInterviewEmail = require("./mailer");
const Job = require("../models/job");
const User = require("../models/user");

const scheduleInterviewEmails = () => {

  console.log("✅ Scheduler Started Successfully");

  // Run every 1 minute for testing
  schedule.scheduleJob("0 8 * * *", async () => {

    console.log("⏰ Checking today's interviews...");

    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      const dayAfterTomorrow = new Date(tomorrow);
      dayAfterTomorrow.setDate(tomorrow.getDate() + 1);

      const jobs = await Job.find({
        interviewDate: {
          $gte: today,
          $lt: dayAfterTomorrow
        }
      });

      console.log("📌 Jobs found:", jobs.length);

      for (let job of jobs) {

        const interviewDate = new Date(job.interviewDate);
        interviewDate.setHours(0,0,0,0);

        let when = null;

        if (interviewDate.getTime() === today.getTime()) {
          when = "today";
        } else if (interviewDate.getTime() === tomorrow.getTime()) {
          when = "tomorrow";
        }

        if (when) {

          const user = await User.findById(job.userId);

          if (user && user.email) {

            console.log("📧 Sending email to:", user.email);

            await sendInterviewEmail(
              user.email,
              job.company,
              job.role,
              when
            );
          }
        }
      }

    } catch (error) {
      console.log("❌ Error checking interviews:", error);
    }

  });
};

module.exports = scheduleInterviewEmails;
