const jwt = require('jsonwebtoken');

const signToken = (payload) => {
    const token = jwt.sign(payload, 'bigsecret')
    return token;
}

const verifyToken = (token) => {
    const decoded = jwt.verify(token, 'bigsecret')
    return decoded;
}

module.exports = {
    signToken,
    verifyToken
}