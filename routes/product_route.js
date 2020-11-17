const route = require('express').Router()
const ProductController = require('../controllers/productController')
const Auth = require('../middlewares/auth_admin')

route.get('/', ProductController.readAll)

route.use(Auth.authentication)

route.post('/', Auth.authorization_product ,ProductController.addProduct)
route.get('/:id', ProductController.getOne)

route.use('/:id', Auth.authorization_product)

route.put('/:id' ,ProductController.updateProduct)
route.delete('/:id' ,ProductController.deleteProduct)

module.exports = route