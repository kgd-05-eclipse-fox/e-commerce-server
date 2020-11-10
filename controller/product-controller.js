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
            if(dataBody.name === ''){
                res.status(401).json({msg: 'the product name cannot be blank'})
            }else if(dataBody.stock < 0){
                res.status(401).json({msg: 'product stock must not be below 0'})
            }else if(dataBody.price < 0){
                res.status(401).json({msg: 'product prices must not be below 0'})
            }else if(dataBody.price !== +dataBody.price){
                res.status(401).json({msg: 'product prices must not be integer'})
            }else{
                let UserId = req.access_token.id
                if(req.access_token.role !== 'admin'){
                    res.status(401).json({msg: 'invalid Token'})
                }else{
                    dataBody.UserId = UserId
                    // let role = req.access_token.role
                    // dataBody.role = role
                    let data = await Product.create(dataBody)
                    res.status(201).json(data)
                }
            }
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
            let id = req.params.id
            let dataUpdate = req.body
            if(dataUpdate.stock < 0){
                res.status(401).json({msg: 'product stock must not be below 0'})
            }else if(dataUpdate.price !== +dataUpdate.price){
                res.status(401).json({msg: 'product prices must not be integer'})
            }else if(dataUpdate.price < 0){
                res.status(401).json({msg: 'product prices must not be below 0'})
            }else{
                let data = await Product.update(dataUpdate, {
                    where: {id},
                    returning: true
                })
                let dataShow = {
                    id: data[1][0].dataValues.id,
                    name: data[1][0].dataValues.name,
                    image_url: data[1][0].dataValues.image_url,
                    price: data[1][0].dataValues.price,
                    stock: data[1][0].dataValues.stock,
                }
                res.status(200).json(dataShow)
            }
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