const router = require('express').Router()
const ProductController = require('../controllers/productcontroller')

router.post('/', ProductController.createProduct)
router.put('/:id', ProductController.updateProduct)
router.delete('/:id', ProductController.deleteProduct)

module.exports = router