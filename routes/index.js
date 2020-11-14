const router = require('express').Router();
const AdminController = require('../controllers/adminController');
const productsRoutes = require('./product.js');
const categoriesRoutes = require('./category.js');
const bannersRoutes = require('./banner.js');

router.post('/adminRegister', AdminController.register);
router.post('/adminLogin', AdminController.login);

router.use('/products', productsRoutes);
router.use('/categories', categoriesRoutes);
router.use('/banners', bannersRoutes);

module.exports = router;