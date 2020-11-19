const { Product, Cart, Transcation } = require('../models/index')

class CustomerController {
	static async browse(req, res, next) {
		try {
			const products = await Product.findAll()
			res.status(200).json(products)
		} catch (error) {
			next(error)
		}
	}
	static async read(req, res, next) {
		try {
			const product = await Product.findByPk(req.params.id)
			if (product === null) {
				next({
					name: 'NotFound',
					errors: 'Product not found',
				})
			} else {
				res.status(200).json(product)
			}
		} catch (error) {
			next(error)
		}
	}
	static async addCart(req, res, next) {
		try {
			const product = await Product.findByPk(req.params.id)
			if (product === null) {
				next({
					name: 'NotFound',
					errors: 'Product not found',
				})
			} else {
				const carts = await Cart.findOne({
					where: {
						ProductId: req.params.id,
					},
				})
				if (carts === null) {
					const cart = {
						UserId: req.userLogin.id,
						ProductId: req.params.id,
					}
					const result = await Cart.create(cart)
					res.status(201).json(result)
				} else {
					next({
						name: 'ValidationError',
						errors: 'Product Already in your cart',
					})
				}
			}
		} catch (error) {
			next(error)
		}
	}
	static async showCart(req, res, next) {
		try {
			const carts = await Cart.findAll({
				include: Product,
				where: {
					UserId: req.userLogin.id,
				},
			})
			res.status(200).json(carts)
		} catch (error) {
			next(error)
		}
	}
	static async deleteCartItem(req, res, next) {
		try {
			await Cart.destroy({
				where: {
					id: req.params.id,
				},
			})
			res.status(200).json({
				message: 'Successfully delete item in your cart',
			})
		} catch (error) {
			next(error)
		}
	}
	static async checkout(req, res, next) {
		try {
			const carts = await Cart.findAll({
				include: Product,
				where: {
					UserId: req.userLogin.id,
				},
			})
			let total = 0
			let productId = []
			let detailProduct = carts.map((temp) => {
				productId.push(temp.ProductId)
				total += temp.Product.price
				return `product: ${
					temp.Product.name
				} - Rp.${temp.Product.price.toLocaleString('id-ID')}`
			})
			const checkout = {
				email: req.userLogin.email,
				detail: detailProduct.join(', '),
				total: total,
				UserId: req.userLogin.id,
			}
			const products = await Product.findAll({ where: { id: productId } })
			products.map((temp) => {
				if (temp.stock === 1) {
					Product.destroy({ where: { id: temp.id } })
				} else {
					Product.update(
						{ stock: temp.stock - 1 },
						{ where: { id: temp.id } }
					)
				}
			})
			await Cart.destroy({
				where: {
					UserId: req.userLogin.id,
				},
			})
			const result = await Transcation.create(checkout)
			res.status(201).json(result)
		} catch (error) {
			next(error)
		}
	}
	static async showTransaction(req, res, next) {
		try {
			const Transcations = await Transcation.findAll({
				attributes: ['id', 'email', 'detail', 'total', 'createdAt'],
				where: {
					UserId: req.userLogin.id,
				},
			})
			res.status(200).json(Transcations)
		} catch (error) {
			next(error)
		}
	}
	static async deleteTransaction(req, res, next) {
		try {
			await Transcation.destroy({
				where: {
					id: req.params.id,
				},
			})
			res.status(200).json({
				message: 'Successfully delete your selected Transcation history',
			})
		} catch (error) {
			next(error)
		}
	}
}
module.exports = CustomerController
