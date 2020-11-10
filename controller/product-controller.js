const {Product} = require('../models')

class ProductController{
    
    static async getAllProduct(req, res, next){
        try {
            let data = await Product.findAll()
            res.status(200).json(data)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    static async getAllProductBySomeOne(req, res, next){
        try {
            
        } catch (err) {
            res.status(500).json(err)
        }
    }

    static async createProduct(req, res, next){
        try {
            let dataBody = req.body
            let UserId = req.access_token.id
            dataBody.UserId = UserId
            // let role = req.access_token.role
            // dataBody.role = role
            let data = await Product.create(dataBody)
            res.status(201).json(data)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    static async findByIdProduct(req, res, next){
        try {
            let id = +req.params.id
            let data = await Product.findByPk(id)
            res.status(200).json(data)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    static async updateProduct(req, res, next){
        try {
            let id = +req.params.id
            let dataUpdate = req.body
            let data = await Product.update(dataUpdate, {
                where: {id}
            })
            res.status(200).json(data)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    static async deleteProduct(req, res, next){
        try {
            let id = +req.params.id
            let data = await Product.destroy({
                where: {id}
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

module.exports = ProductController