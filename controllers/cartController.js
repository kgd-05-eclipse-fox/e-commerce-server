const { Product, Cart, History } = require('../models')

class CartController {
  static async readAll (req, res, next) {
    try {
      const cart = await Cart.findAll({
        where: {
          UserId: +req.user.id
        },
        include: Product,
        attributes: ['id', 'UserId', 'ProductId', 'quantity']
      })
      res.status(200).json(cart)
    } catch (error) {
      next(error)
    }
  }

  static async updateCart (req, res, next) {
    try {
      const UserId = +req.user.id
      const { ProductId, quantity } = req.body

      const cart = await Cart.findOne({
        where: {
          UserId,
          ProductId
        }
      })
      const product = await Product.findByPk(ProductId)

      if (!cart) {
        const newCart = await Cart.create({
          UserId,
          ProductId,
          quantity: 1
        })
        res.status(201).json(newCart)
      } else {
        if (product.stock < (cart.quantity + quantity)) {
          throw { status: 400, msg: 'Limit Reached' }
        } else if (cart.UserId !== UserId) {
          throw { msg: 'Not Authorized', status: 401 }
        } else {
          const updated = await Cart.increment('quantity', {
            by: +quantity,
            where: {
              UserId,
              ProductId
            },
            returning: true
          })
          if (updated[0][1] !== 1) {
            throw { status: 404, msg: 'Update Cart Failed' }
          } else {
            res.status(200).json(updated[0][0][0])
          }
        }
      }
    } catch (error) {
      next(error)
    }
  }

  static async removeCart (req, res, next) {
    try {
      const id = +req.params.id
      const destroyed = await Cart.destroy({
        where: {
          id
        }
      })
      if (destroyed !== 1) {
        throw { msg: 'Delete Cart Failed', status: 404 }
      } else {
        res.status(200).json({ msg: 'Remove cart success' })
      }
    } catch (error) {
      next(error)
    }
  }

  static async checkout (req, res, next) {
    try {
      const UserId = +req.user.id
      let checked_out = await Cart.findAll({
        where: {
          UserId
        }
      })
      checked_out = checked_out.map(item => item.dataValues)
      for (const item of checked_out) {
        await Product.decrement('stock', {
          by: item.quantity,
          where: {
            id: item.ProductId
          }
        })
      }
      await History.bulkCreate(checked_out)
      const destroyed = await Cart.destroy({
        where: {
          UserId
        }
      })
      if (destroyed >= 1) {
        res.status(200).json({ msg: 'Checked out successfullly' })
      } else {
        throw { status: 400, msg: 'Checkout failed' }
      }
    } catch (error) {
      next(error)
    }
  }

  static async getHistory (req, res, next) {
    try {
      const UserId = +req.user.id

      const history = await History.findAll({
        where: {
          UserId
        },
        include: Product
      })
      res.status(200).json(history)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = CartController