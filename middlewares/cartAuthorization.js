const { UserCart } = require('../models/')

const cartAuthorization = async (req, res, next) => {
    try {
        const { id } = req.whoAmI
        const ProductId = { id: req.params.id }
        const findMyCart = await UserCart.findOne({
            where: ProductId
        })

        if (!findMyCart) throw new Error('Cart not found')
        
        const { UserId } = findMyCart
        if (UserId !== id) throw new Error('Unauthorized')

        next()
    } catch (error) {
        next(error)
    }
}

module.exports = cartAuthorization