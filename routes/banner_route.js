const route = require('express').Router()
const BannerController = require('../controllers/bannerController')
const Auth = require('../middlewares/auth_admin')

route.get('/', BannerController.readAll)
route.get('/active', BannerController.getActiveBanner)

route.use(Auth.authentication)

route.get('/:id', BannerController.getOne)
route.post('/', BannerController.addBanner)

route.use('/:id', Auth.authorization_banner)

route.put('/:id', BannerController.updateBanner)
route.delete('/:id', BannerController.deleteBanner)

module.exports = route