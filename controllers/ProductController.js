const { Product } = require('../models/')

class ProductController {
    static async getAllProduct(req, res, next) {
        try {
            const findAll = await Product.findAll()

            res.status(200).json({ products: findAll })
        } catch (error) {
            next(error)
        }
    }

    static async postCreateProduct(req, res, next) {
        try {
            const { name, image_url, price, stock } = req.body

            const newProduct = {
                name: name,
                image_url: image_url,
                price: price,
                stock: stock
            }
            const createProduct = await Product.create(newProduct)

            newProduct.id = createProduct.id

            res.status(201).json(newProduct)
        } catch (error) {
            next(error)
        }
    }

    static async putUpdateProduct(req, res, next) {
        try {
            const id = +req.params.id
            const { name, image_url, price, stock } = req.body

            const newProductData = {
                name: name,
                image_url: image_url,
                price: price,
                stock: stock
            }

            const updateProduct = await Product.update(newProductData, { where: { id: id }})
            if(updateProduct[0]) {
                res.status(200).json({ message: 'Product successfully updated' })
            } else {
                throw new Error('Product not found')
            }
        } catch (error) {
            next(error)
        }
    }

    static async deleteProduct(req, res, next) {
        try {
            const id = +req.params.id

            const deleteProd = await Product.destroy({ where: { id: id }})
            if(deleteProd) {
                res.status(200).json({ message: 'Product has been deleted' })
            } else {
                throw new Error('Product not found')
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ProductController