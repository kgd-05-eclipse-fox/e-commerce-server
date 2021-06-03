const { User, Product, Cart, History } = require('../models')

class Controller {
  static async addCart(req, res, next) {
    try {
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
            // console.log(cart)
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
      let total = 0
      const UserId = req.loginUser.id
      const cartUser = await Cart.findAll({
        where: {
          UserId
        },
        order: [['id', 'ASC']],
        include: Product,
        attributes: ['id', 'Qty']
      })
      cartUser.forEach(el => {
        const totalHarga = el.Qty * el.Product.price
        total += totalHarga
      })
      res.status(200).json({ products: cartUser, totalPrice: total })
    } catch (error) {
      next(error)
    }
  }

  static async deleteCart(req, res, next) {
    try {
      const id = +req.params.id
      const deletedCart = await Cart.destroy({
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
      const selectedCart = await Cart.findOne({
        where: {
          id
        }
      })
      const incQty = selectedCart.Qty + 1
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
      const selectedCart = await Cart.findOne({
        where: {
          id
        }
      })
      const decQty = selectedCart.Qty - 1
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

  static async checkoutCart(req, res, next) {
    try {
      const UserId = req.loginUser.id
      const carts = await Cart.findAll({
        where: {
          UserId
        },
        include: Product
      })
      carts.forEach(async el => {
        const sisaStock = el.Product.stock - el.Qty
        const updatedStock = await Product.update({
          stock: sisaStock
        }, {
          where: {
            id: el.ProductId
          }
        })
        if(updatedStock) {
          const deletedCart = await Cart.destroy({
            where: {
              UserId: el.UserId
            }
          })
          const totalPrice = el.Qty * el.Product.price
          const payload = {
            UserId,
            product: el.Product.name,
            image_url: el.Product.image_url,
            price: totalPrice,
            qty: el.Qty
          }
          await History.create(payload)
          res.status(200).json({ message: 'Checkout success' })
        } else {
          res.status(404).json({ message: 'Data not found' })
        }
      })
    } catch (error) {
      next(error)
    }
  }
}
module.exports = Controller