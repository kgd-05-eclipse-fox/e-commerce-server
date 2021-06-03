const nodemailer = require("nodemailer")
const dotenv = require('dotenv')

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL, // generated ethereal user
    pass: process.env.EMAIL_PASSWORD, // generated ethereal password
  },
});

async function sendMail(userEmail){
  console.log(process.env.EMAIL)
  let info = await transporter.sendMail({
    from: '"consini.outdoor@gmail.com', // sender address
    to: userEmail, // list of receivers
    subject: "Registration Complete", // Subject line
    html: `
    <h1>Thank you for registering at Consini Outdoor<h1>
    <p>Please visit us at https://consini-outdoor.web.app</p>`
  });
}

module.exports = sendMail

