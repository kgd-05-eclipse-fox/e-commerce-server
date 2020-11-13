const { User } = require('../models')
const { compare } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt')

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
					if (findUser.role === 'admin') {
						res.status(200).json({ token })
					} else {
						res.status(200).json({ user_token: token })
					}
				}
			}
		} catch (err) {
			next(err)
		}
	}
				
}

module.exports = UserController