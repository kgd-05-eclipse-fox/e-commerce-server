const { Product } = require('../models')
class ProductController {
	static async createProduct(req, res, next) {
		try {
			if (req.loggedInUser.role === 'admin') {
				const payLoad = {
					name: req.body.name,
					image_url: req.body.image_url,
					price: req.body.price,
					stock: req.body.stock
				}
				const addProduct = await Product.create(payLoad)
				res.status(201).json(addProduct)
			} else {
				throw new Error('Unauthorized')
			}
		} catch (err) {
			next(err)
		}
	}
	static async updateProduct(req, res, next) {
		try {
			if (req.loggedInUser.role === 'admin') {
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
				console.log(update, '<<')
				if (update[0]) {
					res.status(200).json({ msg: 'Product has been updated.'})
				} else {
					throw new Error({msg: 'Internal Server Error!'})
				}
			}
		} catch (err) {
			next(err)
		}
	}
	static async deleteProduct(req, res, next) {
		try {
			const id = +req.params.id
			if (req.loggedInUser.role === 'admin') {
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
			}
		} catch (error) {
			next(error)
		}
	}
}

module.exports = ProductController