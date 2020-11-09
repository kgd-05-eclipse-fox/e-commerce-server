const jwt = require('jsonwebtoken')

function getToken(data) {
    const token = jwt.sign(data, 'hacktiv8')
    return token
}

function verifyToken(data) {
    const decodeToken = jwt.verify(data, 'hacktiv8')
    return decodeToken
}
module.exports = {
    getToken,
    verifyToken
}