const router = require('express').Router()
const loginRegister = require('./loginRegister')
const products = require('./products')
const banners = require('./banners')
const carts = require('./carts')

router.use('/', loginRegister)
router.use('/products', products)
router.use('/banners', banners)
router.use('/carts', carts)

module.exports = router