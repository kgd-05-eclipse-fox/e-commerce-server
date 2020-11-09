const router = require('express').Router()
const UserController = require('../controllers/UserController')
const errorHandler = require('../helpers/errorHandler')

router.post('/login', UserController.loginUser, errorHandler)
router.post('/register', UserController.registerUser, errorHandler)

module.exports = router