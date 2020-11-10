async function authorization(req, res, next) {
	try {
		const { role } = req.loggedInUser
		if(role == 'admin') {
			next()
		} else {
			throw new Error('Unauthorized')
		}
	} catch(err) {
		next(error)
	}
}

module.exports = { authorization }