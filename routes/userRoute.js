const router = require('express').Router()
const UserController = require('../controllers/UserController')
const errorHandler = require('../helpers/errorHandler')

router.post('/admin', UserController.loginAdmin, errorHandler)
router.post('/customer', UserController.loginCustomer, errorHandler)
router.post('/user', UserController.registerCustomer, errorHandler)

module.exports = router