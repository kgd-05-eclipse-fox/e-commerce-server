const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { getToken } = require('../helpers/jwt')
class Controller {
    static async loginAdmin(req, res, next) {
        try {
            const payload = {
                email: req.body.email,
                password: req.body.password
            }
            const user = await User.findOne({
                where: {
                    email: payload.email,
                    role: 'admin'
                }
            })
            if(user) {
                let hashPassword = user.password
                let result = comparePassword(payload.password, hashPassword)
                if(!result) {
                    throw { name: "Wrong Data" }
                } else {
                    const payload = { 
                        id: user.id, 
                        email: user.email
                    }
                    const token = getToken(payload)
                    const httpCode = 200
                    const userData = {
                        id: user.id,
                        access_token: token
                    }
                    res.status(httpCode).json(userData)
                }
            } else {
                throw { name: "Wrong Data" }
            }
        } catch (error) {
            next(error)
        }
    }

    static async loginCustomer(req, res, next) {
        try {
            const payload = {
                email: req.body.email,
                password: req.body.password
            }
            const user = await User.findOne({
                where: {
                    email: payload.email,
                    role: 'customer'
                }
            })
            if(user) {
                let hashPassword = user.password
                let result = comparePassword(payload.password, hashPassword)
                if(!result) {
                    throw { name: "Wrong Data" }
                } else {
                    const payload = { 
                        id: user.id, 
                        email: user.email
                    }
                    const token = getToken(payload)
                    const httpCode = 200
                    const userData = {
                        id: user.id,
                        access_token: token
                    }
                    res.status(httpCode).json(userData)
                }
            } else {
                throw { name: "Wrong Data" }
            }
        } catch (error) {
            next(error)
        }
    }

    static async registerCustomer(req, res, next) {
        try {
            const payload = {
                email: req.body.email,
                password: req.body.password
            }
            const user = await User.create(payload)
            res.status(201).json({id: user.id, email: user.email})
        } catch (error) {
            next(error)
        }
    }
}
module.exports = Controller