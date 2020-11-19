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
routers.get('/products', ProductController.getAllProduct)
routers.post('/products', ProductController.createProduct)

routers.get('/banners', BennerController.getAllBenner)
routers.post('/banners', BennerController.postBenner)

routers.get('/banners/:id', authorization, BennerController.findOneBenner)
routers.put('/banners/:id', authorization, BennerController.putBenner)
routers.delete('/banners/:id', authorization, BennerController.deleteBenner)

routers.get('/products/:id', authorization, ProductController.findByIdProduct)
routers.put('/products/:id', authorization, ProductController.updateProduct)
routers.delete('/products/:id', authorization, ProductController.deleteProduct)

routers.post('/userproducts', UserProduct.postProductUser)
routers.get('/userproducts', UserProduct.getDataUserProduct)
routers.get('/userproducts/total', UserProduct.getTotalBasket)

routers.delete('/userproducts/:id', authorization, UserProduct.deleteUserProduct)
routers.patch('/userproducts/:id', authorization, UserProduct.updateQuantity)

routers.post('/checkouts', CheckOutController.createCheckOut)
routers.get('/checkouts', CheckOutController.getDataCheckOut)

routers.delete('/checkouts/:id', authorization, CheckOutController.deleteDataCheckOut)

routers.post('/favorites', FavoritesController.postFavoritProduct)
routers.get('/favorites', FavoritesController.getDataFavorit)

routers.delete('/favorites/:id', authorization, FavoritesController.deleteFavoriteProduct)

module.exports = routers