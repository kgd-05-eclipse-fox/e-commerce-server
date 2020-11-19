const CategoryController = require('../controllers/categoryController');
const Authenticate = require('../middlewares/authenticate');
const Authorize = require('../middlewares/authorize');
const router = require('express').Router();

router.get('/', CategoryController.getCategories);

router.use(Authenticate.user);
router.use(Authorize.admin)
router.post('/', CategoryController.addCategory);
router.delete('/:id', CategoryController.deleteCategory);

module.exports = router;