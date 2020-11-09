const routers = require('express').Router()
const AdmindController = require('../controller/admin-controller.js')

routers.post('/login', AdmindController.admindLogin)


module.exports = routers