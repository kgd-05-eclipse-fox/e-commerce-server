const { User } = require('../models')

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
}   

module.exports = UserController;