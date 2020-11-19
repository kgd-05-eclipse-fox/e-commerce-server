const { User, Cart } = require('../models/index')
const { verifyToken } = require('../helpers/jwt')

async function auth(req, res, next) {
	const token = req.headers.token
	if (!token) {
		res.status(401).json({
			errors: 'please login first',
		})
	} else {
		const payload = verifyToken(token)
		try {
			const user = await User.findOne({
				where: {
					email: payload.email,
				},
			})
			if (!user) {
				res.status(401).json({
					errors: 'please login first',
				})
			} else {
				req.userLogin = user
				next()
			}
		} catch (err) {
			res.status(500).json({
				errors: 'internal server errors',
			})
		}
	}
}

async function isAdmin(req, res, next) {
	try {
		if (req.userLogin.role !== 'admin') {
			res.status(401).json({
				errors: `You don't have permission to access`,
			})
		} else {
			next()
		}
	} catch (err) {
		res.status(500).json({
			errors: 'Internal Server Errors',
		})
	}
}

async function isOwner(req, res, next) {
	try {
		const cart = await Cart.findByPk(req.params.id)
		if (!cart) {
			res.status(404).json({ error: 'Cart not Found' })
		} else {
			if (cart.UserId !== req.userLogin.id) {
				res.status(401).json({
					error: 'Not Authorized to Access this',
				})
			} else {
				next()
			}
		}
	} catch (err) {
		res.status(500).json({
			errors: 'Internal server error',
		})
	}
}

module.exports = {
	auth,
	isAdmin,
	isOwner,
}
