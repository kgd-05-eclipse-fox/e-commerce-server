const router = require('express').Router()
const BannerController = require('../controllers/bannercontroller')
const {authentication} = require('../middlewares/authentication')
const {authorization} = require('../middlewares/authorization')

router.use(authentication)
router.get('/', BannerController.getBanner)
router.use(authorization)
router.post('/', BannerController.createBanner)
router.put('/:id', BannerController.updateBanner)
router.delete('/:id', BannerController.deleteBanner)

module.exports = router