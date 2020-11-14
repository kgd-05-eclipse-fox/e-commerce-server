const jwt = require('jsonwebtoken')

function generate (payload) {
   const token = jwt.sign(payload, process.env.SECRET)
   return token
}

function decode(token) {
   const decoded = jwt.verify(token, process.env.SECRET)
   return decoded
}

module.exports = {
  generate,
  decode
}