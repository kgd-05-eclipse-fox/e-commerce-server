const router = require('express').Router()
const CartController = require('../controllers/cartcontroller')
const { authentication } = require('../middlewares/authentication')
const { userAuthorization } = require('../middlewares/userauthorization')


router.use(authentication)
router.use(userAuthorization)
router.get('/', CartController.getCart)
router.post('/', CartController.addCart)
router.patch('/', CartController.checkOut)
router.get('/history', CartController.getHistory)
router.get('/:id', CartController.getById)
router.delete('/:id', CartController.deleteCart)
router.patch('/:id', CartController.editQty)


module.exports = router