const {Product} = require('../models')

const authorization = async (req, res, next)=>{
    try {
        let id = +req.params.is
        let dataDB = await Product.findOne({
            where: {id}
        })
        if(dataDB.UserId===req.access_token.id){
            if(req.access_token.role !== 'admin'){
                res.status(401).json({msg: 'you are not admin'})
            }else{
                next()
            }
        }else{
            res.status(401).json({msg: 'Unautorized'})
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports = authorization