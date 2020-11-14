const { User } = require('../models/')
const axios = require('axios')
const { verifyPassword } = require('../helpers/bcrypt')
const { jwtSign } = require('../helpers/jwt')

class UserController {
    static async postAdminLogin(req, res, next) {
        try {
            const { email, password } = req.body
            if (!email || !password) throw new Error('Please complete all form')

            const findUser = await User.findOne({ where: { email: email }})
            if (findUser) {
                const verify = verifyPassword(password, findUser.password)
                if (verify) {
                    const payload = {
                        role: findUser.role,
                        email: findUser.email
                    }
                    const access_token = jwtSign(payload)
                    res.status(200).json({ access_token, email: email })
                } else {
                    throw new Error('Wrong email or password')
                }
            } else {
                throw new Error('Wrong email or password')
            }
        } catch (error) {
            next(error)
        }
    }

    static async postUserRegister(req, res, next) {
        try {
            const { email, password } = req.body
            const newUser = {
                email: email,
                password: password
            }
            const createUser = await User.create(newUser)
            res.status(201).json({ email: createUser.email })
        } catch (error) {
            next(error)
        }
    }

    static async postUserLogin(req, res, next) {
        try {
            const { email, password } = req.body
            if(!email || !password) throw new Error('Please complete all form')

            const findUser = await User.findOne({ where: { email: email } })
            if(findUser) {
                const verif = verifyPassword(password, findUser.password)
                if(verif) {
                    res.status(200).json({ id: findUser.id, email: findUser.email })
                } else {
                    throw new Error('Wrong email or password')
                }
            } else {
                throw new Error('Wrong email or password')
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController