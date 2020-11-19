const router = require('express').Router()
const ProductController = require('../controllers/productcontroller')
const {authentication} = require('../middlewares/authentication')
const {authorization} = require('../middlewares/authorization')

router.get('/', ProductController.getProduct)
router.use(authentication)
router.use(authorization)
router.post('/', ProductController.createProduct)
router.put('/:id', ProductController.updateProduct)
router.delete('/:id', ProductController.deleteProduct)

module.exports = router