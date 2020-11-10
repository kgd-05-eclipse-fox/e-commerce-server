const route = require('express').Router()
const BannerController = require('../controllers/bannerController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization_banner')

route.use(authentication)

route.get('/', BannerController.readAll)
route.post('/', authorization ,BannerController.addBanner)
route.get('/:id', authorization, BannerController.getOne)
route.get('/active', authorization, BannerController.getActiveBanner)
route.put('/:id', authorization ,BannerController.updateBanner)
route.delete('/:id', authorization ,BannerController.deleteBanner)

module.exports = route