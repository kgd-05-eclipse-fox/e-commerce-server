const bcrypt = require('bcryptjs')

function hashPassword(password) {
    const salt = bcrypt.genSaltSync(5)
    const hash = bcrypt.hashSync(password, salt)
    return hash
}

function comparePassword(inputPass, dbPass) {
    return bcrypt.compareSync(inputPass, dbPass)
}

module.exports = {
    hashPassword,
    comparePassword
}