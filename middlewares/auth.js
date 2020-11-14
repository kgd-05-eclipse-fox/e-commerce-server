const { decode } = require('../helpers/jwt')

module.exports = class Auth {
	static authentication(req, res, next) {
		try {
			if (req.headers.access_token) {
				req.myUser = decode(req.headers.access_token)
				next()
			} else {
				throw { status: 400, message: 'invalid token' }
			}
		} catch (error) {
			next(error)
		}
	}

	static authorization(req, res, next) {
		try {
			if (req.myUser.role === 'admin') {
				next()
			} else {
				throw { status: 403, message: 'only the admin can do it' }
			}
		} catch (error) {
			next(error)
		}
	}
}
