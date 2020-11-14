const { User } = require('../models')
const createError = require('http-errors')
const { cheking } = require('../helpers/bcrypt')
const { generate } = require('../helpers/jwt')

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
				const access_token = generate({
					id: data.id,
					email: data.email,
				})
				res.status(201).json({ access_token })
			})
			.catch(next)
	}

	static login(req, res, next) {
		const { email, password } = req.body
		User.findOne({
			where: {
				email: email,
			},
		})
			.then((user) => {
				if (user && cheking(password, user.password)) {
					let dataUser = {
						id: user.id,
						email: user.email,
						role: user.role,
					}
					let access_token = generate(dataUser)
					res.status(200).json({ access_token })
				} else {
					next(createError(400, 'invalid email or password'))
				}
			})
			.catch(next)
	}
}
