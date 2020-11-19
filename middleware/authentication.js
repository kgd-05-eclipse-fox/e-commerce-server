const {User} = require('../models')
const JwtApp = require('../helper/jwt.js')

const authentication = async (req, res, next)=>{
    try {
        let token = req.headers.access_token
        if(!token){
            res.status(401).json({msg: 'invalid Token'})
        }else{
            let cekToken = JwtApp.decodedToken(token)
            // email: 'admin@mail.com', role: 'admin', iat: 1604981252
            let dataUserDB = await User.findOne({
                where: {email: cekToken.email}
            })
            console.log(dataUserDB, '<<<<<<<<<<< data UserDB uthentication')
            if(!dataUserDB){
                res.status(401).json({msg: 'invalid Token'})
            }else{
                req.userLogIn = dataUserDB
                console.log(req.userLogIn, 'authentication<<<<<<<<<<<<<<<<<<<<<<<')
                next()
            }
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports = authentication