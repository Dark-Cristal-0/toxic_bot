const EventEmmiter =require("events")
const fs = require("fs")
const path = require("path")

const event = new EventEmmiter()

event.addListener("new_polling_err",(obj)=>{
    const pathDir = path.join(__dirname,"./../logs")
    if(!fs.existsSync(pathDir)){
        fs.mkdir(pathDir)
    }
    const date = new Date()
    const fileName = `${date.getFullYear()}_${date.getMonth()+1}_${date.getDay()}_${date.getHours()}_${date.getMinutes()}_${date.getSeconds()}`
    fs.writeFileSync(path.join(pathDir,`./${fileName}.txt`),JSON.stringify(obj))
})


module.exports = event
