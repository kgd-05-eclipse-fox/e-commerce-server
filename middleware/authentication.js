const {User} = require('../models')
const JwtApp = require('../helper/jwt.js')

const authentication = async (req, res, next)=>{
    try {
        let token = req.headers.access_token
        if(!token){
            res.status(401).json({msg: 'invalit Token'})
        }else{
            let cekToken = JwtApp.decodedToken(token)
            let dataUserDB = await User.findByPk(cekToken.id)
            if(!dataUserDB){
                res.status(401).json({msg: 'invalit Token'})
            }else{
                req.access_token = dataUserDB
                next()
            }
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports = authentication