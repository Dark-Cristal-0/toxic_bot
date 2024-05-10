const bot = require('./../../../botObj/bot')
const brawlStarsApi = require('./../../../../util/brawlStarsApi')
const db = require('./../../../../db/controlDb/db')
const fetchFullClubs = require('./../../../../util/fetchFullClubs')

const func = (admin,elem1,elem2) =>{
    if(elem2){
        const tag = elem2.includes("#")?elem2:"#"+elem2
        db.control.modifyPrivateData("clubsInfo.json",(data)=>{
          const element = data.filter(el=>(el.tag == tag))[0]
          const indexElement = data.indexOf(element);
          if(indexElement>-1){
            data.splice(indexElement,1)
            bot.sendMessage(msg.chat.id,"Club remove🫡")
            return data
          }else{
            bot.sendMessage(msg.chat.id,"This club is not defined🫠")
            return data
          }
        })
        db.control.updatePrivateData()
    }
}

module.exports = func