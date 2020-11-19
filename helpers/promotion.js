const { User } = require('../models/')
const nodemailer = require('nodemailer')

// * Next time will be changed to Quotes API
const promotions = [
  {
    quotes: 'Today, take the time to be outside, slow down and enjoy this day'
  },
  {
    quotes: 'The secret of your future is hidden in your daily routine'
  },
  {
    quotes: 'The purpose of art is washing the dust of daily life off our souls'
  },
  {
    quotes: 'You have to really use your imagination to refresh your daily life'
  },
  {
    quotes: 'The secret of your success is determined by your daily agenda'
  },
  {
    quotes: 'The sky is the daily bread of the eyes'
  }
]

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  }
})

const sendPromotionEmail = async () => {
  let quotes = promotions[Math.floor(Math.random() * promotions.length)].quotes
  const users = await User.findAll({
    where: {
      role: 'customer'
    }
  })
  let email = ''

  users.forEach(user => {
    email += `${user.email},`
  })

  let mailOptions =  {
    from: '"Storepedia" <mail.akbarhabiby@gmail.com>',
    to: email,
    subject: 'Good Morning! Storepers!',
    html: `
      <h1>${quotes}</h1>
      <h2>Already check our store today?</h2>
      <p>If not, let's find our new product at https://storepedia-akbarhabiby.web.app</p>
      <br>
      <h3>Thank You!</h3>
    `
  }

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) console.log(err)
    console.log('Email sent to ' + email)
  })
}

module.exports = sendPromotionEmail