const { getWishlist, addToWishlist, deleteWishlist } = require('../controllers/wishlistController');
const Authenticate = require('../middlewares/authenticate');
const router = require('express').Router();

router.use(Authenticate.user);
router.get('/', getWishlist);
router.post('/', addToWishlist);
router.delete('/:id', deleteWishlist);

module.exports = router;