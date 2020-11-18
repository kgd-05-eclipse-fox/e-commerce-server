const { User, Product, ProductUser } = require('../models')

class CheckOutController{

    static async createCheckOut(req, res, next){
        console.log('masuk controller <<<<<<<<<<<<<<<<<<<')
        try {
            let dataBody = req.body
            console.log(dataBody)
        } catch (err) {
            res.status(500).json(500)
        }
    }
}

module.exports = CheckOutController