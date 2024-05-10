const db = require('../db/controlDb/db')
const brawlStarsApi = require('./brawlStarsApi')

const func = ()=>{
  db.control.updatePrivateData()
  for(let el of db.private.clubsInfo){
    const tag = el.tag
    const name = el.name
    brawlStarsApi.getClub(tag,(data,error)=>{
      if(!error){
        data.timeFetch = new Date().getTime()
        db.control.newPublicData(`club_${tag}.json`,JSON.stringify(data,null,2))
        db.control.updatePublicData()
      }
    })
  }
}
module.exports = func