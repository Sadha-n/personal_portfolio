const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post('/register', async (req, res) => {
  const { email, name, usn } = req.body;

  console.log('Form data received:', req.body); // For debugging

  // Setup transporter using your Gmail account
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nsadha92@gmail.com',     // ✅ Replace with your Gmail
      pass: 'jcmt vhta jbtp juwc'              // ✅ Replace with your App Password (NOT your Gmail password)
    }
  });

  const mailOptions = {
    from: 'nsadha92@gmail.com',       // ✅ Same Gmail as above
    to: email,
    subject: 'Registration Confirmation',
    text: `Hello ${name},\n\nYou have successfully registered with USN ${usn}.\n\nThank you!`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send('✅ Registration email sent!');
  } catch (error) {
    console.error('❌ Email sending error:', error);
    res.status(500).send('❌ Failed to send email.');
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
