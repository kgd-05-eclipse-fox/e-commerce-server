if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const cors = require('cors')
const route = require('./routes')
const changeBanner = require('./helpers/cron')
const error_handler = require('./middlewares/error_handler')

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(route)
app.use(error_handler)

changeBanner()

app.listen(port, () => console.log(`listening at port ${port}`))

module.exports = app
