const router = require('express').Router()
const userRot = require('./user')
const productRot = require('./product')

router.use('/', userRot)
router.use('/products', productRot)

module.exports = router
