const bot = require("./botObj/bot")

const func = ()=>{
  bot.setMyCommands([
    {command:"/clubs",description:"send list button of clubs"},
    {command:"/allclubs",description:"send rating clubs"},
    {command:"/start",description:"start bot"},
    {command:"/rules",description:"Print link rules"}
  ])
}

module.exports = func