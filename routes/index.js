const router = require('express').Router();
const UserController = require('../controllers/UserController');
const productRoutes = require('./product');
const cartRoutes = require('./cart');

router.get('/', (req, res) => {
    res.send('Hello World!')
})
router.post('/register', UserController.register);
router.post('/login/admin', UserController.loginAdmin);
router.post('/login/customer', UserController.loginCustomer);

router.use('/products', productRoutes);
router.use('/carts', cartRoutes);

module.exports = router;
