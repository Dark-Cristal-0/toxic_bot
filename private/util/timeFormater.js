
/**
 * 
 * @param {number} time 
 * @param {boolean} utc 
 * @returns {string}
 */
const func = (time,utc=false)=>{
  const date = time?new Date(time):new Date()
  const text =utc?`${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}`:`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  return text
}
module.exports = func