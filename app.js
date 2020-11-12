if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

const express = require('express')
const { errorHandler } = require('./helpers/errorHandler')
const app = express()
const port = 3000
const router = require('./routers')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded( { extended: true } ))

app.use('/', router)
app.use(errorHandler)
app.listen(port, () => {
	console.log(`app running on port http://localhost/${port}`)
})

module.exports = app