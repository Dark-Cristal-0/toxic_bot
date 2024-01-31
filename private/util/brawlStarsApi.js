const https = require('https')
const fs = require('fs')
const path =require('path')
const token = JSON.parse(fs.readFileSync(path.normalize(path.join(__dirname,'../','config','brawlStars.json')))).token

const brawlStarsApi ={
  get: async (url,callback=()=>{})=>{
    https.get(`https://api.brawlstars.com/v1/${url}`,{
      method:"get",
      headers:{
        accept:"application/json",
        authorization:`Bearer ${token}`
      }
      },
      (res)=>{
      let _data =""
      res.on('data',(chank)=>{
        _data+=chank
      })
      res.on('end',()=>{
        let data = JSON.parse(_data)
        callback(data)
      })
      }
    )
  },
  getClub:async (teg,callback)=>{
    let _teg = teg
    if(_teg.includes("#")){
      _teg = _teg.replace("#","%23")
    }
    await brawlStarsApi.get(`clubs/${_teg}`,callback)
    return 0
  },
  getClubMembers:async (teg,callback)=>{
    let _teg = teg
    if(_teg.includes("#")){
      _teg =_teg.replace("#","%23")
    }
    await brawlStarsApi.get(`clubs/${_teg}/members`,callback)
  },
  getPlayer:async (teg,callback)=>{
    let _teg = teg
    if(_teg.includes("#")){
      _teg = _teg.replace("#","%23")
    }
    await brawlStarsApi.get(`players/${_teg}`,callback)
  },
  getPlayerBattlelog:async (teg,callback)=>{
    let _teg = teg
    if(_teg.includes("#")){
      _teg = _teg.replace("#","%23")
    }
    await brawlStarsApi.get(`players/${_teg}/battlelog`,callback)
  },
  getBrawlers:async (callback)=>{
    await brawlStarsApi.get(`brawlers`,callback)
  },
  getBrawler:async (id,callback)=>{
    await brawlStarsApi.get(`brawlers/${id}`,callback)
  },
  getEvents:async (callback)=>{
    brawlStarsApi.get(`events/rotation`,callback)
  },
  getRatingClubs:async (countryCode,callback)=>{
    brawlStarsApi.get(`rankings/${countryCode}/clubs`,callback)
  },
  getRatingPlayers:async (countryCode,callback)=>{
    brawlStarsApi.get(`rankings/${countryCode}/players`,callback)
  },
  getRatingPowerPlay:async (countryCode,callback,seasonId=null)=>{
    if(seasonId){
      brawlStarsApi.get(`rankings/${countryCode}/clubs/${seasonId}`,callback)
    }else{
      brawlStarsApi.get(`rankings/${countryCode}/clubs`,callback)
    }
  },
  getRatingBrawlers:async (countryCode,brawlerId,callback)=>{
    brawlStarsApi.get(`rankings/${countryCode}/brawlers/${brawlerId}`,callback)
  }
}



module.exports = brawlStarsApi