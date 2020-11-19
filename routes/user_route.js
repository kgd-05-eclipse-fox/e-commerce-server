const route = require('express').Router()
const UserController = require('../controllers/userController')

route.post('/register', UserController.register)
route.post('/login/admin', UserController.loginAdmin)
route.post('/login/customer', UserController.loginCostumer)

module.exports = route