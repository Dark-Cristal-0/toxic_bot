const fs = require('fs')
const path = require('path')
const listdir = fs.readdirSync(__dirname).filter(el=>!el.includes("."))

const comands =[]
const date = new Date()
console.log(`${date}`)
for(let el of listdir){
  const comand = require(path.join(__dirname,el,`index.js`))
  comands.push(comand)
}

module.exports = comands