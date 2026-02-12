const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendInterviewEmail = (toEmail, companyName, role, when) => {
  const dayText = when === "today" ? "today" : "tomorrow";

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: `Interview Reminder: ${role} at ${companyName}`,
    text: `Hello,

You have an interview for the ${role} role at ${companyName} ${dayText}.  

All the best for your interview! 💼✨  

Thank you,  
JobOfferTracker Team`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log(`Email sent to ${toEmail} for interview ${dayText}:`, info.response);
    }
  });
};

module.exports = sendInterviewEmail;
