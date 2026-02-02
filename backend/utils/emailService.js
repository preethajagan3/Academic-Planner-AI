const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, text, html) => {
    try {
        const data = await resend.emails.send({
            from: 'Academic Planner <onboarding@resend.dev>',
            to: [to],
            subject: subject,
            text: text,
            html: html,
        });

        console.log("Email sent successfully via Resend:", data.id);
        return data;
    } catch (error) {
        console.error("Error sending email via Resend:", error);
        throw error;
    }
};

module.exports = sendEmail;

