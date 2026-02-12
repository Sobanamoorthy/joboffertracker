const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("🔗 Connecting to MongoDB...");

    const uri = process.env.MONGO_URI;

    await mongoose.connect(uri);

    console.log("✅ MongoDB connected successfully");
    console.log("📊 Database:", mongoose.connection.db.databaseName);

  } catch (error) {
    console.error("❌ MongoDB connection failed!");
    console.error("Error details:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
