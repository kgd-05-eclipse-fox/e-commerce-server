const router = require('express').Router()
const loginRegister = require('./loginregister')
const products = require('./products')


router.use('/', loginRegister)
router.use('/products', products)

module.exports = router