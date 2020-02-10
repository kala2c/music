const express = require('express')
const adminRouter = express.Router()
const model = require('../models')
const bodyParser = require('body-parser')
const qiniu = require('qiniu')
const config = require('../config/config.js')
console.log(config)
// 创建 application/x-www-form-urlencoded 编码解析
const urlencodedParser = bodyParser.urlencoded({ extended: false })
adminRouter
  .post('/admin/login', async (req, res) => {
    let params = req.body
    if (params.username == 'admin' && params.password == '123456') {
      res.json({
        token: 'cadhjbcajbkaklkallalakknlda'
      })
    } else {
      res.json({
        error: '用户信息错误'
      })
    }
  })
  .get('/admin/music/list', async (req, res) => {
    let music = await model.music.findAll({
      where: {
        status: 0
      }
    })
    res.json(music)
  })
  .get('/admin/groups/list', async (req, res) => {
    let groups = await model.groups.findAll({
      where: {
        status: 0
      }
    })
    res.json(groups)
  })
  .post('/admin/music/create', async (req, res) => {
    console.log(req.body)
    let params = req.body
    params.status = 0
    console.log(params)
    // let split1 = params.name.split('-')
    // params.url = 'http://qn.clw-music.c2wei.cn/'+params.name
    // params.singer = split1[0].trim()
    // params.name = split1[1].split('.')[0].trim()
    let music = await model.music.create(params)
    if (music) {
      res.json({
        'msg': '操作成功'
      })
    } else {
      res.status(500)
      res.json({
        'err': '服务器错误'
      })
    }
  })
  .post('/admin/groups/create', async (req, res) => {
    let groups = await model.groups.create(req.body)
    if (groups) {
      res.json({
        'msg': '创建成功'
      })
    } else {
      res.status(500)
      res.json({
        'err': '服务器错误'
      })
    }
  })
  .get('/admin/upload/token', async (req, res) => {
    let accessKey = config.accessKey
    let secretKey = config.secretKey
    let bucket = 'clw-music'
    let mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
    let options = {
      scope: bucket
    }
    let putPolicy = new qiniu.rs.PutPolicy(options)
    let token = putPolicy.uploadToken(mac)
    res.json({
      token
    })
  })

module.exports = adminRouter