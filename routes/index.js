const router = require('express').Router()
const UserController = require('../controllers/UserController')

const productrouter = require('./productrouter')
const cartrouter = require('./cartrouter')
const historyrouter = require('./historyrouter')

router.post('/cms-admin', UserController.postAdminLogin)
router.post('/login', UserController.postUserLogin)
router.post('/register', UserController.postUserRegister)

router.use('/product', productrouter)
router.use('/cart', cartrouter)
router.use('/history', historyrouter)

module.exports = router