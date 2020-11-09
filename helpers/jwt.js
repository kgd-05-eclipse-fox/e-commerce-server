const jwt = require('jsonwebtoken')

const jwtSign = payload => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY)
}

const jwtVerify = access_token => {
    return jwt.verify(access_token, process.env.JWT_SECRET_KEY)
}

module.exports = { jwtSign, jwtVerify }