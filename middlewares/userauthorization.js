async function userAuthorization(req, res, next) {
	try {
		const { role } = req.loggedInUser
		if(role == 'user') {
			next()
		} else {
			res.status(401).json({msg: 'Authentication Failed.'})
		}
	} catch(err) {
		next(error)
	}
}

module.exports = { userAuthorization }