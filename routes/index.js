const router = require('express').Router()

const CustomerController = require('../controllers/customer')
const UserController = require('../controllers/user')
const ProductController = require('../controllers/product')

const { auth, isOwner, isAdmin } = require('../middlewares/auth')

// user
router.post('/register', UserController.register)
router.post('/login', UserController.login)

// cms
router.get('/products', auth, isAdmin, ProductController.browse)
router.get('/products/:id', auth, isAdmin, ProductController.read)
router.put('/products/edit/:id', auth, isAdmin, ProductController.edit)
router.post('/products/add', auth, isAdmin, ProductController.add)
router.delete('/products/delete/:id', auth, isAdmin, ProductController.delete)

// customer
router.get('/', CustomerController.browse)
router.get('/product/:id', CustomerController.read)
router.post('/addToCart/:id', auth, CustomerController.addCart)
router.get('/carts', auth, CustomerController.showCart)
router.delete('/carts/delete/:id', auth, isOwner, CustomerController.deleteCartItem)
router.post('/checkout', auth, CustomerController.checkout)
router.get('/transactions', auth, CustomerController.showTransaction)
router.delete('/transactions/delete/:id', auth, CustomerController.deleteTransaction)


module.exports = router
