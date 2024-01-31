const https = require("https")

https.get('https://api.ipify.org',(res)=>{
  res.on('data',(ip)=>{
    console.log(`my ip: ${ip}`)
  })
})