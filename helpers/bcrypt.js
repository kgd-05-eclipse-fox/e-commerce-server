const bcrypt = require('bcryptjs')

const hashPassword = pass => {
    const hashed = bcrypt.hashSync(pass, 10)
    return hashed
}

const compare = (pass, hash) => {
    const result = bcrypt.compareSync(pass, hash)
    return result
}

module.exports = {
    hashPassword,
    compare
}