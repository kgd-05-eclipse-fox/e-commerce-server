const { User, Product, Cart } = require('../models')

class Controller {
  static async addCart(req, res, next) {
    try {
      const payload = {
        UserId: req.loginUser.id,
        ProductId: req.body.ProductId,
        Qty: +req.body.Qty
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
          if(addQty >= product.stock) {
            res.status(400).json({ message: 'Product out of stock' })
          } else {
            const updatedCart = await Cart.update({
              Qty: addQty
            }, {
              where: {
                id: cart.id
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
        }
      })
      res.status(200).json(cartUser)
    } catch (error) {
      next(error)
    }
  }

  static async deleteCart(req, res, next) {
    try {
      const id = +req.params.id
      const deletedProduct = await Cart.destroy({
        where: {
          id
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
      const addOne = +req.body.amount
      const selectedCart = await Cart.findOne({
        where: {
          id
        }
      })
      const incQty = selectedCart.Qty + addOne
      const updatedCart = await Cart.update({
        Qty: incQty
      }, {
        where: {
          id
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
      const minusOne = +req.body.amount
      const selectedCart = await Cart.findOne({
        where: {
          id
        }
      })
      const decQty = selectedCart.Qty - minusOne
      const updatedCart = await Cart.update({
        Qty: decQty
      }, {
        where: {
          id
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