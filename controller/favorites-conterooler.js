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
        try {
            let token = req.headers.access_token
            let cekToken = JwtApp.decodedToken(token)
            let data = {
                UserId: cekToken.id,
            }
            let dataDB = await FavoritesUser.findAll({
                where: {UserId: data.UserId},
                include: Product
            })
            res.status(200).json(dataDB)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    static async deleteFavoriteProduct(req, res, next){
        console.log('masuk controller <<<<<<<<<<<<<<<<<<')
        try {
            let id = +req.params.id
            console.log(id, '<<<<<<<<<<<<<<<<<<')
            let data = await FavoritesUser.destroy({
                where: {id}
            })
            if(data === 0){
                res.status(400).json({msg: 'Your Favorite Product tidak ditemukan'})
            }else{
                res.status(200).json({msg: 'Your Favorite Product has Deleted'})
            }
        } catch (err) {
            res.status(500).json(err)
        }
    }

}

module.exports = FavoritesController