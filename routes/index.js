const router = require('express').Router()
const userRoute = require('./userRoute')
const productRoute = require('./productRoute')
const cartRoute = require('./cartRoute')

router.use('/login', userRoute)
router.use('/register', userRoute)
router.use('/product', productRoute)
router.use('/cart', cartRoute)

module.exports = router