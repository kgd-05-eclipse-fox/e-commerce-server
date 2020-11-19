const { User } = require('../models')
const createError = require('http-errors')
const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')

module.exports = class UserController {
	static register(req, res, next) {
		const { role, email, password } = req.body
		User.findOne({ where: { email: email } })
			.then((data) => {
				if (data) {
					next(createError(400, 'Email already registered'))
				} else {
					return User.create({ email, password, role })
				}
			})
			.then((data) => {
				const access_token = signToken({
					id: data.id,
					email: data.email,
				})
				res.status(201).json({ access_token })
			})
			.catch(next)
	}

	static loginAdmin(req, res, next) {
		const { email, password } = req.body
		User.findOne({
			where: {
				email: email,
			},
		})
			.then((user) => {
				if (user && comparePassword(password, user.password)) {
					let dataUser = {
						id: user.id,
						email: user.email,
						role: user.role,
					}
					let access_token = signToken(dataUser)
					res.status(200).json({ access_token })
				} else {
					next(createError(400, 'invalid email or password'))
				}
			})
			.catch(next)
	}

	static async login(req, res, next) {
		const inputPass = req.body.password
		try {
				const user = await User.findOne({ where: {email: req.body.email} })
				const dbPass = user ? user.password : ''
				if(!user) {
						next({
								name: 'ValidationError',
								errors: 'invalid username or password'
						})
				} else if (!comparePassword(inputPass, dbPass)) {
						next({
								name: 'ValidationError',
								errors: 'invalid username or password'
						})
				} else {
						const payload = {
								email: user.email
						}
						const token = signToken(payload)
						res.status(200).json({ 
								token: token,
								email: user.email,
								role: user.role
						})
				}
		} catch (err) {
				next(err)
		}
}
}
