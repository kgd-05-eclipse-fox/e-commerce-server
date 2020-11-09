const route = require('express').Router()
const ProductController = require('../controllers/productController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

route.use(authentication)

route.get('/', ProductController.readAll)
route.post('/', authorization ,ProductController.addProduct)
route.put('/:id', authorization ,ProductController.updateProduct)
route.delete('/:id', authorization ,ProductController.deleteProduct)

module.exports = route