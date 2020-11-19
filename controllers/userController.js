const { User } = require('../models')
const { compare } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')

class UserController {
  static async register(req, res, next) {
    try {
      const payload = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      }

      const user = await User.create(payload)

      const data = {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role
      }

      const token = signToken(data)
      res.status(201).json({
        access_token: token,
        user: data
      })
    } catch (err) {
      next(err)
    }
  }

  static async loginAdmin(req, res, next) {
    try {
      const payload = {
        email: req.body.email,
        password: req.body.password
      }

      const user = await User.findOne({
        where: {
          email: payload.email,
          role: 'admin'
        }
      })

      if (!user) {
        throw {
          msg: 'email or password is incorrect',
          status: 401
        }
      } else if (user.role !== 'admin') {
        throw {
          msg: 'You are not authorized to see this site',
          status: 401
        }
      } else if (!compare(payload.password, user.password)) {
        throw {
          msg: 'email or password is incorrect',
          status: 401
        }
      } else {
        const payload = {
          id: user.id,
          email: user.email,
          username: user.username,
          role: user.role
        }
        const token = signToken(payload)
        res.status(200).json({
          access_token: token
        })
      }

    } catch (err) {
      next(err)
    }
  }

  static async loginCostumer(req, res, next) {
    try {
      const payload = {
        email: req.body.email,
        password: req.body.password
      }

      const user = await User.findOne({
        where: {
          email: payload.email,
          role: 'customer'
        }
      })

      if (!user) {
        throw {
          msg: 'email or password is incorrect',
          status: 401
        }
      } else if (!compare(payload.password, user.password)) {
        throw {
          msg: 'email or password is incorrect',
          status: 401
        }
      } else {
        const payload = {
          id: user.id,
          email: user.email,
          username: user.username,
          role: user.role
        }
        const token = signToken(payload)
        res.status(200).json({
          access_token: token,
          user: payload
        })
      }

    } catch (err) {
      next(err)
    }
  }
}

module.exports = UserController