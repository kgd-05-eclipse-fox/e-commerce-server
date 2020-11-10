const authorization = (req, res, next) => {
    const loggedInUser = req.loggedInUser

    if(loggedInUser.role === 'admin') {
        next()
    } else {
        next({status: 401, message: "You don't have permission"})
    }
    
}

module.exports = authorization