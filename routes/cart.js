const router = require('express').Router();
const CartController = require('../controllers/CartController');
const authenticationCustomer = require('../middlewares/authenticationCustomer')
const authorizationCustomer = require('../middlewares/authorizationCustomer')

router.use(authenticationCustomer)
router.get('/', CartController.fetchCart);
router.post('/:id', CartController.postCart);
router.patch('/:id', authorizationCustomer, CartController.incrementQuantity);
router.put('/:id', authorizationCustomer, CartController.decrementQuantity);
router.delete('/:id', authorizationCustomer, CartController.deleteCart);

module.exports = router