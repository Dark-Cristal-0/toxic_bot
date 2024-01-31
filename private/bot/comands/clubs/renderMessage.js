/**
 * 
 * @param {string} name 
 * @param {string} tag 
 * @param {number} trophies 
 * @param {number} requiredTrophies 
 * @param {number} membersCout 
 * @param {string} tgUserNameHead 
 * @param {number} timeFetch 
 * @param {number} timeToNewFetch
 * @returns {string} 
 */
const func = (name,tag,trophies,requiredTrophies,membersCout,tgUserNameHead,timeFetch,timeToNewFetch)=>{
  const timeNaw =(new Date()).getTime()
  const time ={
    naw :(new Date()).getTime(),
    fetch:timeFetch,
    toNewFetch:timeToNewFetch
  }
   /**
    * @param {number} time
    */
  const getTime =(time)=> {
    if(time>0){
      const seconds = Math.floor((time)/1000)
      const minutes =Math.floor(seconds/60)
      const hourse  =Math.floor(minutes/60)
      let text =``
      hourse?text+=`${hourse}h `:null
      minutes?text+=`${minutes-hourse*60}m `:null
      seconds?text+=`${seconds-minutes*60}s `:null
      return text
    }else{
      const seconds = Math.floor((-time)/1000)
      const minutes =Math.floor(seconds/60)
      const hourse  =Math.floor(minutes/60)
      let text =``
      hourse?text+=`-${hourse}h `:null
      minutes?text+=`-${minutes-hourse*60}m `:null
      seconds?text+=`-${seconds-minutes*60}s `:null
      return text
    }
  }
  const text =`
  Name: ${name} 💚

    Tag: ${tag}
      
    Trophies: 🏆${trophies}🏆
      
    Invite: 🏆${requiredTrophies}🏆
      
    Members: ${membersCout}/30👨‍👩‍👧‍👦
      
    Tg head: 🔗https://t.me/${tgUserNameHead.replace("@","")}
      
    Last update: ${getTime(timeNaw-timeFetch)}🕰️
      
    New update: ${getTime((timeFetch + timeToNewFetch)-timeNaw)}🕰️
  ` 
  
  return text
}
module.exports = func
