const { User, Product, Cart } = require('../models')

class Controller {
  static async addCart(req, res, next) {
    try {
      // console.log(req.params.id)
      const payload = {
        UserId: req.loginUser.id,
        ProductId: +req.params.id,
        Qty: 1
      }
      const cart = await Cart.findOne({
        where: {
          UserId: payload.UserId,
          ProductId: payload.ProductId
        }
      })
      if(!cart) {
        const newCart = await Cart.create(payload)
        res.status(201).json(newCart)
      } else {
        const addQty = cart.Qty + payload.Qty
        const product = await Product.findOne({
          where: {
            id: payload.ProductId
          }
        })
        if(!product) {
          throw { message: "Product not found" }
        } else {
          if(addQty > product.stock) {
            res.status(400).json({ message: 'Product out of stock' })
          } else {
            console.log(cart)
            const updatedCart = await Cart.update({
              Qty: addQty
            }, {
              where: {
                ProductId: cart.ProductId
              },
              returning: true
            })
            res.status(200).json(updatedCart)
          }
        }
      }
    } catch (error) {
      next(error)
    }
  }

  static async fetchCart(req, res, next) {
    try {
      const UserId = req.loginUser.id
      const cartUser = await Cart.findAll({
        where: {
          UserId
        },
        include: Product
      })
      res.status(200).json(cartUser)
    } catch (error) {
      next(error)
    }
  }

  static async deleteCart(req, res, next) {
    try {
      const UserId = req.loginUser.id
      const ProductId = +req.params.id
      const deletedProduct = await Cart.destroy({
        where: {
          UserId,
          ProductId
        }
      })
      res.status(200).json({ message: 'Cart deleted' })
    } catch (error) {
      next(error)
    }
  }

  static async incrementQty(req, res, next) {
    try {
      const id = +req.params.id
      const selectedCart = await Cart.findOne({
        where: {
          UserId: req.loginUser.id,
          ProductId: id
        }
      })
      const incQty = selectedCart.Qty + 1
      const updatedCart = await Cart.update({
        Qty: incQty
      }, {
        where: {
          UserId: req.loginUser.id,
          ProductId: id
        },
        returning: true
      })
      res.status(200).json(updatedCart)
    } catch (error) {
      next(error)
    }
  }

  static async decrementQty(req, res, next) {
    try {
      const id = +req.params.id
      const selectedCart = await Cart.findOne({
        where: {
          ProductId: id,
          UserId: req.loginUser.id
        }
      })
      const decQty = selectedCart.Qty - 1
      const updatedCart = await Cart.update({
        Qty: decQty
      }, {
        where: {
          ProductId: id,
          UserId: req.loginUser.id
        },
        returning: true
      })
      res.status(200).json(updatedCart)
    } catch (error) {
      next(error)
    }
  }
}
module.exports = Controller