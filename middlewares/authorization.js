const { User, Product } = require('../models')

module.exports = async function (req, res, next) {
    try {
        const id = +req.params.id
        const product = await Product.findByPk(id)

        if (!product) {
            throw { msg: 'Product is not found', status: 404 }
        } else if (req.user.role !== 'admin') {
            throw { msg: 'Not Authorized', status: 401 }
        } else {
            next()
        }

    } catch (error) {
        next(error)
    }

}