const fetchfullclubs = require("./private/util/fetchFullClubs")
fetchfullclubs()
const bot = require("./private/bot/botObj/bot")
bot.on("message",(msg,metaData)=>{
    const text =`
_________________
${msg.chat.type}: ${msg.chat.id}
from: ${msg.from.username}
${msg.text}
    `
    console.log(text)
})