const route = require('express').Router()
const ProductController = require('../controllers/productController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

route.use(authentication)

route.post('/', ProductController.addProduct)
route.get('/', ProductController.readAll)

route.use('/:id' ,authorization)
route.put('/:id', ProductController.updateProduct)
route.delete('/:id', ProductController.deleteProduct)

module.exports = route