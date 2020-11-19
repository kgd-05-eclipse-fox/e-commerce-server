const { User } = require('../models/index');
const Encrypt = require('../helpers/encrypt');
const Jwt = require('../helpers/jwt');

class AdminController {
  static async register(req, res, next) {
    try {
      const { first_name, last_name, gender, email, password } = req.body;
      const newAdmin = await User.create({
        first_name, last_name, gender, email, password, role: "admin"
      });
      res.status(201).json({
        id: newAdmin.id,
        first_name: newAdmin.first_name,
        last_name: newAdmin.last_name,
        gender: newAdmin.gender,
        email: newAdmin.email,
        role: newAdmin.role
      })
    } catch(err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const admin = await User.findOne({
        where: {
          email
        }
      });
      if(!admin) {
        throw {name: 'WrongEmailPassword'}
      } else {
        if(!Encrypt.compare(password, admin.password)) {
          throw {name: 'WrongEmailPassword'}
        } else {
          const token = Jwt.sign({
            id: admin.id,
            first_name: admin.first_name,
            last_name: admin.last_name,
            gender: admin.gender,
            email: admin.email,
            role: admin.role
          })
          res.status(200).json({email: admin.email, token});
        }
      }
    } catch(err) {
      next(err)
    }
  }
}

module.exports = AdminController;