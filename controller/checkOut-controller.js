const { User, Product, ProductUser, CheckOutUser } = require('../models')
const JwtApp = require('../helper/jwt.js')

class CheckOutController{

    static async createCheckOut(req, res, next){
        try {
            let dataBody = req.body
            let token = req.headers.access_token
            let cekToken = JwtApp.decodedToken(token)
            let data = {
                UserId: cekToken.id,
                total: dataBody.total
            }
            let createDataCheckOut = await CheckOutUser.create(data)
            // let getAllDataProductUser = await ProductUser.findAll({
            //     where: {UserId: data.UserId}
            // })
            // getAllDataProductUser.forEach(el =>{
            //     let dataProduct = await Product.findOne({
            //         where: {id: el.ProductId}
            //     })
            //     console.log(dataProduct, '<<<<<<<<<<<<<<<<<< data Produck')
            // })
            let clearDataBasket = await ProductUser.destroy({
                where: {UserId: data.UserId}
            })
            res.status(201).json(createDataCheckOut)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    static async getDataCheckOut(req, res, next){
        try {
            let token = req.headers.access_token
            let cekToken = JwtApp.decodedToken(token)
            let data = {
                UserId: cekToken.id
            }
            let DataCheckOut = await CheckOutUser.findAll({
                where: {UserId: data.UserId}
            })
            res.status(200).json(DataCheckOut)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    static async deleteDataCheckOut(req, res, next){
        try {
            let id = +req.params.id
            let data = await CheckOutUser.destroy({
                where: {id}
            })
            if(data === 0){
                res.status(400).json({msg: 'CheckOutUser tidak ditemukan'})
            }else{
                res.status(200).json({msg: 'CheckOutUser has Deleted'})
            }
        } catch (err) {
            res.status(500).json(err)
        }
    }
}

module.exports = CheckOutController