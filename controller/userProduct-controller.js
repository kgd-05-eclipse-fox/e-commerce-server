const {User, Product, ProductUser} = require('../models')
const JwtApp = require('../helper/jwt.js')

class UserProduct{

    static async postProductUser(req, res, next){
        try {
            let dataBody = req.body
            let token = req.headers.access_token
            let cekToken = JwtApp.decodedToken(token)
            let data = {
                UserId: cekToken.id,
                ProductId: +dataBody.ProductId
            }
            let cekBasket = await ProductUser.findAll({
                where: {ProductId: data.ProductId, UserId: data.UserId}
            })
            if(cekBasket.length === 0){
                let createProduct = await ProductUser.create(data)
                res.status(201).json(createProduct)
            }else{
                let updateQuantity = cekBasket[0].dataValues.quantity + 1
                let dataUpdate = {
                    UserId: cekToken.id,
                    ProductId: +dataBody.ProductId,
                    quantity: updateQuantity
                }
                let updateProduct = await ProductUser.update(dataUpdate, {
                    where: {ProductId: data.ProductId, UserId: data.UserId},
                    returning: true
                })
                let showDataUpdate = {
                    id: updateProduct[1][0].dataValues.id,
                    UserId: updateProduct[1][0].dataValues.UserId,
                    ProductId: updateProduct[1][0].dataValues.ProductId,
                    quantity: updateProduct[1][0].dataValues.quantity
                }
                res.status(200).json(showDataUpdate)
            }
        } catch (err) {
            res.status(500).json(err)
        }
    }

    static async getDataUserProduct(req, res, next){
        try {
            let token = req.headers.access_token
            let cekToken = JwtApp.decodedToken(token)
            let data = {
                UserId: cekToken.id
            }
            let getAllDataProductUser = await ProductUser.findAll({
                where: {UserId: data.UserId},
                include: Product
            })
            // let total = 0
            // getAllDataProductUser.forEach(el =>{
            //   total += el.Product.price
            // })
            // get data product "getAllDataProductUser[0].Product.image_url"
            res.status(200).json(getAllDataProductUser)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    static async deleteUserProduct(req, res, next){
        try {
            let dataBody = +req.body.id
            let data = await ProductUser.destroy({
                where: {id: dataBody}
            })
            if(data === 0){
                res.status(400).json({msg: 'Product tidak ditemukan'})
            }else{
                res.status(200).json({msg: 'Product has Deleted'})
            }
        } catch (err) {
            res.status(500).json(err)
        }
    }
}

module.exports = UserProduct