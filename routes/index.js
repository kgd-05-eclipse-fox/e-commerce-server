const route = require('express').Router()
const product_route = require('./product_route')
const UserController = require('../controllers/userController')

route.post('/login/admin', UserController.loginAdmin)
route.post('/login/costumer', UserController.loginCostumer)
// route.post('/googleLogin', UserController.googleLogin)

route.use('/products', product_route)

module.exports = route