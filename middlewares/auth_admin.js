const { User, Product, Banner } = require('../models')
const { verifyToken } = require('../helpers/jwt')

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

  static async authorization_banner (req, res, next) {
    try {
      if (req.params.id) {
        const id = +req.params.id
        const banner = await Banner.findByPk(id)
  
        if (req.user.role !== 'admin') {
          throw {
            msg: 'Not Authorized',
            status: 401
          }
        } else if (!banner) {
          throw { msg: 'banner is not found', status: 404 }
        } else {
          next()
        }
      } else {
        if (req.user.role !== 'admin') {
          throw { msg: 'Not Authorized', status: 401 }
        } else {
          next()
        }
      }
    } catch (error) {
      next(error)
    }
  }

  static async authorization_product (req, res, next) {
    try {
      if (req.params.id) {
        const id = +req.params.id
        const product = await Product.findByPk(id)
  
        if (req.user.role !== 'admin') {
          throw { msg: 'Not Authorized', status: 401 }
        } else if (!product) {
          throw { msg: 'Product is not found', status: 404 }
        } else {
          next()
        }
      } else {
        if (req.user.role !== 'admin') {
          throw { msg: 'Not Authorized', status: 401 }
        } else {
          next()
        }
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = Auth