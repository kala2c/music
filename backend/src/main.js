const express = require('express')
const app = express()
const path = require('path');
const bodyParser = require('body-parser')
// const cookieParser = require('cookie-parser');

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.static('public'))

// 设置跨域请求
const crosFilter = function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PATCH, DELETE, PUT");
  res.setHeader("Access-Control-Max-Age", "3600");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next()
}
app.use(crosFilter)

const apiRouter = require('./router/api.js')
const adminRouter = require('./router/admin.js')

app.use(apiRouter)
app.use(adminRouter)

app.use((request, response) => {
  response.status(404)
  response.json({
    errMsg: "请求信息不存在"
  })
})

const port = 7000
app.listen(port, () => {
  console.log("Server running at port "+port)
})
