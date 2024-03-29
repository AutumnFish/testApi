const express = require('express')
const fs = require('fs')
const path = require('path')
const router = express.Router()
const { ErrorModel, SuccessModel } = require('../model/responseModel')
const _ = require('lodash')

router.use((req, res, next) => {
  if (!req.jokes) {
    fs.readFile(
      path.join(__dirname, '../data/jokes.json'),
      'utf-8',
      (err, data) => {
        // 获取笑话数组
        const jokes = JSON.parse(data)
        req.jokes = jokes
        next()
      }
    )
  } else {
    next()
  }
})

// 写路由规则 随机获取笑话
router.get('/', (req, res) => {
  const jokes = req.jokes
  // 获取随机的索引
  let randomIndex = parseInt(Math.random() * jokes.length)
  if (randomIndex >= jokes.length - 1) {
    randomIndex = jokes.length - 1
  }
  res.send(jokes[randomIndex])
})

// 获取列表的笑话
router.get('/list', (req, res) => {
  // 获取传递的num
  if (req.query.num) {
    // 获取个数
    const num = parseInt(req.query.num)
    // console.log(num)
    if (!isNaN(num)) {
      // 获取笑话数组
      const jokes = req.jokes
      if (num <= jokes.length) {
        // 随机索引数组
        const randomJokes = _.sampleSize(req.jokes, num)

        res.send(
          new SuccessModel({
            msg: `获取${randomJokes.length}条笑话`,
            data: randomJokes
          })
        )
      } else {
        res.send(
          new ErrorModel({
            msg: `num超过了最大值，目前只有${jokes.length}条笑话`
          })
        )
      }
    } else {
      res.send(
        new ErrorModel({
          msg: 'num的类型不对哦'
        })
      )
    }
  } else {
    res.send(
      new ErrorModel({
        msg: '请传递num参数'
      })
    )
  }
})

// 暴露出去
module.exports = router
