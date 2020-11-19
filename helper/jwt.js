const jwt = require('jsonwebtoken')

class JwtApp{

    static createToken(data){
        let token = jwt.sign(data, process.env.KEY)

        return token
    }

    static decodedToken(data){
        let decoded = jwt.verify(data, process.env.KEY)

        return decoded
    }
}

module.exports = JwtApp