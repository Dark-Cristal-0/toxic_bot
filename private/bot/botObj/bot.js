const fs = require('fs')
const path = require('path')
const MyBot = require('./MyBot')
const event = require("./botEmmiter")
const config = JSON.parse(fs.readFileSync(path.normalize(path.join(__dirname,'../','../','config','telegram.json'))))

const bot = new MyBot(config.token,{polling:true})

bot.on("polling_error",(err)=>{
    event.emit("new_polling_err",err)
})

module.exports = bot