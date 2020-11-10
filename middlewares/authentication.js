const { User } = require('../models')
const { verifyToken } = require('../helpers/jwt')

const authentication = (req, res, next) => {
    const { access_token } = req.headers;

    if(!access_token) {
        next({status: 401, message: 'Authentication failed'})
    } else {
        const decoded = verifyToken(access_token)

        User.findAll({
            where: {
                email: decoded.email
            }
        })
        .then(user => {
            if (!user) {
                throw {status: 401, message: 'Authentication failed'}
            } else {
                req.loggedInUser = decoded;
                next()
            }
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = authentication;