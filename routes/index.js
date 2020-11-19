const router = require('express').Router();
const AdminController = require('../controllers/adminController');
const CustomerController = require('../controllers/customerController');
const productsRoutes = require('./product.js');
const categoriesRoutes = require('./category.js');
const bannersRoutes = require('./banner.js');
const wishlistsRoutes = require('./wishlist.js');
const cartRoutes = require('./cart.js');
const { checkout, history } = require('../controllers/cartController');
const Authenticate = require('../middlewares/authenticate');


router.post('/adminRegister', AdminController.register);
router.post('/adminLogin', AdminController.login);
router.post('/customerRegister', CustomerController.register);
router.post('/customerLogin', CustomerController.login);
router.patch('/checkout', Authenticate.user, checkout);
router.get('/history', Authenticate.user, history);

router.use('/products', productsRoutes);
router.use('/categories', categoriesRoutes);
router.use('/banners', bannersRoutes);
router.use('/wishlist', wishlistsRoutes);
router.use('/cart', cartRoutes);

module.exports = router;