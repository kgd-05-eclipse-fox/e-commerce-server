const errorjoin = require('../helpers/errorjoin')

module.exports = (err, req, res, next) => {
    console.log(err, 'errorss <<<<')
    const errorMsg = err.message
    const errors = err.errors

    let status = 500
    let message = 'Internal Server Error'

    if(errors) {
        message =  errorjoin(errors)
        status = 400
    } else {
        switch(errorMsg) {
            case 'Wrong email or password':
                message = errorMsg
                status = 400
                break
            case 'Please complete all form':
                message = errorMsg
                status = 400
                break
            case 'Unauthorized':
                message = errorMsg
                status = 401
                break
            case 'Product not found':
                message = errorMsg
                status = 404
                break
        }
    }

    res.status(status).json({ message: message })
}