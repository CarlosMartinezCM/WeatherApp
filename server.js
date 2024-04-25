import fetch from 'node-fetch';
const express = require('express');
const cors = require('cors');
var fetch = require('node-fetch');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path'); // Import path module

const app = express();
const PORT = process.env.HTTP_PORT || 8081;

app.use(cors());
app.use(express.static(path.join(__dirname, 'client', 'build')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/images', async (req, res) => {
    try {
        const response = await fetch('https://services.swpc.noaa.gov/images/animations/suvi/primary/304/');
        const html = await response.text();
        const filenames = html.match(/or_suvi-l2-ci304_g16_s[\d]+T[\d]+Z_e[\d]+T[\d]+Z_v1-0-1\.png/g) || [];
        res.json({ filenames });
    } catch (error) {
        console.error('Error fetching image filenames:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/contact', (req, res) => {
    const { name, email, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'your_email@gmail.com',
            pass: 'your_email_password'
        }
    });

    const mailOptions = {
        from: email,
        to: 'your_email@gmail.com',
        subject: subject,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}.`);
});
