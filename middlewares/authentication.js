const { User } = require('../models')
const { verifyToken } = require('../helpers/jwt')

module.exports = async function (req, res, next) {
    try {
        const {access_token} = req.headers

        if (!access_token) {
            throw { msg: 'Authentication Failed', status: 401 }
        } else {
            const decoded = verifyToken(access_token)
            const user = await User.findOne({
                where: {
                    email: decoded.email
                }
            })
            if(!user) {
                throw { msg: 'Authentication Failed', status: 401 }
            } else {
                req.user = decoded
                next()
            }
        }
    } catch (error) {
        next(error)
    }
}