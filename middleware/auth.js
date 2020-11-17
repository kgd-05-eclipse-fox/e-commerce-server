const { verifyToken } = require('../helpers/jwt')
const { User, Cart } = require('../models')

async function authentication(req, res, next) {
    try {
        const token = req.headers.accesstoken
        if(!token) {
            throw { msg: "Please login first", status: 401 }
        } else {
            const decodeToken = verifyToken(token)
            // console.log(decodeToken)
            // if(decodeToken.role !== 'admin') {
            //     throw { msg: "You dont have permissions", status: 401 }
            // } else {
            //     next()
            // }
            const selectedUser = await User.findOne({
                where: {
                    email: decodeToken.email
                }
            })
            if(selectedUser.role !== 'admin') {
                throw { msg: "You dont have permissions", status: 401 }
            } else {
                req.loginUser = selectedUser
                next()
            }
        }
    } catch (error) {
        res.status(error.status).json({message: error.msg})
    }
    
}
async function authenticationCustomer(req, res, next) {
    try {
        const token = req.headers.accesstoken
        if(!token) {
            throw { msg: "Please login first", status: 401}
        } else {
            const decodeToken = verifyToken(token)
            const user = await User.findOne({
                where: {
                    email: decodeToken.email
                }
            })
            req.loginUser = user
            next()
        }
    } catch (error) {
        res.status(error.status).json({message: error.msg})
    }
}
async function authorization(req, res, next) {
    try {
        const cartId = +req.params.id
        const cart = await Cart.findOne({
            where: {
                id: cartId
            }
        })
        // console.log(cart)
        if(cart == null) {
            throw { msg: "Data not found", status: 404 }
        } else {
            if(cart.UserId == req.loginUser.id) {
                next()
            } else {
                throw { msg: "Not authorized to delete this post", status: 404 }
            }
        }
    } catch (error) {
        res.status(error.status).json(error.msg)
    }
}

module.exports = {
    authentication,
    authorization,
    authenticationCustomer
}