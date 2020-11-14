const bcrypt = require('bcryptjs')

let hash = (data) => bcrypt.hashSync(data, 10)
let cheking = (data, pass) => {
	return bcrypt.compareSync(data, pass)
}

module.exports = { hash, cheking }
