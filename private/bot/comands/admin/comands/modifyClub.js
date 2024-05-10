const bot = require('./../../../botObj/bot')
const brawlStarsApi = require('./../../../../util/brawlStarsApi')
const db = require('./../../../../db/controlDb/db')
const fetchFullClubs = require('./../../../../util/fetchFullClubs')

const func = (admin,elem1,elem2) =>{
    if(elem2){
        const reqex=/(.\w+) ?(.\w+) ?= ?(.*)/
        const listInfo = reqex.exec(elem2)
        const tag = listInfo[1].includes("#")?listInfo[1]:"#"+listInfo[1]
        if(listInfo[2]=="name"){
          db.control.modifyPrivateData("clubsInfo.json",(data)=>{
            const element = data.filter(el=>(el.tag == tag))[0]
            const indexElement = data.indexOf(element);
            if(indexElement>-1){
              data[indexElement].name =listInfo[3]
              bot.sendMessage(msg.chat.id,"Club set new name✅")
              return data
            }else{
              bot.sendMessage(msg.chat.id,"This club is not defined🫠")
              return data
            }
          })
        }else if(listInfo[2]=="tag"){
          db.control.modifyPrivateData("clubsInfo.json",(data)=>{
            const element = data.filter(el=>(el.tag == tag))[0]
            const indexElement = data.indexOf(element);
            if(indexElement>-1){
              data[indexElement].tag =listInfo[3]
              bot.sendMessage(msg.chat.id,"Club set new tag✅")
              return data
            }else{
              bot.sendMessage(msg.chat.id,"This club is not defined🫠")
              return data
            }
          })
        }else if(listInfo[2]=="head"){
          db.control.modifyPrivateData("clubsInfo.json",(data)=>{
            const element = data.filter(el=>(el.tag == tag))[0]
            const indexElement = data.indexOf(element);
            if(indexElement>-1){
              data[indexElement].tgUserNameHead =listInfo[3]
              bot.sendMessage(msg.chat.id,"Club set new head✅")
              return data
            }else{
              bot.sendMessage(msg.chat.id,"This club is not defined🫠")
              return data
            }
          })
        }
        db.control.updatePrivateData()
      }
}

module.exports = func