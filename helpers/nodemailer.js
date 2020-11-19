require('dotenv').config()
const nodemailer = require("nodemailer")

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    }
})

const sendMail = (destEmail, payload) => {
    let mailOptions =  {
        from: '"Storepedia" <mail.akbarhabiby@gmail.com>',
        to: destEmail,
        subject: '',
        html: '',
    }

    if (payload.registration) {
        mailOptions.subject = payload.registration.subject,
        mailOptions.html = `
        <h1>Hello ${destEmail} !</h1>
        <br>
        <p>You are successfully registered on Storepedia</p>
        <p>Please login at https://storepedia-akbarhabiby.web.app/login</p>
        <br>
        <h3>Thank You!</h3>
        `
    } else if (payload.checkout) {
        mailOptions.subject = payload.checkout.subject
        mailOptions.html = `
            <h1>Hi ${payload.email}</h1>
            <h2>Here is your detail transaction</h2>
            <ul>
                ${payload.checkout.items.join('\n')}
            </ul>
            <br>
            <h3>Thank You!</h3>
        `
    }
    
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) console.log(err)
        console.log('Email sent to ' + destEmail)
    })
}

module.exports = sendMail