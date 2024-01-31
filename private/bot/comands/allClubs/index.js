const bot = require('./../../botObj/bot')
const brawlStarsApi = require('./../../../util/brawlStarsApi')
const db = require('./../../../db/controlDb/db')

const func = ()=>{
  db.control.updatePrivateData()
  db.control.updatePublicData()


  bot.onText(/\/allclubs/,async (msg,match)=>{
    const list =[]
    for(let el of db.private.clubsInfo){
      list.push(db.public[`club_${el.tag}`])
    }
    list.sort((a,b)=>a.trophies-b.trophies)
    list.reverse()
    let text = ""
    for(let i in list){
      text+=`${(i-0)+1}) ${list[i].name}\n`
      text+=`Trophies: ${list[i].trophies}\n`
      text+=`Players: ${list[i].members.length}\n`
      text+=`\n`
    }
    await bot.sendMessage(msg.chat.id,text,{parse_mode:"HTML"})
  })
}
module.exports = func