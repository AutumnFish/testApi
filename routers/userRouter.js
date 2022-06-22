const express = require('express')
const fs = require('fs')
const path = require('path')
// body-parser中间件
const bodyParser = require('body-parser')
// 文件地址
const fileName = path.join(__dirname, '../data/user.json')
const { SuccessModel, ErrorModel } = require('../model/responseModel')

const router = express.Router()
// 注册bodyParser中间件
const parser = bodyParser.urlencoded({ extended: false })
const jsonParser = bodyParser.json()

// 统一的参数验证
const checkParams = function (req, res, next) {
  if (!req.body.username) {
    res.send(
      new ErrorModel({
        msg: '请正确传递参数'
      })
    )
  } else if (
    Object.prototype.toString.call(req.body.username) !== '[object String]'
  ) {
    res.send(
      new ErrorModel({
        msg: '参数类型有误'
      })
    )
  } else {
    next()
  }
}

// 注册验证
router.post('/check', parser, jsonParser, checkParams, (req, res) => {
  fs.readFile(fileName, (err, data) => {
    let userList
    try {
      userList = JSON.parse(data)
      const filterOne = userList.find(v => {
        return v === req.body.username
      })
      res.send(
        !filterOne
          ? new SuccessModel({ msg: '恭喜你可以注册哦' })
          : new ErrorModel({ msg: '很遗憾,已被注册!' })
      )
    } catch (error) {
      fs.writeFile(fileName, '[]', err => {
        res.send(new ErrorModel({ msg: '服务器异常,数据重置，请重试' }))
      })
    }
    // 查找是否有匹配的
  })
})

// 用户注册 - 基于form数据
router.post('/register', parser, jsonParser, checkParams, (req, res) => {
  fs.readFile(fileName, (err, data) => {
    let userList
    try {
      userList = JSON.parse(data)
      // 检查是否已经存在
      const filterRes = userList.find(v => {
        return v === req.body.username
      })

      // 判断
      if (filterRes) {
        res.send(
          new ErrorModel({
            msg: '该用户名已被注册，请重新提交'
          })
        )
      } else {
        userList.push(req.body.username)
        // 保存文件
        fs.writeFile(fileName, JSON.stringify(userList), err => {
          res.send(
            new SuccessModel({
              msg: '注册成功'
            })
          )
        })
      }
    } catch (error) {
      console.log('/api/user/register接口异常')
      fs.writeFile(fileName, '[]', err => {
        res.send(new ErrorModel({ msg: '服务器异常,数据重置，请重试' }))
      })
    }
  })
})

router.post('/reg', jsonParser, checkParams, (req, res) => {
  fs.readFile(fileName, (err, data) => {
    let userList
    try {
      userList= JSON.parse(data)
      // 检查是否已经存在
      const filterRes = userList.find(v => {
        return v === req.body.username
      })
      // 判断
      if (filterRes === true) {
        res.send(
          new ErrorModel({
            msg: '已被注册，请检查'
          })
        )
      } else {
        userList.push(req.body.username)
        // 保存文件
        fs.writeFile(fileName, JSON.stringify(userList), err => {
          res.send(
            new SuccessModel({
              msg: '注册成功'
            })
          )
        })
      }
    } catch (error) {
      console.log('/api/user/reg接口异常')
      fs.writeFile(fileName, '[]', err => {
        res.send(new ErrorModel({ msg: '服务器异常,数据重置，请重试' }))
      })
    }

  })
})
router.get('/reset/:sec', (req, res) => {
  if (req.params.sec === 'autumnfish') {
    fs.writeFile(path.join(__dirname, '../data/user.json'), '[]', err => {
      if (!err) {
        res.send({
          code: 200,
          msg: '重置成功'
        })
      } else {
        res.send({
          code: 500,
          msg: '服务器内部错误'
        })
      }
    })
  } else {
    res.status(404).send(`404 not found`)
  }
})

// 暴露出去
module.exports = router
