const { Product } = require('../models')
class ProductController {
	static async createProduct(req, res, next) {
		try {
				const payLoad = {
					name: req.body.name,
					image_url: req.body.image_url,
					price: req.body.price,
					stock: req.body.stock
				}
				const addProduct = await Product.create(payLoad)
				res.status(201).json(addProduct)
		} catch (err) {
			next(err)
		}
	}
	static async updateProduct(req, res, next) {
		try {
				const id = req.params.id
				const payLoad = {
					name: req.body.name,
					image_url: req.body.image_url,
					price: req.body.price,
					stock: req.body.stock
				}
				const update = await Product.update(payLoad, {
					where: {
						id
					},
					returning: true
				})
				if (update[0]) {
					res.status(200).json({ msg: 'Product has been updated.'})
			}
		} catch (err) {
			next(err)
		}
	}
	static async deleteProduct(req, res, next) {
		try {
			const id = +req.params.id
				const destroy = await Product.destroy({
					where: {
						id
					}
				})
				if (destroy) {
					res.status(200).json({ msg: 'Product deleted.'})
				} else {
					throw new Error({ msg: 'Product not found' })
				}
		} catch (error) {
			next(error)
		}
	}

	static async getProduct(req, res, next) {
		try {
			const getAll = await Product.findAll({
				order: [['id', 'ASC']]
			})
			res.status(200).json(getAll)
		} catch (err) {
			next(err)
		}
	}
}

module.exports = ProductController