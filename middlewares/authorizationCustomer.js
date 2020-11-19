const { Cart } = require('../models')

const authorizationCustomer = (req, res, next) => {
    const id = +req.params.id
    const UserId = req.loggedInUser.id
    Cart.findOne({
        where: {
            id
        }
    })
    .then(cart => {
        if(!cart) {
            throw {status: 404, message: 'Data is not found'}
        } else {
            if (cart.UserId === UserId) {
                next()
            } else {
                throw {status: 401, message: "You are not authorized"}
            }
        }
    })
    .catch(err => {
        next(err)
    })
}

module.exports = authorizationCustomer 