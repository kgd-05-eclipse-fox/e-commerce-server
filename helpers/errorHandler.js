function errorHandler(err, req, res, next) {
	// console.log(err)
	let status = err.status || 500
	let msg = err.msg || 'Internal Server Error'

	if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError' || err.name == 'ValidationError') {
		msg = err.errors.map(el => el.message).join(',')
		// err.errors.forEach((el,i) => {
		// 	status = 400
		// 	if (el.message === 'email must be unique') {
		// 		msg = 'Email already registered'
		// 	} else if (el.message === 'Email cannot be blank') {
		// 		msg = el.message
		// 	} else if (msg !== 'Email cannot be blank' && el.message === 'Inputed email is even not an Email') {
		// 		msg = el.message
		// 	} else if (el.message === 'Password cannot be blank') {
		// 		msg = el.message
		// 	} else if (msg !== 'Password cannot be blank' && el.message === 'Password should be at least 4 characters') {
		// 		msg = el.message
		// 	} else if (el.message === 'Name cannot be blank') {
		// 		msg = el.message
		// 	} else if (el.message === 'URL cannot be blank') {
		// 		msg = el.message
		// 	} else if (msg !== 'URL cannot be blank' && el.message === 'Should be an URL') {
		// 		msg = el.message
		// 	}
		// });
		// msg = err.errors[0].message
		status = 400
	} else if (err.response.data) {
		status = err.response.data.cod
		msg = err.response.data.message
	}
	res.status(status).json({ msg })
}

module.exports = {
	errorHandler
}