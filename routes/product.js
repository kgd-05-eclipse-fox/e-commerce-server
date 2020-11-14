const router = require('express').Router()
const product = require('../controllers/product')
const { authentication, authorization } = require('../middlewares/auth')

router.use(authentication)
router.get('/', product.listProduct)
router.post('/', product.addItem)
router.get('/:id', authorization, product.getProductById)
router.put('/:id', authorization, product.updateProduct)
router.delete('/:id', authorization, product.deleteProduct)

module.exports = router
