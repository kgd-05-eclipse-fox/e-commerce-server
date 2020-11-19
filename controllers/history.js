const { History } = require('../models')

module.exports = class HistoryController {
	static async listHistory(req, res, next) {
		try {
			const list = await History.findAll({
				where: { UserId: req.myUser.id },
			})
			res.status(200).json(list)
		} catch (error) {
			next(error)
		}
	}
}
