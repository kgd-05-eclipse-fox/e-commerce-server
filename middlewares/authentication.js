const { jwtVerify } = require('../helpers/jwt')

const authentication = async (req, res, next) => {
    try {
        const { access_token } = req.headers
        if(!access_token) throw new Error('Unauthorized')

        const verify = jwtVerify(access_token)
        if(verify) {
            req.whoAmI = verify
            next()
        } else {
            throw new Error('Unauthorized')
        }
    } catch (error) {
        next(error)
    }
}

module.exports = authentication