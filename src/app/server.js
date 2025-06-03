const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");

require('dotenv').config(); 

const app = express();

app.use(cors());
app.use(express.json());
app.use("/", router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));

const GMAIL_USER = process.env.EMAIL_USER;
const GMAIL_PASS = process.env.EMAIL_PASS;
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL;

if (!GMAIL_USER || !GMAIL_PASS || !RECIPIENT_EMAIL) {
  console.error("ERROR: Missing one or more email credentials in .env file (EMAIL_USER, EMAIL_PASS, RECIPIENT_EMAIL)");
  console.error("Please ensure your .env file is correctly set up.");

} else {
  console.log("Email credentials loaded from .env file.");
}

const contactEmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS, 
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.error("Nodemailer transporter error:", error);
    console.error("Nodemailer setup failed. Emails will not be sent. Check credentials (EMAIL_USER, EMAIL_PASS in .env) and Gmail settings (e.g., App Password).");
  } else {
    console.log("Nodemailer is Ready to Send Emails");
  }
});

router.post("/contact", (req, res) => {
  const { fullName, email, phone, message } = req.body;

  if (!fullName || !email || !message) {
    return res.status(400).json({ code: 400, status: "Missing required fields (fullName, email, message)." });
  }

  if (!RECIPIENT_EMAIL) {
    console.error("RECIPIENT_EMAIL is not configured. Cannot send email.");
    return res.status(500).json({ code: 500, status: "Server configuration error: Recipient email not set." });
  }

  if (!GMAIL_USER) {
    console.error("GMAIL_USER is not configured. Cannot send email.");
    return res.status(500).json({ code: 500, status: "Server configuration error: Sender email not set." });
  }

  const mail = {
    from: `"${fullName}" <${GMAIL_USER}>`, 
    replyTo: email,
    to: RECIPIENT_EMAIL,
    subject: `Contact Form Submission from ${fullName} - Portfolio`,
    html: `
      <p>You have a new contact form submission:</p>
      <hr>
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
      <hr>
    `,
    text: `
      Name: ${fullName}\n
      Email: ${email}\n
      Phone: ${phone || 'Not provided'}\n
      Message: ${message}
    ` 
  };

  contactEmail.sendMail(mail, (error) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ code: 500, status: "Message failed to send due to a server error." });
    } else {
      console.log(`Email sent successfully from ${fullName} <${email}> to ${RECIPIENT_EMAIL}`);
      res.status(200).json({ code: 200, status: "Message Sent" });
    }
  });
});
