const router = require('express').Router()
const HistoryController = require('../controllers/HistoryController')
const errorHandler = require('../helpers/errorHandler')
const { authenticationCustomer } = require('../middleware/auth')

router.get('/', authenticationCustomer, HistoryController.fetchHistory, errorHandler)

module.exports = router