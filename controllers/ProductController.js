const { Product } = require('../models')

class Controller {
    static async createProduct(req, res, next) {
        try {
            const payload = {
                name: req.body.name,
                image_url: req.body.image_url,
                price: req.body.price,
                stock: req.body.stock
            }
            console.log(payload)
            const product = await Product.create(payload)
            console.log(product)
            res.status(201).json({id: product.id, name: product.name, image_url: product.image_url, price: product.price, stock: product.stock})
        } catch (error) {
            next(error)            
        }
    }

    static async updateProduct(req, res, next) {
        try {
            let id = req.body.id
            const payload = {
                name: req.body.name,
                image_url: req.body.image_url,
                price: req.body.price,
                stock: req.body.stock
            }
            console.log(id, 'ini di controller')
            let result = await Product.update(payload, {
                where: {
                    id
                },
                returning: true
            })
            if(result[0] == 0) {
                throw { name: "Not Found"}
            } else {
                res.status(200).json(result[1][0])
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller