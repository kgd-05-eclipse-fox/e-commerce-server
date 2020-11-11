require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PROT
const cors = require('cors')
const routers = require('./routers')
// const errorHandler = require('./middleware/errorHandler.js')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(routers)
// app.use(errorHandler)

app.listen(port, ()=>{
    console.log(`go to the link http://localhost:${port}`)
})

module.exports = app