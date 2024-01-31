const TgBot = require('./TgBot')

class MyBot extends TgBot{
  constructor(token,options){
    super(token,options)
  }
}

module.exports = MyBot