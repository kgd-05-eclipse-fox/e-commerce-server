const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

async function authentication(req, res, next) {
    try {
        const token = req.headers.access_token
        if(!token) {
            throw { msg: "You must be login to create product", status: 401 }
        } else {
            const decodeToken = verifyToken(token)
            // console.log(decodeToken)
            if(decodeToken.role !== 'admin') {
                throw { msg: "You dont have permissions to create product", status: 401 }
            } else {
                next()
            }
            // const selectedUser = await User.findOne({
            //     where: {
            //         email: decodeToken.email
            //     }
            // })
            // if(selectedUser.role !== 'admin') {
            //     throw { msg: "You dont have permissions to create product", status: 401 }
            // } else {
            //     req.loginUser = selectedUser
            //     next()
            // }
        }
    } catch (error) {
        res.status(error.status).json({message: error.msg})
    }
    
}

async function authorization(req, res, next) {
    const taskId = Number(req.body.id)
    try {
        const task = await Task.findByPk(taskId)
        // console.log(todo)
        if(task == null) {
            throw { msg: "Data not found", status: 404 }
        } else {
            if(task.UserId == req.loginUser.id) {
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
    authorization
}