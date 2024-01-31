const bot = require('./../../botObj/bot')
const brawlStarsApi = require('./../../../util/brawlStarsApi')
const db = require('./../../../db/controlDb/db')

const renderMessage = require('./renderMessage')

const func = ()=>{
  db.control.updatePrivateData()
  db.control.updatePublicData()

  bot.onText(/\/clubs/,async (msg,match)=>{
    const clubsInfo = db.private.clubsInfo
    const list =[]
    for(let el of clubsInfo){
      list.push([{text:el.name,callback_data:`club_${el.tag}`}])
    }
    const listInfoClubs ={
      reply_markup:JSON.stringify({
        inline_keyboard:list
      })
    }
    await bot.sendMessage(msg.chat.id,`Список Клубов`,listInfoClubs)
  })

  bot.on("callback_query",(msg)=>{
    db.control.updatePrivateData()
    db.control.updatePublicData()
    if(msg.data.includes('club_#')){
      const tag = msg.data.replace('club_','')
      const data = db.public[msg.data]
      const {name,trophies,requiredTrophies,members,timeFetch} = data
      const tgUserNameHead =db.private.clubsInfo.filter(el=>el.tag==tag)[0].tgUserNameHead.replace("@","")
      const objTimeToNewFetch = db.private.timeToNewFetch
      const timeToNewFetch = objTimeToNewFetch.secondes*1000 + objTimeToNewFetch.minutes*60*1000 + objTimeToNewFetch.hourse*60*60*1000
      const text = renderMessage(name,tag,trophies,requiredTrophies,members.length,tgUserNameHead,timeFetch,timeToNewFetch)
      bot.sendMessage(msg.message.chat.id,text)
      
    }
  })
}
module.exports = func
