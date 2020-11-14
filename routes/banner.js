const BannerController = require('../controllers/bannerController');
const Authenticate = require('../middlewares/authenticate');
const Authorize = require('../middlewares/authorize');
const router = require('express').Router();

router.get('/', BannerController.getBanners);

router.use(Authenticate.user);
router.use(Authorize.admin);
router.post('/', BannerController.addBanner);
router.put('/:id', BannerController.editBanner);
router.patch('/:id', BannerController.changeBannerStatus);
router.delete('/:id', BannerController.deleteBanner);

module.exports = router;