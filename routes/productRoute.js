const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
const errorHandler = require('../helpers/errorHandler')
const { authentication } = require('../middleware/auth')

router.get('/', ProductController.fetchProduct, errorHandler)
router.use(authentication)
router.post('/', ProductController.createProduct, errorHandler)
router.get('/:id', ProductController.findProduct, errorHandler)
router.put('/:id', ProductController.updateProduct, errorHandler)
router.delete('/:id', ProductController.deleteProduct, errorHandler)

module.exports = router