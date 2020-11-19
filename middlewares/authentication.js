const { jwtVerify } = require('../helpers/jwt')
const { User } = require('../models/')

const authentication = async (req, res, next) => {
    try {
        const { access_token } = req.headers
        if (!access_token) throw new Error('Unauthorized')

        const verify = jwtVerify(access_token)
        if (verify) {
            const findUser = await User.findOne({
                where: {
                    email: verify.email
                }
            })

            if (findUser) {
                req.whoAmI = verify
                next()
            } else {
                throw new Error('Unauthorized')
            }
        } else {
            throw new Error('Unauthorized')
        }
    } catch (error) {
        next(error)
    }
}

module.exports = authentication