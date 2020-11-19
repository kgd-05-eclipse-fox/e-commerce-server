const { User } = require('../models')
const { compare } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt')
const transporter = require('../helpers/nodemailer')

class UserController {
	static async register(req, res, next) {
		try {
			const { email, password, role } = req.body
			const register = await User.create({email,password,role})
			res.status(201).json({
				id: register.id,
				email: register.email,
				role: register.role
			})
			let mailOptions = {
				from: process.env.NODEMAILER,
				to: email,
				subject: `Among Us Store - Thank you for Register!`,
				text: `Hi ${email}, thank you for Register!`,
				html: `<h1>Happy Shopping!</h1><br><a href="https://store-among-us.web.app">Click Here to continue Shopping</a>`
			}
			transporter.sendMail(mailOptions, (err, info) => {
					if (err) throw err;
					console.log('Email sent: ' + info.response);
			});
		} catch (err) {
			next(err)
		}
	}

	static async login(req, res, next) {
		try {
			const { email, password } = req.body
			if (!email || !password) {
				res.status(401).json({error: 'Please fill up all the fields'})
			} else {
				const findUser = await User.findOne({
					where: {
						email
					}
				})
				if (!findUser) {
					res.status(401).json({ error: 'Wrong Email or Password' })
				} else if (!compare(password.toString(), findUser.password)) {
					res.status(401).json({ error: 'Wrong Email or Password' })
				} else {
					const token = createToken({
						id: findUser.id,
						email: findUser.email,
						role: findUser.role
					})
					res.status(200).json({ token })
				}
			}
		} catch (err) {
			next(err)
		}
	}
				
}

module.exports = UserController