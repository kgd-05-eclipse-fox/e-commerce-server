const bcrypt = require('bcryptjs')

class BcryptApp{

    static hashPassword(data){
        let salt = bcrypt.genSaltSync(+process.env.SALT)
        let hash = bcrypt.hashSync(data, salt)

        return hash
    }

    static comperPassword(passBody, passDB){
        return bcrypt.compareSync(passBody, passDB)
    }
}

module.exports = BcryptApp