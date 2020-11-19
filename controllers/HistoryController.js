const { TransactionHistory } = require('../models/')

class HistoryController {
    static async getHistory (req, res, next) {
        try {
            const { id } = req.whoAmI
            const myHistory = await TransactionHistory.findAll({
                where: {
                    UserId: id
                },
                order: [['id', 'DESC']]
            })

            res.status(200).json({ myHistory: myHistory })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = HistoryController