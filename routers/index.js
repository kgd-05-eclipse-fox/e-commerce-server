const routers = require('express').Router()
const UserController = require('../controller/user-controller.js')
const ProductController = require('../controller/product-controller.js')
const BennerController = require('../controller/benner-controller.js')
const UserProduct = require('../controller/userProduct-controller.js')
const CheckOutController = require('../controller/checkOut-controller.js')
const FavoritesController = require('../controller/favorites-conterooler.js')
const authentication = require('../middleware/authentication.js')
const authorization = require('../middleware/authorization.js')

routers.get('/',(req, res) =>{
    res.send('masuk heroku pls....')
})

routers.post('/register', UserController.constructorRegister)
routers.post('/login/admin', UserController.adminLogin)
routers.post('/login/customer', UserController.costomerLogin)

routers.use(authentication)
routers.get('/product', ProductController.getAllProduct)
routers.post('/product', ProductController.createProduct)

routers.get('/banner', BennerController.getAllBenner)
routers.post('/banner', BennerController.postBenner)

routers.get('/banner/:id', authorization, BennerController.findOneBenner)
routers.put('/banner/:id', authorization, BennerController.putBenner)
routers.delete('/banner/:id', authorization, BennerController.deleteBenner)

routers.get('/product/:id', authorization, ProductController.findByIdProduct)
routers.put('/product/:id', authorization, ProductController.updateProduct)
routers.delete('/product/:id', authorization, ProductController.deleteProduct)

routers.post('/userproduct', UserProduct.postProductUser)
routers.get('/userproduct', UserProduct.getDataUserProduct)
routers.get('/userproduct/total', UserProduct.getTotalBasket)

routers.delete('/userproduct/:id', authorization, UserProduct.deleteUserProduct)
routers.patch('/userproduct/:id', authorization, UserProduct.updateQuantity)

routers.post('/chechout', CheckOutController.createCheckOut)
routers.get('/chechout', CheckOutController.getDataCheckOut)

routers.delete('/chechout/:id', authorization, CheckOutController.deleteDataCheckOut)

routers.post('/favorit', FavoritesController.postFavoritProduct)
routers.get('/favorit', FavoritesController.getDataFavorit)

routers.delete('/favorit/:id', authorization, FavoritesController)

module.exports = routers