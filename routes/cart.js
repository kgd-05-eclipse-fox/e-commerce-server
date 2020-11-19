const { showCart, addToCart, updateAmount, deleteItem } = require('../controllers/cartController');
const Authenticate = require('../middlewares/authenticate');

const router = require('express').Router();

router.use(Authenticate.user);
router.get('/', showCart);
router.post('/', addToCart);
router.patch('/:id', updateAmount);
router.delete('/:id', deleteItem);

module.exports = router;