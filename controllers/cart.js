const { Product, Cart, History } = require('../models')
const createError = require('http-errors')

class CartController {
	static async listCart(req, res, next) {
		try {
			const cart = await Cart.findAll({
				where: {
					UserId: req.myUser.id,
					status: false,
				},
				include: [{ model: Product }],
				order: [['id', 'DESC']],
				attributes: ['id', 'UserId', 'status', 'quantity', 'ProductId'],
			})
			res.status(200).json(cart)
		} catch (error) {
			next(error)
		}
	}

	static async postCart(req, res, next) {
		console.log(req.body)
		const { ProductId } = req.body
		const UserId = req.myUser.id
		const { quantity } = req.body
		try {
			const post = await Cart.findOne({ where: { ProductId } })

			if (post) {
				const data = await post.update({
					quantity: post.quantity + +quantity,
				})
				res.status(201).json({ status: 'success', data: data })
			} else {
				console.log('objecdassafat')
				const push = await Cart.create({ ProductId, UserId, quantity })

				res.status(201).json({ status: 'success', data: push })
			}
		} catch (error) {
			next(error)
		}
	}

	static async delete(req, res, next) {
		const { id } = req.params
		try {
			const deleted = await Cart.destroy({
				where: { id },
				include: [{ model: Product }],
			})
			if (!deleted) {
				throw createError(400, 'not found')
			}
			res.status(201).json({ status: 'success', data: deleted })
		} catch (error) {
			next(error)
		}
	}

	static async updated(req, res, next) {
		let newStatus = null
		try {
			const cartData = await Cart.findOne({
				where: {
					UserId: req.myUser.id,
				},
			})
			if (!cartData) {
				throw createError(404, 'Cart not found')
			} else {
				if (cartData.status) {
					newStatus = false
				} else {
					newStatus = true
				}
			}
			const updatedCart = cartData.update({ status: newStatus })
			res.status(200).json(newStatus)
		} catch (error) {
			next(error)
		}
	}

	static async payment(req, res, next) {
		try {
			const fullPayment = await Cart.findAll({
				where: {
					UserId: req.myUser.id,
					status: true,
				},
				include: [{ model: Product }],
				order: [['id', 'DESC']],
				attributes: ['id', 'UserId', 'quantity'],
			})

			let data = {
				UserId: req.myUser.id,
				product: [],
				totalQuantity: 0,
				totalPrice: 0,
			}

			console.log(fullPayment, 'masukkk')
			fullPayment.forEach((result) => {
				if (result.quantity > result.Product.stock) {
					// console.log(total)
					// console.log(total.quantity)
					throw createError(
						400,
						`jumlah stock ${total.Product.name} kurang`
					)
				} else {
					result.Product.update({
						stock: result.Product.stock - result.quantity,
					})
					data.product.push({
						name: result.Product.name,
						quantity: result.quantity,
						price: result.Product.price,
						subTotal: result.quantity * result.Product.price,
					})
					;(data.totalPrice += result.quantity * result.Product.price),
						(data.totalQuantity += result.quantity)
				}

				console.log(data, 'dataaa')
			})
			// if (data.product == []) {
			//     next( createError(400,'empty trolley'))
			// }
			const pushHistory = await History.create(data)
			const deleted = await Cart.destroy({
				where: { UserId: pushHistory.UserId },
			})
			res.status(200).json(pushHistory)
			// console.log(pushHistory.UserId);
		} catch (error) {
			console.log(error)
			next(error)
		}
	}
}

module.exports = CartController
