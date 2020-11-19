if (process.env.NODE_ENV != 'production') {
  require('dotenv').config()
}
const express = require('express')
const app = express()
const router = require('./routes')
const cors = require('cors')
const port = process.env.PORT || 3000
const errorHandling = require('./middlewares/errorHandling')

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(router)
app.use(errorHandling)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = app
