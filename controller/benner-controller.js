const {Benner} = require('../models')

class BennerController{

    static async getAllBenner(req, res, next){
        try {
            let data = await Benner.findAll()
            res.status(200).json(data)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    static async postBenner(req, res, next){
        try {
            let dataBody = req.body
            if(req.userLogIn.role !== 'admin'){
                res.status(401).json({msg: 'invalid Token'})
            }else{
                let data = await Benner.create(dataBody)
                res.status(201).json(data)
            }
        } catch (err) {
            res.status(500).json(err)
        }
    }

    static async findOneBenner(req, res, next){
        try {
            let id = +req.params.id
            let data = await Benner.findByPk(id)
            if(!data){
                res.status(401).json({msg: 'invalid Id'})
            }else{
                res.status(200).json(data)
            }
        } catch (err) {
            res.status(500).json(err)
        }
    }

    static async putBenner(req, res, next){
        try {
            let id = +req.params.id
            let dataUpdate = req.body
            let data = await Benner.update(dataUpdate, {
                where: {id},
                returning: true
            })
            let dataShow = {
                id: data[1][0].dataValues.id,
                banner_url: data[1][0].dataValues.banner_url,
                category: data[1][0].dataValues.category,
                status: data[1][0].dataValues.status,
            }
            res.status(200).json(dataShow)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    static async deleteBenner(req, res, next){
        try {
            let id = +req.params.id
            let data = await Benner.destroy({
                where: {id}
            })
            if(data === 0){
                res.status(400).json({msg: 'Benner tidak ditemukan'})
            }else{
                res.status(200).json({msg: 'Benner has been Deleted'})
            }
        } catch (err) {
            res.status(500).json(err)
        }
    }
}

module.exports = BennerController