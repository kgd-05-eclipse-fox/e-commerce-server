const router = require('express').Router()
const UserController = require('../controllers/UserController')

const productrouter = require('./productrouter')

router.post('/cms-admin', UserController.postAdminLogin)
router.post('/login', UserController.postUserLogin)
router.post('/register', UserController.postUserRegister)

router.use('/product', productrouter)

module.exports = router