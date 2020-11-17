const { User, Cart } = require('../models')

class Auth {
  static async authentication (req, res, next) {
    try {
      const { access_token } = req.headers
  
      if (!access_token) {
        throw { msg: 'Authentication Failed', status: 401 }
      } else {
        const decoded = verifyToken(access_token)
        const user = await User.findOne({
          where: {
            email: decoded.email
          }
        })
        if (!user) {
          throw { msg: 'Authentication Failed', status: 401 }
        } else {
          req.user = decoded
          next()
        }
      }
    } catch (error) {
      next(error)
    }
  }

  static async authorization (req, res, next) {
    try {
      const id = +req.params.id
      const UserId = +req.user.id
      
      const cart = await Cart.findOne({
        where: {
          id
        }
      })
      if (!cart) {
        throw { msg: 'Cart not found', status: 404 }
      } else if (cart.UserId !== UserId) {
        throw { msg: 'Not Authorized', status: 401 }
      } else {
        next()
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = Auth