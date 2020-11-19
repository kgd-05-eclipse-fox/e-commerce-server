const {Product, Benner, ProductUser, CheckOutUser, FavoritesUser} = require('../models')

const authorization = async (req, res, next)=>{
    try {
        let router = req.path.split('/')
        let id = +req.params.id
        if(router[1] === 'banners'){
            let dataBenner = await Benner.findOne({
                where: {id}
            })
            if(!dataBenner){
                res.status(404).json({msg: 'id tidak valid'})
            }else{
                if(req.access_token.role !== 'admin'){
                    res.status(401).json({msg: 'you are not admin'})
                }else{
                    next()
                }
            }
        }else if(router[1] === 'products'){
            let dataProduct = await Product.findOne({
                where: {id}
            })
            if(!dataProduct){
                res.status(404).json({msg: 'id tidak valid'})
            }else{
                if(req.access_token.role !== 'admin'){
                    res.status(401).json({msg: 'you are not admin'})
                }else{
                    next()
                }
            }
        }else if(router[1] === 'userproducts'){
            let dataProduct = await ProductUser.findOne({
                where: {id}
            })
            if(!dataProduct){
                res.status(404).json({msg: 'id tidak valid'})
            }else{
                if(req.access_token.role !== 'customer'){
                    res.status(401).json({msg: 'you are not customer'})
                }else{
                    next()
                }
            }
        }else if(router[1] === 'checkouts'){
            let dataProduct = await CheckOutUser.findOne({
                where: {id}
            })
            if(!dataProduct){
                res.status(404).json({msg: 'id tidak valid'})
            }else{
                if(req.access_token.role !== 'customer'){
                    res.status(401).json({msg: 'you are not customer'})
                }else{
                    next()
                }
            }
        }else if(router[1] === 'favorites'){
            let dataProduct = await FavoritesUser.findOne({
                where: {id}
            })
            if(!dataProduct){
                res.status(404).json({msg: 'id tidak valid'})
            }else{
                if(req.access_token.role !== 'customer'){
                    res.status(401).json({msg: 'you are not customer'})
                }else{
                    next()
                }
            }
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports = authorization