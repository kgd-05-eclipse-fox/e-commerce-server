const router = require('express').Router();
const ProductController = require('../controllers/ProductController');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

router.get('/', ProductController.fetchDataProduct);

router.post('/', authentication, authorization, ProductController.postProduct);

router.get('/:id', authentication, authorization, ProductController.fetchProductById);

router.put('/:id', authentication, authorization, ProductController.putProduct);

router.delete('/:id', authentication, authorization, ProductController.deleteProduct)

module.exports = router;