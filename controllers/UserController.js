const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')

class UserController {
    static register (req, res, next) {
        const newUser = {
            email: req.body.email,
            password: req.body.password
        }
        User.create(newUser) 
        .then(user => {
            res.status(201).json({
                id: user.id,
                email: user.email
            })
        })
        .catch(err => {
            next(err)
        })
    }

    static loginAdmin (req, res, next) {
        const payload = {
            email: req.body.email,
            password: req.body.password
        }
        User.findOne({
            where: {
                email: payload.email
            }
        })
        .then(user => {
            if (!user) {
                throw {status: 401, message: 'Invalid email/password'}
            } else if (!comparePassword(payload.password, user.password)) {
                throw {status: 401, message: 'Invalid email/password'}
            } else {
                const access_token = signToken({
                    id: user.id,
                    email: user.email,
                    role: user.role
                })
                res.status(200).json({
                    access_token: access_token
                })
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static loginCustomer(req, res, next) {
        const payload = {
            email: req.body.email,
            password: req.body.password
        }
        User.findOne({
            where: {
                email: payload.email
            }
        })
        .then(user => {
            if(!user) {
                throw {status: 401, message: 'Invalid email/password'}
            } else if (!comparePassword(payload.password, user.password)) {
                throw {status: 401, message: 'Invalid email/password'}
            } else {
                const access_token = signToken({
                    id: user.id,
                    email: user.email,
                    role: user.role
                })
                res.status(200).json({
                    access_token: access_token
                })
            }
        })
        .catch(err => {
            next(err)
        })
    }
}   

module.exports = UserController;