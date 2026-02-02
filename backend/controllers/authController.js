const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/emailService");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!password || password.length <= 4) {
    return res.status(400).json({ message: "Password must be more than 4 characters" });
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });

  // Send Welcome Email
  try {
    await sendEmail(
      email,
      "Welcome to Academic Planner AI!",
      `Hi ${name}, welcome to your new academic companion!`,
      `<h3>Welcome ${name}!</h3><p>We're excited to help you manage your studies with AI.</p>`
    );
  } catch (err) {
    console.error("Welcome email failed:", err);
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  const userData = user.toObject();
  delete userData.password;

  res.json({ token, user: userData });
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(`Login attempt for: ${email}`);

    const user = await User.findOne({ email });

    if (!user) {
      console.log(`User not found: ${email}`);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log(`Invalid password for: ${email}`);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // Return token and user data (without password)
    const userData = user.toObject();
    delete userData.password;

    console.log(`Successful login for: ${email}`);
    res.json({
      token,
      user: userData
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error during login", error: error.message });
  }
};
