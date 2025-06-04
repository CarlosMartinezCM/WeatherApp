// api/send-email.js
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Only POST requests allowed");

  const { name, email, message } = req.body;

  // Create transporter using SMTP (e.g., Gmail, SendGrid, etc.)
  const transporter = nodemailer.createTransport({
    service: "Gmail", // or SendGrid, Outlook, etc.
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_TO,
      subject: `Contact Form Message from ${name}`,
      text: message,
    });

    res.status(200).json({ message: "Email sent" });
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).json({ error: "Email failed to send" });
  }
}
