const router = require('express').Router()
const CartController = require('../controllers/CartController')

const authenticaton = require('../middlewares/authentication')
const cartAuthorization = require('../middlewares/cartAuthorization')

router.use(authenticaton)
router.get('/', CartController.getMyCarts)
router.post('/:id', CartController.postMyCart)
router.put('/checkout', CartController.checkoutCart)

router.use('/:id', cartAuthorization)
router.patch('/:id', CartController.patchMyCart)
router.delete('/:id', CartController.deleteMyCart)

module.exports = router