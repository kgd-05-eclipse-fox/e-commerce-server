const { User } = require('../models/')
const { verifyPassword } = require('../helpers/bcrypt')
const { jwtSign } = require('../helpers/jwt')
const sendMail = require('../helpers/nodemailer')

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

            const payload = {
                email: email,
                registration: {
                    subject: 'Yayy! Registration Complete'
                }
            }

            sendMail(email, payload)

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
                const verify = verifyPassword(password, findUser.password)
                if(verify) {
                    const payload = {
                        id: findUser.id,
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
}

module.exports = UserController