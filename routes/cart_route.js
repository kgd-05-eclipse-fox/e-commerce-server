const route = require('express').Router()
const Auth = require('../middlewares/auth_customer')
const CartController = require('../controllers/cartController')

route.use(Auth.authentication)

route.get('/', CartController.readAll)

route.post('/', CartController.updateCart)

route.use(Auth.authorization)
route.delete('/:id', CartController.removeCart)

module.exports = route