const route = require('express').Router()
const user_route = require('./user_route')
const product_route = require('./product_route')
const banner_route = require('./banner_route')
const cart_route = require('./cart_route')

route.use('/', user_route)
route.use('/products', product_route)
route.use('/banners', banner_route)
route.use('/carts', cart_route)

module.exports = route