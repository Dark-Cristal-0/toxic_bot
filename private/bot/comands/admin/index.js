const bot = require('./../../botObj/bot')
const brawlStarsApi = require('./../../../util/brawlStarsApi')
const db = require('./../../../db/controlDb/db')
const fetchFullClubs = require('./../../../util/fetchFullClubs')
const event = require("./../../botObj/botEmmiter")

const addClub = require("./comands/addClub")
const removeClub = require("./comands/removeClub")
const modifyClub = require("./comands/modifyClub")

let time = db.private.timeToNewFetch.hourse*1000*60*60 + db.private.timeToNewFetch.minutes*1000*60 + db.private.timeToNewFetch.secondes*1000
fetchFullClubs()
let interval = setInterval(()=>{
  fetchFullClubs()
},time)

const func =()=>{
  bot.onText(/\/admin ?(.\w+)? ?(.*)?/gs,async (msg,[full,elem1,elem2])=>{
    const admin ={}
    for(let el of db.private.adminList){
      if(msg.from.id !==el.id){
        continue
      }else{
        Object.assign(admin,el)
        break
      }
    }
    if(!admin.id){
      await bot.sendMessage(msg.chat.id,`Your id:${msg.from.id}`)
      return bot.sendMessage(msg.chat.id,"Your not admin")
    }

    if(elem1 == "test"){
      event.emit("new_polling_err",{})
    }

    if(elem1 == "info" && admin.rights.info){
      if(!elem2){
        let text =`Name: ${admin.name}\n`
        text+=`Id: ${admin.id}\n`
        text+=`TgUserName: ${admin.tgUserName}\n`
        text+=`Rights: ${JSON.stringify(admin.rights,null,2).replace("{","").replace("}","")}`
        await bot.sendMessage(msg.chat.id,text)
      }else{
        const arrAdmin =db.private.adminList.filter(el=>el.id ==(elem2-0))
        if(arrAdmin){
          const admin = arrAdmin[0]
          let text =`Name: ${admin.name}\n`
          text+=`Id: ${admin.id}\n`
          text+=`TgUserName: ${admin.tgUserName}\n`
          text+=`Rights: ${JSON.stringify(admin.rights,null,2).replace("{","").replace("}","")}`
          await bot.sendMessage(msg.chat.id,text)
        }else{
          await bot.sendMessage(msg.chat.id,"Not admin this id")
        }
      }
    }

    if(elem1 == "help"){
      if(elem2&&db.private.adminInfo[elem2]){
        const info = db.private.adminInfo[elem2]
        const text =`${info.text}\n\nparams:${info.params}\n\nexemple:\n${info.example}\n`
        bot.sendMessage(msg.chat.id,text)
      }else{
        const info = db.private.adminInfo
        let text =""
        for(let el of Object.keys(info)){
          text += "________________________\n"
          text += `${el}\n\n${info[el].text}\n\nparams:${info[el].params}\nexample:\n\n${info[el].example}\n\n`
          
        }
        await bot.sendMessage(msg.chat.id,text)
      }
    }

    if(elem1 == "fetchNaw"&& admin.rights.fetchNaw){
      fetchFullClubs()
      clearInterval(interval)
      db.control.updatePublicData()
      time =db.private.timeToNewFetch.hourse*1000*60*60 + db.private.timeToNewFetch.minutes*1000*60 + db.private.timeToNewFetch.secondes*1000
      interval == setInterval(()=>{
        fetchFullClubs()
      },time)
      return bot.sendMessage(msg.chat.id,"Fetch Naw accept✅")
    }

    if(elem1 == "js" && admin.rights.js){
      try{
        if(elem2){
          const print =(text)=>{
            bot.sendMessage(msg.chat.id,text)
          }
          eval(elem2)
        }
      }catch(err){
        console.log(err)
      }
      return 0
    }

    if(elem1 == "addClub"&& admin.rights.addClub){
      addClub(admin,elem1,elem2)
      return 0
    }

    if(elem1 == "removeClub"&& admin.rights.removeClub){
      removeClub(admin,elem1,elem2)
      return 0
    }

    if(elem1 =="modifyClub"&& admin.rights.modifyClub){
      modifyClub(admin,elem1,elem2)
      return 0
    }

    if(elem1 == "addAdmin"&& admin.rights.addAdmin){
      if(msg.reply_to_message){
        const info ={
          id:msg.reply_to_message.from.id,
          name:msg.reply_to_message.from.first_name,
          tgUserName:"@"+msg.reply_to_message.from.username,
          rights:{
            "removeClub":false,
            "addClub":false,
            "modifyClub":false,
            "fetchTime":false,
            "adminList":false,
            "removeAdmin":false,
            "addAdmin":false,
            "modifyAdmin":false,
            "fetchNaw":false,
            "info":false,
            "js":false
          }
        }
        if(elem2){
          const infoRights = eval("['"+elem2.replace(/\s/gs,"','")+"']")
          for(let el of infoRights){
            info.rights[el]!==undefined?info.rights[el] = true:null
          }
          db.control.modifyPrivateData("adminList.json",(data)=>{
            data.push(info)
            return data
          })
          db.control.updatePrivateData()
          
          bot.sendMessage(msg.chat.id,"Admin add\nrights:\n"+JSON.stringify(info.rights,null,2))
        }
      }
      return 0
    }

    if(elem1 == "removeAdmin"&& admin.rights.removeAdmin){
      if(msg.reply_to_message){
        db.control.modifyPrivateData("adminList.json",(data)=>{
          const _data = data
          for(let i in data){
            if(data[i].id == msg.reply_to_message.from.id){
              _data.splice(i,1);
              break
            }
          }
          bot.sendMessage(msg.chat.id,"Admin delete✅")
          return _data
        })
        db.control.updatePrivateData()
      }else if(elem2){
        db.control.modifyPrivateData("adminList.json",(data)=>{
          const _data = data
          for(let i in data){
            if(data[i].id == (elem2-0)){
              _data.splice(i,1);
              break
            }
          }
          bot.sendMessage(msg.chat.id,"Admin delete✅")
          return _data
        })
        db.control.updatePrivateData()
      }
      return 0
    }

    if(elem1 =="modifyAdmin" && admin.rights.modifyAdmin){
      if(msg.reply_to_message){
        if(elem2){
          const regex = /(\w+)\s?= \s?(.*)/s
          const resRegex = regex.exec(elem2)
          db.control.modifyPrivateData("adminList.json",(data)=>{
            let obj ={}
            let index 
            for(let i in data){
              if(data[i].id == msg.reply_to_message.from.id){
                obj = data[i]
                index = i
              }
            }
            
            if(resRegex[1]=="rights"){
              obj.rights[resRegex[2]]?obj.rights[resRegex[2]]=false:obj.rights[resRegex[2]]=true
            }else if(obj[resRegex[1]]){
              obj[resRegex[1]]=resRegex[2]
            }
            bot.sendMessage(msg.chat.id,"1)\n"+JSON.stringify(obj,null,2))
            data[index] = obj
            return data
          })
          db.control.updatePrivateData()
          bot.sendMessage(msg.chat.id,JSON.stringify(db.private.adminList,null,2))
        }
      }
      return 0
    }

    if(elem1=="fetchTime" && admin.rights.fetchTime){
      if(elem2){
        const hourse =/(\d+)h/.exec(elem2)
        const minutes =/(\d+)m/.exec(elem2)
        const secondes =/(\d+)s/.exec(elem2)
        
        db.control.modifyPrivateData("timeToNewFetch.json",(data)=>{
          
          hourse?data.hourse = hourse[1]-0:data.hourse = 0
          minutes?data.minutes = minutes[1]-0:data.minutes = 0
          secondes?data.secondes = secondes[1]-0:data.secondes = 0
          
          return data
          
        })
        db.control.updatePrivateData()
        fetchFullClubs()
        clearInterval(interval)
        db.control.updatePublicData()
        time =db.private.timeToNewFetch.hourse*1000*60*60 + db.private.timeToNewFetch.minutes*1000*60 + db.private.timeToNewFetch.secondes*1000
        interval == setInterval(()=>{
          fetchFullClubs()
        },time)
        await bot.sendMessage(msg.chat.id,"Accept, new fetch time: "+ elem2)
      }
      return 0
    }

    if(elem1 == "adminList"&& admin.rights.adminList){
      
      if(elem2 == "group"){
        const adminList = db.private.adminList
        let text ="Admin List:\n"
        
        for(let i in adminList){
          text+=`${(i-0)+1})\n`
          text+=`Name: ${adminList[i].name}\n`
          text+=`Link: https://t.me/${adminList[i].tgUserName.replace("@","")}\n`
          text+=`\n\n`
        }
        await bot.sendMessage(msg.chat.id,text)
      }else{
        const adminList = db.private.adminList
        let text ="Admin List:\n"
        
        for(let i in adminList){
          text+=`${(i-0)+1})\n`
          text+=`Name: ${adminList[i].name}\n`
          text+=`Id: ${adminList[i].id}\n`
          text+=`Link: https://t.me/${adminList[i].tgUserName.replace("@","")}\n`
          text+=`Rights: ${JSON.stringify(adminList[i].rights,null,2)}`
          text+=`\n\n`
        }
        await bot.sendMessage(msg.chat.id,text)
      }
      
      return 0
    }

    


  })
}

module.exports =func 