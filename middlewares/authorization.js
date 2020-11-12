async function authorization(req, res, next) {
	try {
		const { role } = req.loggedInUser
		if(role == 'admin') {
			next()
		} else {
			res.status(401).json({msg: 'Authentication Failed.'})
		}
	} catch(err) {
		next(error)
	}
}

module.exports = { authorization }