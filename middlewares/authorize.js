const { User } = require('../models/index')

class Authorize {
  static async admin(req, res, next) {
    try {
      const you = req.loggedIn;
      if(you.role !== 'admin') {
        throw {name: 'OutOfAuthority'}
      } else {
        next();
      }
    } catch(err) {
      next(err);
    }
  }
}

module.exports = Authorize;
