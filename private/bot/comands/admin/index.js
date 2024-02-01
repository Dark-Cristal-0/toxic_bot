const bot = require('./../../botObj/bot')
const brawlStarsApi = require('./../../../util/brawlStarsApi')
const db = require('./../../../db/controlDb/db')
const fetchFullClubs = require('./../../../util/fetchFullClubs')
//const admin = require('./../../../admin/index')
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

    if(elem1 == "help"){
      await bot.sendMessage(msg.chat.id,'Ви являєтесь адміном бота\nВаші дозволи:\n' + `${JSON.stringify(admin.rights,null,2)}`.replace("{","").replace("}",""))
      return await bot.sendMessage(msg.chat.id,"існуючі команди:"+
      `\n----\nhelp\n----\njs <js code>\n----\nnewFetchTime <hourse>h <minut>m <second>s\n----\n addClub <tag> <head> <name> \n----\nremoveClub <tag>\n----\nfetchNaw\n----\n`
      )
    }

    if(elem1 == "fetchNaw"){
      fetchFullClubs()
      clearInterval(interval)
      db.control.updatePublicData()
      time =db.private.timeToNewFetch.hourse*1000*60*60 + db.private.timeToNewFetch.minutes*1000*60 + db.private.timeToNewFetch.secondes*1000
      interval == setInterval(()=>{
        fetchFullClubs()
      },time)
      return bot.sendMessage(msg.chat.id,"Fetch Naw accept✅")
    }

    if(elem1 == "js"){
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

    if(elem1 == "addClub"){
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

          db.control.updatePrivateData()
          bot.sendMessage(msg.chat.id,"Info new Club:\n"+JSON.stringify(info,null,2))
        }
      }catch(err){
        console.log(err)
      }
      return 0
    }

    if(elem1 == "removeClub"){
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
      return 0
    }

    if(elem1 =="modifyClub"){
      if(elem2){
        const reqex=/(.\w+) ?= ?(.*)/
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
      return 0
    }

    if(elem1 == "addAdmin"){
      if(msg.reply_to_message){
        const info ={
          id:msg.reply_to_message.from.id,
          name:msg.reply_to_message.from.first_name,
          userName:msg.reply_to_message.from.username,
          rights:{
            "removeClub":false,
            "addClub":false,
            "modifyClub":false,
            "fetchTime":false,
            "adminList":false,
            "removeAdmin":false,
            "addAdmin":false,
            "modifyAdmin":false,
            "fetchNaw":true,
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

    if(elem1 == "removeAdmin"){
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
      }
      return 0
    }

    if(elem1 =="modifyAdmin"){
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

    if(elem1=="fetchTime"){
      if(elem2){
        const hourse =/(\d+)h/.exec(elem2)
        const minutes =/(\d+)m/.exec(elem2)
        const secondes =/(\d+)s/.exec(elem2)
        
        db.control.modifyPrivateData("timeToNewFetch.json",(data)=>{
          
          hourse?data.hourse = hourse[1]-0:data.hourse = 0
          minutes?data.minutes = minutes[1]-0:data.minutes = 0
          secondes?data.secondes = secondes[1]-0:data.secondes = 0
          bot.sendMessage(msg.chat.id,"Accept, new fetch time: "+ elem2)
          return data
          
        })
      }
      return 0
    }

    if(elem1 == "adminList"){
      const adminList = db.private.adminList
      let text ="Admin List:\n"
      
      for(let i in adminList){
        text+=`${(i-0)+1})\n`
        text+=`Name: ${adminList[i].name}\n`
        text+=`Link: https://t.me/${adminList[i].tgUserName.replace("@","")}\n`
        text+=`Rights: ${JSON.stringify(adminList[i].rights,null,2)}`
        text+=`\n\n`
      }
      await bot.sendMessage(msg.chat.id,text,{
      
      })
      return 0
    }


  })
}

module.exports =func 