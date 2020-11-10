const { User, Banner } = require('../models')

module.exports = async function (req, res, next) {
    try {
        if (req.params.id) {
            const id = +req.params.id
            const banner = await Banner.findByPk(id)

            if (req.user.role !== 'admin') {
                throw { msg: 'Not Authorized', status: 401 }
            } else if (!banner) { 
                throw { msg: 'banner is not found', status: 404 }
            } else {
                next()
            }
        } else {
            if (req.user.role !== 'admin') {
                throw { msg: 'Not Authorized', status: 401 }
            } else {
                next()
            }
        }
    } catch (error) {
        next(error)
    }

}