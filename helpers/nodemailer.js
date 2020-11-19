const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'shopii.h8@gmail.com',
    pass: process.env.EMAIL_PASS
  }
})

const sendMail = payload => {
  const { recipient, subject, html } = payload
  const mailOptions = {
    from: 'shopii.h8@gmail.com',
    to: recipient,
    subject: subject,
    html: html
  }

  transporter.sendMail(mailOptions, function(err, info) {
    if (err) {
      console.log(err)
    } else {
      console.log(`email sent ${info.response}`)
    }
  })
}


module.exports = sendMail