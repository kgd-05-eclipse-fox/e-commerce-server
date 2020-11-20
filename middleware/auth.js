const { verifyToken } = require('../helpers/jwt')
const { User, Cart } = require('../models')

async function authentication(req, res, next) {
    try {
        const token = req.headers.access_token
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
                },
                attributes: {
                    exclude: ['password', 'createdAt', 'updatedAt']
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
        const token = req.headers.access_token
        if(!token) {
            throw { msg: "Please login first", status: 401}
        } else {
            const decodeToken = verifyToken(token)
            const user = await User.findOne({
                where: {
                    email: decodeToken.email
                },
                attributes: {
                    exclude: ['password', 'createdAt', 'updatedAt']
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
        const id = +req.params.id
        const cart = await Cart.findOne({
            where: {
                id
            }
        })
        if(cart == null) {
            throw { msg: "Data not found", status: 404 }
        } else {
            if(cart.UserId == req.loginUser.id) {
                next()
            } else {
                throw { msg: "You are not authorized", status: 400 }
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