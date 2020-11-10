const bcrypt = require('bcryptjs')

const encryptPassword = password => {
    const salt = bcrypt.genSaltSync(+process.env.SALT)
    return bcrypt.hashSync(password, salt)
}

const verifyPassword = (urPassword, dbPassword) => {
    return bcrypt.compareSync(urPassword, dbPassword)
}

module.exports = { encryptPassword, verifyPassword }