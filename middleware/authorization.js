const {Product} = require('../models')

const authorization = async (req, res, next)=>{
    try {
        let id = +req.params.id
        let dataDB = await Product.findOne({
            where: {id}
        })
        if(!dataDB){
            res.status(404).json({msg: 'id tidak valid'})
        }else{
            if(req.access_token.role !== 'admin'){
                res.status(401).json({msg: 'you are not admin'})
            }else{
                next()
            }
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports = authorization