const { History } = require('../models')

class Controller {
  static async fetchHistory(req, res, next) {
    try {
      const UserId = req.loginUser.id
      const historyUser = await History.findAll({
        where: {
          UserId
        }
      })
      if(historyUser) {
        res.status(200).json(historyUser)
      } else {
        throw { name: "History not found"}
      }
    } catch (error) {
      next(error)
    }
  }
}
module.exports = Controller