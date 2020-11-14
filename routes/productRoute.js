const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
const errorHandler = require('../helpers/errorHandler')
const { authentication } = require('../middleware/auth')

router.use(authentication)
router.get('/', ProductController.fetchProduct, errorHandler)
router.post('/create', ProductController.createProduct, errorHandler)
router.put('/update/:id', ProductController.updateProduct, errorHandler)
router.delete('/delete/:id', ProductController.deleteProduct, errorHandler)

module.exports = router