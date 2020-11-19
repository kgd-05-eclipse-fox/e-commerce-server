const router = require('express').Router()
const ProductController = require('../controllers/ProductController')

const authenticaton = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.get('/', ProductController.getAllProduct)

router.use(authenticaton)
router.post('/', authorization, ProductController.postCreateProduct)
router.put('/:id', authorization, ProductController.putUpdateProduct)
router.delete('/:id', authorization, ProductController.deleteProduct)

module.exports = router