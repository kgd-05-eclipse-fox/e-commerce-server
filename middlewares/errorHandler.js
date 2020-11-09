const errorHandler = (err, req, res, next) => {
    let status;
    let message;
    console.log(err);

    if(err.name === 'SequelizeUniqueConstraintError') {
        status = 400
        message = 'Email is already exist'

    } else if (err.name === 'SequelizeValidationError') {
        let tempErr = ''
        tempErr += err.errors[0].message
        status = 400;
        message = tempErr
        
    } else if (err.name === undefined ) {
        status = err.status
        message = err.message
    } else {
        status = 500
        message = 'Internal Server Error'
    }
    res.status(status).json({message: message})
}

module.exports = errorHandler;