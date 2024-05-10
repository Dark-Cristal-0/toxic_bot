/**
 * 
 * @param {Number} num 
 * @returns 
 */
const func=(num)=>{
  let textNum= ""+num
  let couter=0
  let newText=""
  for(let i =textNum.length-1;i>=0;i--){
    if(couter==3){
      couter=0
      newText="."+newText
    }
    newText=textNum[i]+newText
    couter++
  }
  return newText
}
module.exports = func