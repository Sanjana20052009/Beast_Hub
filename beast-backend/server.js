const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test Route
app.get('/', (req, res) => {
    res.send('Beast Hub Backend is running successfully!');
});

// Form Submission Endpoint
app.post('/api/submit-challenge', async (req, res) => {
    const { name, email, category, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ success: false, error: 'All required fields must be filled.' });
    }

    console.log('📥 New Submission Received:', { name, email, category, message });

    // Optional: Send email via Nodemailer if credentials are set in .env
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        try {
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });

            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: process.env.EMAIL_USER, // sends to yourself
                subject: `New Challenge Idea from ${name} (${category})`,
                text: `Name: ${name}\nEmail: ${email}\nCategory: ${category}\n\nDescription:\n${message}`
            });
        } catch (error) {
            console.error('Email sending error:', error);
        }
    }

    res.status(200).json({ success: true, message: 'Challenge proposal received by custom server!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});