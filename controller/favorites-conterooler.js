const { User, Product, FavoritesUser } = require('../models')
const JwtApp = require('../helper/jwt.js')

class FavoritesController{

    static async postFavoritProduct(req, res, next){
        try {
            let dataBody = req.body.ProductId
            let token = req.headers.access_token
            let cekToken = JwtApp.decodedToken(token)
            let data = {
                UserId: cekToken.id,
                ProductId: dataBody
            }
            let createDataFavorit = await FavoritesUser.create(data)
            res.status(201).json(createDataFavorit)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    static async getDataFavorit(req, res, next){
        console.log('masuk controller <<<<<<<<<<<<<<<')
        try {
            let token = req.headers.access_token
            let cekToken = JwtApp.decodedToken(token)
            let data = {
                UserId: cekToken.id,
            }
            let data = await FavoritesUser.findAll({
                where: {UserId: data.UserId}
            })
            console.log(data, 'XXXXXXXXXXXXXX')
            // res.status(200).json(data)
        } catch (err) {
            console.log(err, '<<<<<<<<<<<<<<<<<<')
            res.status(500).json(err)
        }
    }

}

module.exports = FavoritesController