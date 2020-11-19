const route = require('express').Router()
const Auth = require('../middlewares/auth_customer')
const CartController = require('../controllers/cartController')

route.use(Auth.authentication)

route.get('/', CartController.readAll)
route.get('/history', CartController.getHistory)
route.post('/', CartController.updateCart)
route.delete('/checkout', CartController.checkout)

route.delete('/:id', Auth.authorization, CartController.removeCart)

module.exports = route