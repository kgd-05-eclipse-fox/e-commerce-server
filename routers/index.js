const router = require('express').Router()
const loginRegister = require('./loginregister')
const products = require('./products')
const {authentication} = require('../middlewares/authentication')
const {authorization} = require('../middlewares/authorization')


router.use('/', loginRegister)
router.use(authentication)
router.use(authorization)
router.use('/products', products)

module.exports = router