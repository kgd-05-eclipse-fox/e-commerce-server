const route = require('express').Router()
const product_route = require('./product_route')
const banner_route = require('./banner_route')
const UserController = require('../controllers/userController')

route.post('/register', UserController.register)
route.post('/login/admin', UserController.loginAdmin)
route.post('/login/customer', UserController.loginCostumer)
// route.post('/googleLogin', UserController.googleLogin)

route.use('/products', product_route)
route.use('/banners', banner_route)

module.exports = route