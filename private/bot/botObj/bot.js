const fs = require('fs')
const path = require('path')
const MyBot = require('./MyBot')

const config = JSON.parse(fs.readFileSync(path.normalize(path.join(__dirname,'../','../','config','telegram.json'))))

const bot = new MyBot(config.token,config.options)

module.exports = bot