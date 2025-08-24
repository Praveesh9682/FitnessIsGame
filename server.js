const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Serve all files in the current folder as static (CSS, JS, images, HTML)
app.use(express.static(__dirname));

// Serve home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// API endpoint for contact form
app.post('/send', (req, res) => {
  const { user_name, user_email, message } = req.body;

  if (!user_name || !user_email || !message) {
    return res.status(400).send('All fields are required');
  }

  // Create transporter using Gmail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'praveeshbkt1999@gmail.com', // Replace with your email
      pass: 'lxpl oxey zrcv wgvh'   // Replace with App Password if using Gmail 2FA
    }
  });

  const mailOptions = {
    from: user_email,               // Sender (user)
    to: 'praveeshbkt1999@gmail.com', // Receiver (your email)
    subject: `Message from ${user_name}`,
    text: `Name: ${user_name}\nEmail: ${user_email}\nMessage: ${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).send('Error sending email');
    }
    console.log('Email sent: ' + info.response);
    res.send('Email sent successfully!');
  });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
