const routers = require('express').Router()
const UserController = require('../controller/user-controller.js')
const ProductController = require('../controller/product-controller.js')
const BennerController = require('../controller/benner-controller.js')
const authentication = require('../middleware/authentication.js')
const authorization = require('../middleware/authorization.js')

routers.get('/',(req, res) =>{
    res.send('masuk heroku pls....')
})

routers.post('/register', UserController.constructorRegister)
routers.post('/login/admin', UserController.adminLogin)
routers.post('/login/customer', UserController.costomerLogin)

routers.use(authentication)
routers.get('/product', ProductController.getAllProduct)
routers.post('/product', ProductController.createProduct)

routers.get('/benner', BennerController.getAllBenner)
routers.post('/benner', BennerController.postBenner)

routers.get('/benner/:id', authorization, BennerController.findOneBenner)
routers.put('/benner/:id', authorization, BennerController.putBenner)
routers.delete('/benner/:id', authorization, BennerController.deleteBenner)

routers.get('/product/:id', authorization, ProductController.findByIdProduct)
routers.put('/product/:id', authorization, ProductController.updateProduct)
routers.delete('/product/:id', authorization, ProductController.deleteProduct)

module.exports = routers