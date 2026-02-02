const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables FIRST
dotenv.config();

// Import DB connection
const connectDB = require("./config/db");

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Initialize Cron Jobs
const scheduleDeadlinesCheck = require("./utils/cronJobs");
scheduleDeadlinesCheck();

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/timetable", require("./routes/timetableRoutes"));
app.use("/api/progress", require("./routes/progressRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/chat", require("./routes/chatRoutes"));
app.use("/api/notifications", require("./routes/notificationRoutes"));

// Test Email Route
app.get("/api/test-email", async (req, res) => {
  const sendEmail = require("./utils/emailService");
  try {
    // Attempt to send to the developer email (or allow query param)
    const email = req.query.email || "preethavjjagan@gmail.com";

    const result = await sendEmail(
      email,
      "Test Email from Planner",
      "This is a test to verify your Resend integration works on Render.",
      "<h1>It Works!</h1><p>Your email service is correctly configured.</p>"
    );
    res.json({ success: true, message: "Email sent", data: result });
  } catch (error) {
    console.error("Test Email Failed:", error);
    res.status(500).json({ success: false, error: error.message, details: error.response?.data });
  }
});

// Root test route (optional but useful)
app.get("/", (req, res) => {
  res.send("Academic Planner API is running");
});

// Export app for Vercel
module.exports = app;

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
