const express = require('express')
const app = express()
const PORT = process.env.PORT

const cors = require('cors')

const router = require('./routes/')
const errorhandler = require('./middlewares/errorhandler')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.use(router)
app.use(errorhandler)

// app.listen(PORT, _ => {
//     console.log(`e-commerce-server is live at http://localhost:${PORT}`)
// })

module.exports = app