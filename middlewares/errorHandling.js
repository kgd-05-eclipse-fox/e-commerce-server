module.exports = (err, req, res, next) => {
	let status = err.status || 500
	let errors = [err.message] || ['internal server error']
	switch (err.name) {
		case 'SequelizeValidationError':
			status = 400
			let messages = []
			err.errors.forEach((error) => {
				messages.push(error.message)
			})
			errors = messages
			break
		case 'SequelizeUniqueConstraintError':
			errors = ['Email already registered']
			status = 400
			break
		default:
			status = err.status || 500
			errors = [err.message] || ['internal server error']
			break
	}
	res.status(status).json({ errors })
}
