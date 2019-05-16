const express = require('express')
const fs = require('fs')
const path = require('path')
// body-parser中间件
const bodyParser = require('body-parser')
// 文件地址
const fileName = path.join(__dirname, '../data/user.json')

const router = express.Router()
// 注册bodyParser中间件
router.use(bodyParser.urlencoded({ extended: false }))

// 统一的参数验证
router.use((req, res, next) => {
  if (!req.body.username) {
    res.send('请正确传递参数')
  } else {
    next()
  }
})
// 注册验证
router.post('/check', (req, res) => {
  fs.readFile(fileName, (err, data) => {
    const userList = JSON.parse(data)
    // 查找是否有匹配的
    const filterOne = userList.filter(v => {
      return v === req.body.username
    })
    res.send(filterOne.length == 0 ? '恭喜你可以注册哦' : '很遗憾，已被注册！')
  })
})

// 用户注册
router.post('/register', (req, res) => {
  fs.readFile(fileName, (err, data) => {
    let userList = JSON.parse(data)
    // 检查是否已经存在
    const filterOne = userList.filter(v => {
      return v === req.body.username
    })
    // 判断
    if (filterOne.length != 0) {
      res.send('该用户名已被注册，请重新提交')
    } else {
      userList.push(req.body.username)
      // 保存文件
      fs.writeFile(fileName, JSON.stringify(userList), err => {
        res.send('注册成功')
      })
    }
  })
})

// 暴露出去
module.exports = router
