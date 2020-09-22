const express = require('express')
const fs = require('fs')
const path = require('path')
const router = express.Router()
const { ErrorModel, SuccessModel } = require('../model/responseModel')
const { request } = require('../utils/request')

// 统一读取数据
router.use((req, res, next) => {
  fs.readFile(
    path.join(__dirname, '../data/lol_qq.json'),
    'utf-8',
    (err, data) => {
      if (err) {
        res.status(500).send({
          msg: '服务器内部错误'
        })
      } else {
        req.data = JSON.parse(data)
        next()
      }
    }
  )
})

// 写路由规则 随机获取英雄数据
router.get('/search', async (req, res) => {
  // 获取get的数据
  const { q } = req.query
  // 获取所有的英雄数据
  const getRes = await request.get(
    'https://game.gtimg.cn/images/lol/act/img/js/heroList/hero_list.js'
  )
  // 生成头像地址
  getRes.hero.forEach(v => {
    v.icon = `http://game.gtimg.cn/images/lol/act/img/champion/${v.alias}.png`
  })
  // 没查询参数返回所有
  if (!q) {
    // 通过 axios获取所有并返回
    res.send(
      new SuccessModel({
        data: getRes.hero
      })
    )
  } else {
    // 查询一下数据
    const filterRes = getRes.hero.filter(v => {
      return v.name.includes(q) || v.title.includes(q)
    })
    // 查到了
    if (filterRes.length != 0) {
      return res.send(
        new SuccessModel({
          data: filterRes
        })
      )
    }
    // 没查到
    res.send(
      new ErrorModel({
        msg: '没查到,请重新查询!'
      })
    )
  }
})

// 获取列表的笑话
router.get('/info', async (req, res) => {
  // 获取get的数据
  const { id } = req.query
  // 没有传递查询参数
  if (!id)
    return res.send({
      code: 400,
      msg: '请正确传递参数 id'
    })

  try {
    // 获取详细数据
    const infoRes = await request.get(
      `https://game.gtimg.cn/images/lol/act/img/js/hero/${id}.js`
    )
    res.send(infoRes)
  } catch (error) {
    res.send(new ErrorModel({
      msg:'id有误,请检查'
    }))
  }
})

// 暴露出去
module.exports = router
