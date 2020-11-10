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

// routers.use('/product/:id', authorization)
routers.put('/product/:id', ProductController.updateProduct)
routers.delete('/product/:id', ProductController.deleteProduct)

module.exports = routers