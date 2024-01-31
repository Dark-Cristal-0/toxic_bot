const http= require('http')
const fs = require('fs')
const path = require('path')

const server = http.createServer()
server.on('request',(req,res)=>{
  console.log(req.url,req.method)
  res.writeHead(200,"good",{})
  res.end("<h1>Hello World</h1>")
})
server.listen(3000,"localhost")