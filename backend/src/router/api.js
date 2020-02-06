const express = require('express')
const apiRouter = express.Router()
const model = require('../models')

apiRouter
  .get('/api/music/listgroup', async (req, res) => {
    let groups = await model.groups.findAll({
      where: {
        status: 0
      }
    })
    res.json(groups)
  })
  .get('/api/music/list', async (req, res) => {
    let id = req.query.id || 1
    let music = await model.music.findAll({
      where: { 
        groups_id: id,
        status: 0
      }
    })
    res.json(music)
  })

module.exports = apiRouter