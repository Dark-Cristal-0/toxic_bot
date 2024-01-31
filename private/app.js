const botSetCommands = require('./bot/setComands')
const botComands = require('./bot/comands/index')
for(let el of botComands){
  el()
}