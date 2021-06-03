if(process.env.NODE_ENV != "production") {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const port = 3001
const cors = require('cors')
const router = require('./routes')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.get('/', function(req, res) {
  res.status(200).json({ msg: "success" })
})
app.use(router)

app.listen(port, () => {
  console.log(`listening app on port ${port}`)
})

module.exports = app