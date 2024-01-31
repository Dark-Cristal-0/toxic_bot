const fs = require('fs')
const path = require('path')



const db = {
  private:{
    clubsInfo:[
      {
        "name": "Toxic Cloud",
        "tag": "#QQVJ9CY8",
        "tgUserNameHead": "@Arsurim"
      },
      {
        "name": "Toxic Liberty",
        "tag": "#29J8PVVVV",
        "tgUserNameHead": "@Arsurim"
      },
      {
        "name": "Toxic Disorder",
        "tag": "#2CV0002RP",
        "tgUserNameHead": "@Skcvkwsqkqvcawd"
      },
      {
        "name": "Toxic Obscurity",
        "tag": "#QV0YRYVL",
        "tgUserNameHead": "@allinol_bs"
      },
      {
        "name": "Toxic Paradise",
        "tag": "#2PG2UP0J0",
        "tgUserNameHead": "@nurytin"
      },
      {
        "name": "Toxic Souls",
        "tag": "#QCU298JU",
        "tgUserNameHead": "@TyMaSaK"
      },
      {
        "name": "Toxic Swift",
        "tag": "#VR8CGCVP",
        "tgUserNameHead": "@fulminaant"
      },
      {
        "name": "Toxic Legion",
        "tag": "#2CUG9G9Y9",
        "tgUserNameHead": "@BazMa_SH"
      },
      {
        "name": "Toxic Rain",
        "tag": "#2CYUU99JP",
        "tgUserNameHead": "@Roweouu"
      },
      {
        "name": "Toxic Family",
        "tag": "#29P08J09J",
        "tgUserNameHead": "@DarkSoul_231120"
      },
      {
        "name": "Toxic Royalty",
        "tag": "#2CL902GJ0",
        "tgUserNameHead": "@Sai_Ken"
      },
      {
        "name": "Toxic Eclipse",
        "tag": "#2U29V282Q",
        "tgUserNameHead": "@SpMaestro"
      }
    ],
    timeToNewFetch:{
      "hourse":0,
      "minutes":30,
      "secondes":0
    },
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
      const data = JSON.parse(fs.readFileSync(path.join(__dirname,"../private_db",path_)))
      callback(data)
      fs.writeFileSync(path.join(__dirname,"../private_db",path_),JSON.stringify(data))
    },
    /**
     * 
     * @param {string} path_ 
     * @param {string} newData 
     */
    newPrivateData:(path_,newData)=>{
      fs.writeFileSync(path.join(__dirname,"../private_db",path_),newData)
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
      const data = JSON.parse(fs.readFileSync(path.join(__dirname,"../public_db",path_)))
      callback(data)
      fs.writeFileSync(path.join(__dirname,"../public_db",path_),JSON.stringify(data))
    },
    /**
     * 
     * @param {string} path_ 
     * @param {string} newData 
     */
    newPublicData:(path_,newData)=>{
      fs.writeFileSync(path.join(__dirname,"../public_db",path_),newData)
    },
  }
}

db.control.updatePrivateData()
db.control.updatePublicData()




module.exports = db