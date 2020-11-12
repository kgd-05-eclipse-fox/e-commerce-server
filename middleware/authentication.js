const {User} = require('../models')
const JwtApp = require('../helper/jwt.js')

const authentication = async (req, res, next)=>{
    console.log('masuk ke authentication<<<<<<<<<<<<<<<')
    try {
        let token = req.headers.access_token
        console.log(token, 'DARI AUTHENTICATION <<<<<<<<<<<<<<<<<<<')
        if(!token){
            res.status(401).json({msg: 'invalid Token'})
        }else{
            let cekToken = JwtApp.decodedToken(token)
            console.log(cekToken, '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<, cek token')
            // email: 'admin@mail.com', role: 'admin', iat: 1604981252
            let dataUserDB = await User.findOne({
                where: {email: cekToken.email}
            }) //findOneEmail <<<<<
            
            if(!dataUserDB){
                res.status(401).json({msg: 'invalid Token'})
                console.log(dataUserDB, 'data user db <<<<<<<<<<<<<<<<<<<<<<')
            }else{
                console.log('NEEEEXXXXXXXXXXXXTTTTTTTTTTTTTTTT')
                req.access_token = dataUserDB
                next()
            }
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports = authentication