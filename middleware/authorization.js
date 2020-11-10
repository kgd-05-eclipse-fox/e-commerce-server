const {Product} = require('../models')

const authorization = async (req, res, next)=>{
    try {
        let id = +req.params.id
        console.log(id, 'id authorization <<<<<<<<<<<<<<<<<<<<<<<,')
        let dataDB = await Product.findOne({
            where: {id}
        })
        console.log(dataDB, '<<<<<<<<<<<<<< data DB')
        if(!dataDB){
            res.status(404).json({msg: 'id tidak valid'})
        }else{
            if(req.access_token.role !== 'admin'){
                res.status(401).json({msg: 'you are not admin'})
            }else{
                console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
                next()
            }
        }
    } catch (err) {
        console.log(err, 'error authorization <<<<<<<<<<<<<<<')
        res.status(500).json(err)
    }
}

module.exports = authorization