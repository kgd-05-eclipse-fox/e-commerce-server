const transporter = require('../helpers/nodemailer')
const { Cart, User, Product } = require('../models')
const { checkout } = require('../routers/carts')

class CartController {
  static async addCart(req, res, next) {
    try {
      if (req.loggedInUser) {
        console.log(req.body.ProductId)
        const payload = {
          UserId: req.loggedInUser.id,
          ProductId: req.body.ProductId
        }
        const addCart = await Cart.findOrCreate({
          where: {
            UserId: payload.UserId,
            ProductId: payload.ProductId,
            checked_out: false
          },
          attributes: ['id', 'ProductId', 'UserId', 'qty']
        })
        res.status(201).json(addCart)
      } else {
        throw new Error()
      }
    } catch (err) {
      next(err)
    }
  }
  static async getCart(req, res, next){
    try {
      if (req.loggedInUser) {
        const showCart = await Cart.findAll({
          where: {
            UserId: req.loggedInUser.id,
            checked_out: false
          },
          include: Product,
          attributes: ['id', 'ProductId', 'qty'],
          order: [['id', 'ASC']]
        })
        res.status(200).json(showCart)
      }
    } catch (err) {
      next(err)
    }
  }
  static async deleteCart(req, res, next) {
    try {
      if (req.loggedInUser) {
        const id = req.params.id
        const deleteCart = await Cart.destroy({
          where: {
            id
          },
        })
        if (!deleteCart) {
          throw new Error()
        } else {
          res.status(200).json({msg: 'Cart Deleted!'})
        }
      }
    } catch (err) {
      next(err)
    }
  }
  static async editQty(req, res, next) {
    try {
      if (req.loggedInUser) {
        const id = req.params.id
        const qty = +req.body.qty
        const editQty = await Cart.update(({qty}), {
          where: {
            id,
            checked_out: false
          },
          returning: true
        })
        if (editQty[1]) {
          res.status(200).json(editQty[1])
        } else {
          throw new Error({msg: 'Cart Not Found!'})
        }
      }
    } catch (err) {
      console.log(err)
      next(err)
    }
  }
  static async getById(req, res, next) {
    try {
      const id = +req.params.id
      const findById = await Cart.findOne({
        where: {
          id,
          checked_out: false
        },
        include: Product,
        attributes: ['id', 'ProductId', 'qty']
      })
      res.status(200).json(findById)
    } catch (err) {
      next(err)
    }
  }
  static async checkOut(req, res, next) {
    try {
      const UserId = req.loggedInUser.id
      const checked_out = true
      let total = 0
      const findBeforeCheckout = await Cart.findAll({
        where: {
          UserId,
          checked_out: false,
        },
        include: Product
      })
      findBeforeCheckout.forEach(async el => {
        total += (el.qty * el.Product.price)
        const updateStock = await Product.update({stock: el.Product.stock - el.qty}, {
          where: {
            id: el.Product.id
          }
        })
      })
      const checkOut = await Cart.update(({checked_out}), {
        where: {
          UserId,
          checked_out: false
        },
        include: Product,
        returning: true
      })
      res.status(200).json(findBeforeCheckout)
      if (checkOut[1]) {
        let tamp = `<h1>Thank you for your purchase!</h1><br/><h4>Here is your order summary</h4>
        <table class="table" border="1px">
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Image</th>
              <th scope="col">Item Name</th>
              <th scope="col">Qty</th>
              <th scope="col">Price</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>`
        let counter = 1
        let mailOptions = {
          from: process.env.NODEMAILER,
          to: req.loggedInUser.email,
          subject: `Among Us Store - Thank you for your purchase!`,
          text: `Hi ${req.loggedInUser.email}, thank you for your purchase!`,
          html: ``
        }
        findBeforeCheckout.forEach(el => {
          tamp += `<tr>
          <th scope="row">${counter++}</th>
          <td><img src="${el.dataValues.Product.image_url}" alt="${el.dataValues.Product.name}" width="250px"></img></td>
          <td>${el.dataValues.Product.name}</td>
          <td>${el.dataValues.qty}</td>
          <td>Rp ${el.dataValues.Product.price}</td>
          <td>Rp ${el.dataValues.Product.price * el.dataValues.qty}</td>
          </tr>`
        }) 
        tamp += `<tr>
        <th scope="row">TOTAL</th>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>Rp ${total}</td>
        </tr>`
        tamp += `</tbody>
        </table>`
        mailOptions.html = tamp
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) throw err;
            console.log('Email sent: ' + info.response);
        });
      }
    } catch (err) {
      next(err)
    }
  }
  static async getHistory(req, res, next) {
    try {
      const UserId = req.loggedInUser.id
      const getHistory = await Cart.findAll({
        where: {
          UserId,
          checked_out: true
        },
        attributes: ['id', 'UserId', 'ProductId', 'qty', 'updatedAt'],
        include: Product
      })
      res.status(200).json(getHistory)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = CartController