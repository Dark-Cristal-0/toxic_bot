const bot = require('./../../../botObj/bot')
const brawlStarsApi = require('./../../../../util/brawlStarsApi')
const db = require('./../../../../db/controlDb/db')
const fetchFullClubs = require('./../../../../util/fetchFullClubs')

const func = (admin,elem1,elem2) =>{
    try{
        if(elem2){

          const regex =/(.\w+)\s(.\w+)\s(.*)/
          const listInfo = regex.exec(elem2)

          if(!listInfo[2].includes("@")){
            listInfo[2] = "@"+listInfo[2]
          }
          if(!listInfo[1].includes("#")){
            listInfo[1] = "#"+listInfo[1]
          }

          const info ={
            name:listInfo[3],
            tag:listInfo[1],
            tgUserNameHead:listInfo[2]
          }

          db.control.modifyPrivateData("clubsInfo.json",(data)=>{
            data.push(info)
            return data
          })

          fetchFullClubs()
          db.control.updatePrivateData()
          
          bot.sendMessage(msg.chat.id,"Info new Club:\n"+JSON.stringify(info,null,2))
        }
      }catch(err){
        console.log(err)
      }
      return 0
}

module.exports = func