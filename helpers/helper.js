const cron = require('node-cron')

function sendEmailCron() {
    cron.schedule("*/5 * * * * *", () => {
        console.log("email terkirim")
    })
}

module.exports = {
    sendEmailCron
}