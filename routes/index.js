const router = require('express').Router()
const userRoute = require('./userRoute')
const productRoute = require('./productRoute')
const cartRoute = require('./cartRoute')
const historyRoute = require('./historyRoute')

router.use('/login', userRoute)
router.use('/register', userRoute)
router.use('/product', productRoute)
router.use('/cart', cartRoute)
router.use('/history', historyRoute)

module.exports = router