const { Product } = require('../models')

class Controller {
    static async createProduct(req, res, next) {
        try {
            let nameType = typeof req.body.name
            let image_url = typeof req.body.image_url
            let price = typeof req.body.price
            let stock = typeof req.body.stock
            if(nameType !== 'string' || image_url !== 'string' || price !== 'number' || stock !== 'number') {
                throw { name: "Wrong data type"}
            } else {
                const payload = {
                    name: req.body.name,
                    image_url: req.body.image_url,
                    price: req.body.price,
                    stock: req.body.stock
                }
                const product = await Product.create(payload)
                res.status(201).json({id: product.id, name: product.name, image_url: product.image_url, price: product.price, stock: product.stock})
            }
        } catch (error) {
            next(error)            
        }
    }

    static async updateProduct(req, res, next) {
        try {
            let id = +req.params.id
            let nameType = typeof req.body.name
            let image_url = typeof req.body.image_url
            let price = typeof req.body.price
            let stock = typeof req.body.stock
            if(nameType !== 'string' || image_url !== 'string' || price !== 'number' || stock !== 'number') {
                throw { name: "Wrong data type"}
            } else {
                const payload = {
                    name: req.body.name,
                    image_url: req.body.image_url,
                    price: req.body.price,
                    stock: req.body.stock
                }
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
            }
        } catch (error) {
            next(error)
        }
    }

    static async deleteProduct(req, res, next) {
        try {
            let id = +req.params.id
            let result = await Product.destroy({
                where: {
                    id
                }
            })
            if(result == 0) {
                throw { name: "Not Found"}
            } else {
                res.status(200).json({ message: "Success delete product"})
            }
        }
        catch (error) {
            next(error)
        }
    }

    static async fetchProduct(req, res, next) {
        try {
            const products = await Product.findAll()
            res.status(200).json(products)
        } catch (error) {
            next(error)
        }
    }

    static async findProduct(req, res, next) {
        try {
            const id = +req.params.id
            let result = await Product.findOne({
                where: {
                    id
                }
            })
            if(result == null) {
                throw { name: "Not Found" }
            } else {
                res.status(200).json(result)
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller