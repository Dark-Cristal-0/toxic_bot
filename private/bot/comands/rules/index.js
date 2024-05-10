const bot = require('./../../botObj/bot')

const func = ()=>{
    bot.onText(/\/rules/,(msg,match)=>{
        bot.sendMessage(msg.chat.id,`Правила чата здесь --->@TFRules `)
    })
}
module.exports = func