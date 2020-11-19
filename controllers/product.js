const { Product } = require('../models/index')

class ProductController {
    static async browse(req, res, next) {
        try {
            const products = await Product.findAll();
            res.status(200).json(products);
        } catch (error) {
            next(error);
        }
    }
    static async read(req, res, next) {
        try {
            const product = await Product.findByPk(req.params.id)
            if(product === null) {
                next({
                    name: 'NotFound',
                    errors: 'Product not found'
                })
            } else {
                res.status(200).json(product)
            }
        } catch (error) {
            next(error)
        }
    }
    static async edit(req, res, next) {
        const newProduct = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }
        try {
            const product = await Product.update(newProduct, {
                where: {id: req.params.id}
            })
            if(product == 0) {
                next({
                    name: 'NotFound',
                    errors: 'Product Not Found'
                })
            } else {
                res.status(201).json({
                    name: newProduct.name
                })
            }
        } catch (err) {
            next(err)
        }
    }
    static async add(req, res, next) {
        const product = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }
        try {
            const result = await Product.create(product)
            res.status(201).json(result)
        } catch (err) {
            next(err)
        }
    }
    static async delete(req, res, next) {
        try {
            const data = await Product.findByPk(req.params.id)
            const product = await Product.destroy({where: {id: req.params.id}})
            if(product == 0) {
                next({
                    name: 'NotFound',
                    errors: 'Product Not Found'
                })
            } else {
                res.status(200).json({
                    name: data.name
                })
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = ProductController