const { Cart, User, Product } = require('../models') 

class CartController {
    static postCart (req, res, next) {
        const payload = {
            ProductId: +req.params.id,
            UserId: +req.loggedInUser.id,
            quantity: 1
        }
        Cart.findOne({
            where: {
                UserId: payload.UserId,
                ProductId: payload.ProductId
            }
        })
        .then(cart => {
            if (!cart) {
                Cart.create(payload)
                .then(cart => {
                    res.status(201).json(cart)
                })
                .catch(err => {
                    next(err)
                })
            } else {
                const sumQuantity = payload.quantity + cart.quantity
                Product.findOne({
                    where: {
                        id: payload.ProductId
                    }
                })
                .then(product => {
                    if(!product) {
                        throw {status: 404, message: 'Product not found'}
                    } else {
                        const stock = product.stock
                        if (sumQuantity > stock) {
                            throw {status: 401, message: 'Product is out of stock'}
                        } else {
                            const payload = {
                                quantity: sumQuantity
                            }
                            Cart.update(payload, {
                                where: {
                                    ProductId: cart.ProductId
                                }
                            })
                            .then(_ => {
                                res.status(200).json({
                                    message: 'Cart has been updated'
                                })
                            })
                            .catch(err => {
                                next(err)
                            })
                        }
                    }
                })
                .catch(err =>{
                    next(err)
                })
            }
        })
        .catch (err => {
            next(err)
        })
    }

    static fetchCart(req, res, next) {
        const UserId = +req.loggedInUser.id
        Cart.findAll({
            where: {
                UserId
            },
            include: {
                model: Product,
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
            },
            attributes: ['id', 'quantity']
        })
        .then(cart=> {
            res.status(200).json(cart)
        })
        .catch(err => {
            next(err)
        })
    }

    static deleteCart(req, res, next) {
        const id = +req.params.id
        Cart.destroy({
            where: {
                id
            }
        })
        .then(_ => {
            res.status(200).json({message: 'Cart has been deleted'})
        })
        .catch(err => {
            next(err)
        })
    }

    static incrementQuantity(req,res,next) {
        const id = +req.params.id
        Cart.findOne({
            where: {
                id
            },
            include: Product
        })
        .then(cart => {
            if(!cart) {
                throw {status: 404, message: 'Data not found'}
            } else {
                if (cart.quantity < cart.Product.stock) {
                    const newQuantity = cart.quantity + 1
                    Cart.update({
                        quantity: newQuantity
                    },{
                        where: {
                            id: id
                        }
                    })
                    .then(_ => {
                        res.status(200).json({message: 'Cart has been updated'})
                    })
                    .catch(err => {
                        next(err)
                    })
                } else {
                    throw {status: 400, message: 'You have reached stock limits'}
                }
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static decrementQuantity(req, res, next) {
        const id = +req.params.id
        Cart.findOne({
            where: {
                id
            },
            include: Product
        })
        .then(cart => {
            if(!cart) {
                throw {status: 404, message: 'Data not found'}
            } else {
                if (cart.quantity <= 1) {
                    Cart.destroy({
                        where: {
                            id
                        }
                    })
                    .then(_ => {
                        res.status(200).json('Cart has been deleted')
                    })
                    .catch(err => {
                        next(err)
                    })
                } else {
                    const decrementQty = cart.quantity - 1
                    Cart.update({
                        quantity: decrementQty
                    },{
                        where: {
                            id
                        }
                    })
                    .then(_ => {
                        res.status(200).json('Cart has been updated')
                    })
                    .catch(err => {
                        next(err)
                    })
                }
            }
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = CartController