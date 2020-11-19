let nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NODEMAILER,
        pass: process.env.MAILERPWD
    }
});

module.exports = transporter