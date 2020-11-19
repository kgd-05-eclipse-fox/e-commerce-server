const router = require('express').Router()
const authentication = require('../middlewares/authentication')
const HistoryController = require('../controllers/HistoryController')

router.use('/', authentication)
router.get('/', HistoryController.getHistory)

module.exports = router