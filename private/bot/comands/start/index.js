const bot = require('./../../botObj/bot')
const brawlStarsApi = require('./../../../util/brawlStarsApi')
const db = require('./../../../db/controlDb/db')

const func =()=>{
  bot.onText(/\/start ?/,async (msg,math)=>{
    await bot.sendMessage(msg.chat.id,"bot started")
    return 0
  })
}


module.exports = func