const Encrypt = require('../helpers/encrypt')
const Jwt = require('../helpers/jwt')
const { User } = require('../models')

class CustomerController {
  static async register(req, res, next) {
    try {
      const { first_name, last_name, gender, email, password } = req.body
      const newUser = await User.create({
        first_name, last_name, gender, email, password, role: 'Customer'
      })
      res.status(201).json({
        id: newUser.id,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        gender: newUser.gender,
        email: newUser.email,
        role: newUser.role
      })
    } catch(err) {
      next(err)
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({
        where: {
          email
        }
      })
      if(!user) {
        throw {name: 'WrongEmailPassword'}
      } else {
        if(!Encrypt.compare(password, user.password)) {
          throw {name: 'WrongEmailPassword'}
        } else {
          const token = Jwt.sign({
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            gender: user.gender,
            email: user.email,
            role: user.role
          })
          res.status(200).json({
            email: user.email,
            token
          })
        }
      }
    } catch(err) {
      next(err)
    }
  }
}

module.exports = CustomerController