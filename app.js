const express = require('express')
const app = express()
const PORT = process.env.PORT

const cors = require('cors')

// * Send Promotion Email using node-cron
const cron = require('node-cron')
const sendPromotionEmail = require('./helpers/promotion')

cron.schedule('0 9 * * *', () => {
    sendPromotionEmail()
    // 'Runing a job at 09:00 at Asia/Jakarta timezone'
}, {
    timezone: 'Asia/Jakarta'
})
// * End Send Promotion Email

const router = require('./routes/')
const errorhandler = require('./middlewares/errorhandler')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.use(router)
app.use(errorhandler)

app.listen(PORT, _ => {
    console.log(`e-commerce-server is live at http://localhost:${PORT}`)
})

module.exports = app