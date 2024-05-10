const bot = require('./../../botObj/bot')
const brawlStarsApi = require('./../../../util/brawlStarsApi')
const db = require('./../../../db/controlDb/db')
const numberFormater = require('./numberFormater')

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
      text+=`<b><i>------ ${list[i].name} ------</i></b>\n`
      text+=`Top <b><i>${(i-0)+1}📈</i></b>\n`
      text+=`Trophies: 🏆<i>${numberFormater(list[i].trophies)}</i>🏆\n`
      text+=`Players: ${list[i].members.length}/30👨‍👩‍👧‍👦\n`
      text+=`\n`
    }
    await bot.sendMessage(msg.chat.id,text,{parse_mode:"HTML"})
  })
}
module.exports = func