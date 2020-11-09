const bcrypt = require('bcrypt')

function hashPassword(userPassword){
    const salt = bcrypt.genSaltSync(Number(process.env.SALT));
    const hash = bcrypt.hashSync(userPassword, salt);
    return hash
}

function comparePassword(userPassword, hashedPassword) {
    const result = bcrypt.compareSync(userPassword, hashedPassword)
    return result
}

module.exports = {
    hashPassword,
    comparePassword
}