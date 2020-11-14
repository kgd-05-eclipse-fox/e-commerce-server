const { Product } = require('../models')

class ProductController {
    static fetchDataProduct (req, res, next) {
        Product.findAll()
        .then(product => {
            res.status(201).json({
                product
            })
        })
        .catch(err => {
            next(err)
        })
    }

    static fetchProductById (req, res, next) {
        const id = +req.params.id
        Product.findByPk(id)
        .then(product => {
            res.status(200).json(product)
        })
        .catch(err => {
            next(err)
        })
    }

    static postProduct (req, res, next) {
        const payload = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }
        Product.create(payload)
        .then(product => {
            res.status(201).json(product)
        })
        .catch(err => {
            next(err)
        })
    }

    static putProduct (req, res, next) {
        const id = +req.params.id

        const payload = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }
        Product.update(payload, {
            where: {
                id
            }, returning: true
        })
        .then(product => {
            res.status(200).json({
                message: 'The product has been updated'
            })
        })
        .catch(err => {
            next(err)
        })
    }

    static deleteProduct (req, res, next) {
        const id = +req.params.id
        Product.destroy({
            where: {
                id
            }
        })
        .then(() => {
            res.status(200).json({message: 'The product has been deleted'})
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = ProductController;