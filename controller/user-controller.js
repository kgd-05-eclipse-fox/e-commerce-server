const {User} = require('../models')
const BcryptApp = require('../helper/bcrypt.js')
const JwtApp = require('../helper/jwt')

class UserController{

    static async constructorRegister(req, res, next){
        try {
            let dataBody = req.body
            let data = await User.create(dataBody)
            let showData = {
                id: data.id,
                email: data.email
            }
            res.status(201).json(showData)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    static async adminLogin(req, res, next){
        try {
            let dataBody = req.body
            if(dataBody.email === ''){
                res.status(400).json({msg: 'Email Tidak boleh kosong'})
            }else if(dataBody.password === ''){
                res.status(400).json({msg: 'Password Tidak boleh kosong'})
            }else{
                let cekData = await User.findOne({
                    where: {email: dataBody.email}
                })
                if(!cekData){
                    // throw {status: 401, msg: 'email/password invalid'}
                    res.status(401).json({msg: 'invalid email/password'})
                }else if(!BcryptApp.comperPassword(dataBody.password, cekData.password)){
                    // throw {status: 401, msg: 'email/password invalid'}
                    res.status(401).json({msg: 'invalid email/password'})
                }else{
                    if(cekData.role !== 'admin'){
                        res.status(401).json({msg: 'Sorry you not Admin'})
                    }else{
                        let saveData = {
                            id: cekData.id,
                            email: cekData.email
                        }
                        let access_token = JwtApp.createToken(saveData)
                        saveData.access_token = access_token
                        res.status(200).json(saveData)
                    }
                }
            }
        } catch (err) {
            res.status(500).json(err)
        }
    }

    static async costomerLogin(req, res, next){
        try {
            let dataBody = req.body
            if(dataBody.email === ''){
                res.status(400).json({msg: 'Email Tidak boleh kosong'})
            }else if(dataBody.password === ''){
                res.status(400).json({msg: 'Password Tidak boleh kosong'})
            }else{
                let cekData = await User.findOne({
                    where: {email: dataBody.email}
                })
                if(!cekData){
                    // throw {status: 401, msg: 'email/password invalid'}
                    res.status(401).json({msg: 'invalid email/password'})
                }else if(!BcryptApp.comperPassword(dataBody.password, cekData.password)){
                    // throw {status: 401, msg: 'email/password invalid'}
                    res.status(401).json({msg: 'invalid email/password'})
                }else{
                    if(cekData.role !== 'customer'){
                        res.status(401).json({msg: 'Sorry you not Customer'})
                    }else{
                        let saveData = {
                            id: cekData.id,
                            email: cekData.email
                        }
                        let access_token = JwtApp.createToken(saveData)
                        saveData.access_token = access_token
                        res.status(200).json(saveData)
                    }
                }
            }
        } catch (err) {
            res.status(500).json(err)
        }
    }
}

module.exports = UserController