const fs = require('fs')
const path = require('path')



const db = {
  private:{
    clubsInfo:[
      {
        "name": "Toxic Family",
        "tag": "#29P08J09J",
        "tgUserNameHead": "@DarkSoul_231120"
      }
    ],
    timeToNewFetch:{
      "hourse":0,
      "minutes":30,
      "secondes":0
    },
    adminList:[
      {
        "id":1121847657,
        "name":"DarkCristal",
        "tgUserName":"@DarkCristal_TF",
        "rights":{
          "modifyFetchTime":true,
          "modifyClubList":true,
          "modifyAdminList":true,
          "fetchNaw":true,
          "js":true
        }
      },
      {
        "id":915193713,
        "name":"DarkSoul",
        "tgUserName":"@DarkSoul_231120",
        "rights":{
          "modifyFetchTime":true,
          "modifyClubList":true,
          "modifyAdminList":true,
          "fetchNaw":true,
          "js":true
        }
      }
    ]
  },
  public:{

  },
  control:{
    updatePrivateData:()=>{
      const filelist = fs.readdirSync(path.join(__dirname,"../private_db"))
      const fileListNotExtName =[]
      for(let el of filelist){
        fileListNotExtName.push(el.replace(path.extname(el),""))
      }
      db.private ={}
      for(let i in filelist){
        const data = fs.readFileSync(path.join(__dirname,"../private_db",filelist[i]))
        db.private[fileListNotExtName[i]] = JSON.parse(data)
      }
      
    },
    /**
     * 
     * @param {string} path_ 
     * @param {function({object})} callback 
     */
    modifyPrivateData:(path_,callback)=>{
      try{
        const data = JSON.parse(fs.readFileSync(path.join(__dirname,"../private_db",path_)))
        fs.writeFileSync(path.join(__dirname,"../private_db",path_),JSON.stringify(callback(data),null,2))
      }catch(err){

      }
    },
    /**
     * 
     * @param {string} path_ 
     * @param {string} newData 
     */
    newPrivateData:(path_,newData)=>{
      try{
        fs.writeFileSync(path.join(__dirname,"../private_db",path_),newData)
      }catch(err){

      }
    },
    updatePublicData:()=>{
      const filelist = fs.readdirSync(path.join(__dirname,"../public_db"))
      const fileListNotExtName =[]

      for(let el of filelist){
        fileListNotExtName.push(el.replace(path.extname(el),""))
      }

      db.public ={}

      for(let i in filelist){
        const data = fs.readFileSync(path.join(__dirname,"../public_db",filelist[i]))
        db.public[fileListNotExtName[i]] = JSON.parse(data)
      }

    },
    /**
     * 
     * @param {string} path_ 
     * @param {function({object})} callback 
     */
    modifyPublicData:(path_,callback)=>{
      try{
        const data = JSON.parse(fs.readFileSync(path.join(__dirname,"../public_db",path_)))
        
        fs.writeFileSync(path.join(__dirname,"../public_db",path_),JSON.stringify(callback(data),null,2))
      }catch(err){

      }
    },
    /**
     * 
     * @param {string} path_ 
     * @param {string} newData 
     */
    newPublicData:(path_,newData)=>{
      try{
        fs.writeFileSync(path.join(__dirname,"../public_db",path_),newData)
      }catch(err){

      }
    },
  }
}

db.control.updatePrivateData()
db.control.updatePublicData()




module.exports = db