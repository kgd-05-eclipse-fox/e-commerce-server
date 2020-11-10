const routers = require('express').Router()
const UserController = require('../controller/user-controller.js')
const ProductController = require('../controller/product-controller.js')
const authentication = require('../middleware/authentication.js')
const authorization = require('../middleware/authorization.js')

routers.post('/register', UserController.constructorRegister)
routers.post('/login/admin', UserController.adminLogin)
routers.post('/login/customer', UserController.costomerLogin)

routers.use(authentication)
routers.post('/product', ProductController.createProduct)

routers.put('/product/:id', authorization, ProductController.updateProduct)
routers.delete('/product/:id', authorization, ProductController.deleteProduct)
module.exports = routers