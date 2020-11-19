const { UserCart, Product, TransactionHistory, sequelize } = require('../models/')
const sendMail = require('../helpers/nodemailer')

class CartController {
    static async getMyCarts (req, res, next) {
        try {
            const { id } = req.whoAmI
            const myCarts = await UserCart.findAll({
                where: {
                    UserId: id
                },
                include: Product,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                order: [['id', 'ASC']]
            })
            let totalPrice = 0

            myCarts.forEach(cart => {
                const { qty, Product } = cart
                const { price } = Product
                totalPrice += qty * price
            })
            
            res.status(200).json({ myCarts: myCarts, totalPrice: totalPrice })
        } catch (error) {
            next(error)
        }
    }

    static async postMyCart (req, res, next) {
        try {
            const { id } = req.whoAmI
            const ProductId = req.params.id
            const payload = {
                UserId: id,
                ProductId: ProductId
            }

            const findMyCart = await UserCart.findOne({
                where: payload
            })
            
            if (!findMyCart) {
                const findProduct = await Product.findOne({
                    where: {
                        id: payload.ProductId
                    }
                })

                const { stock } = findProduct

                if (stock == 0) {
                    throw new Error('Out of stock')
                } else {
                    const createCart = await UserCart.create(payload)
                    if (createCart) res.status(201).json({ message: 'Cart successfully added' })
                }
            } else {
                const findProduct = await Product.findOne({
                    where: {
                        id: payload.ProductId
                    }
                })

                const { qty } = findMyCart
                const { stock } = findProduct

                if (qty + 1 > stock) {
                    throw new Error('Exceeds the available stock')
                } else {
                    findMyCart.qty ++
                    await findMyCart.save()
                    res.status(200).json({ message: 'Successfuly Added Cart Quantity'})
                }
            }
        } catch (error) {
            next(error)
        }
    }

    static async patchMyCart (req, res, next) {
        try {
            const { increment } = req.body
            const id = { id: req.params.id }
            console.log(increment, id, 'di cartttt')

            const findMyCart = await UserCart.findOne({
                where: id
            })

            const ProductId = { id: findMyCart.ProductId }

            const findProduct = await Product.findOne({
                where: ProductId
            })

            const { stock } = findProduct
            const { qty } = findMyCart

            if (increment) {
                if (qty + 1 > stock) throw new Error('Exceeds the available stock')
                findMyCart.qty ++
                await findMyCart.save()
                res.status(200).json({ message: 'Successfuly Updated Cart Quantity'})
            } else {
                if (qty - 1 <= 0) throw new Error('Less than available stock')
                findMyCart.qty --
                await findMyCart.save()
                res.status(200).json({ message: 'Successfuly Updated Cart Quantity'})
            }
        } catch (error) {
            next(error)
        }
    }

    static async deleteMyCart (req, res, next) {
        try {
            const id = { id: req.params.id }
            await UserCart.destroy({
                where: id
            })
            
            res.status(200).json({ message: 'Successfuly Deleted Cart' })
        } catch (error) {
            next(error)
        }
    }

    static async checkoutCart (req, res, next) {
        try {
            const { carts } = req.body
            const UserId = req.whoAmI.id
            const { email } = req.whoAmI
            const uuid = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyx0123456789'
            const items = []
            let invoiceId = ''

            for (let i = 0; i < 5; i++) {
                invoiceId += uuid[Math.floor(Math.random() * uuid.length)]
            }

            // * START OF LOOPING CART
            await sequelize.transaction(async t => {
                for (const cart of carts) {
                    const { qty } = cart
                    const { id } = cart.Product
                    const product = await Product.findOne({
                        where: {
                            id: id
                        }
                    })
    
                    const total_price = product.price * qty
    
                    const payload = {
                        UserId: UserId,
                        name: product.name,
                        image_url: product.image_url,
                        total_price: total_price,
                        qty: qty
                    }
    
                    // product.stock -= qty
                    // await product.save()
                    await Product.update({
                        stock: product.stock - qty
                    }, { 
                        where: {
                            id: product.id
                        },
                        transaction: t
                    })
                    await TransactionHistory.create(payload, { transaction: t })
                    const option = { id: cart.id }
                    await UserCart.destroy({
                        where: option
                    })
    
                    items.push(`
                        <li>
                            <p>Name: ${product.name}</p>
                            <p>Qty: ${qty}</p>
                            <p>Total Price: IDR ${total_price}</p>
                        </li>
                    `)
                }
            })
            // * END OF LOOPING CART

            const sendEmailCheckout = {
                checkout: {
                    subject: `
                    Your Invoice ${invoiceId}/INV/${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}/STPDIA
                    `,
                    items: items
                },
                email: email
            }

            sendMail(email, sendEmailCheckout)

            res.status(200).json({ message: 'Successfully Checkout All Products'})
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}

module.exports = CartController
