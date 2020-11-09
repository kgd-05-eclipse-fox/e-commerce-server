const {User, Product} = require('../models')

class ProductController {
    static async addProduct(req, res, next) {
        try {
            const { name, price, image_url, stock } = req.body

            const payload = {
                name,
                price,
                image_url,
                stock
            }

            const product = await Product.create(payload) 
            res.status(201).json(product)

        } catch (error) {
            next(error)
        }
    }
    
    static async readAll (req, res, next) {
        try {
            const products = await Product.findAll({
                order: [['id', 'asc']]
            })
            res.status(200).json(products)

        } catch (error) {
            next(error)
        }
    }

    static async updateProduct (req, res,next) {
        try {
            const id = +req.params.id
            const { name, price, image_url, stock } = req.body

            const payload = {
                name,
                price,
                image_url,
                stock
            }
            
            const updated = await Product.update(payload, {
                where: {
                    id
                },
                returning: true
            })

            if (updated[0] !== 1) {
                throw { msg: 'Edit Product Failed', status: 404 }
            } else {
                res.status(200).json(updated[1][0])
            }
        } catch (error) {
            next(error)
        }
    }

    static async deleteProduct(req, res, next) {
        try {
            const id = +req.params.id
            
            const destroyed = await Product.destory({
                where: {
                    id
                }
            })
            if (destroyed !== 1) {
                throw { msg:'Delete Product Failed' , status: 404}
            } else {
                res.status(200).json({msg: 'Product Successfully Deleted'})
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ProductController