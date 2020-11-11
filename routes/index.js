const router = require('express').Router()
const userRoute = require('./userRoute')
const productRoute = require('./productRoute')

router.use('/login', userRoute)
router.use('/register', userRoute)
router.use('/product', productRoute)

module.exports = router