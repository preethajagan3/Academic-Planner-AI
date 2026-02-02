const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const sendEmail = require('./utils/emailService');
require('dotenv').config();

const testMail = async () => {
    try {
        console.log("Attempting to send test email to:", process.env.EMAIL_USER);
        await sendEmail(
            process.env.EMAIL_USER,
            "Test Email from Academic Planner",
            "This is a manual test to verify the email service is working.",
            "<h3>Manual Test</h3><p>The email service is functional.</p>"
        );
        console.log("Test email sent successfully.");
        process.exit(0);
    } catch (err) {
        console.error("Manual test failed:", err);
        process.exit(1);
    }
};

testMail();
