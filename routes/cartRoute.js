const router = require('express').Router()
const CartController = require('../controllers/CartController')
const errorHandler = require('../helpers/errorHandler')
const { authentication, authorization, authenticationCustomer } = require('../middleware/auth')

router.get('/', authenticationCustomer, CartController.fetchCart, errorHandler)
router.post('/:id', authenticationCustomer, CartController.addCart, errorHandler)
router.delete('/:id', authenticationCustomer, authorization, CartController.deleteCart, errorHandler)
// router.patch('/:id', authenticationCustomer, authorization, CartController.incrementQty, errorHandler)
router.patch('/:id', authenticationCustomer, authorization, CartController.decrementQty, errorHandler)

module.exports = router