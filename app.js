require('dotenv').config()

const express = require('express')
const app = express()
const prot = process.env.PROT
// const cors = require('cors')
const routers = require('./routers')
// const errorHandler = require('./middleware/errorHandler.js')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(routers)
// app.use(errorHandler)

// app.listen(prot, ()=>{
//     console.log(`go to the link htpp://localhost:${prot}`)
// })

module.exports = app