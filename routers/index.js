const router = require('express').Router()
const loginRegister = require('./loginRegister')
const products = require('./products')
const banners = require('./banners')

router.use('/', loginRegister)
router.use('/products', products)
router.use('/banners', banners)

module.exports = router