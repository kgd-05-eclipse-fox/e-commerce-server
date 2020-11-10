const router = require('express').Router()
const userRoute = require('./userRoute')

router.use('/login', userRoute)
router.use('/register', userRoute)

module.exports = router