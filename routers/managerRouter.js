const express = require('express')
const fs = require('fs')
const path = require('path')
const router = express.Router()

var multer = require('multer')
var upload = multer({
  dest: path.join(__dirname, '../uploads'),
  limits: {
    //在这里设置最多能上传多少个文件，那么就不用在下面upload.array('field1', 5)设置了
    files: 1, //一次只允许上传一个文件
    fileSize: 1000 * 1024 // 设置文件大小不能超过1000*1024
  }
})
// 创建上传的限制对象

// 定义中间件
router.use((req, res, next) => {
  fs.readFile(
    path.join(__dirname, '../data/manager.json'),
    'utf-8',
    (err, data) => {
      // 把数据设置到req对象上
      req.mangerData = JSON.parse(data)
      next()
    }
  )
})

// 查询接口
router.get('/list', (req, res) => {
  // 返回查询到的数据
  res.send({
    msg: '获取成功',
    code: 200,
    data: req.mangerData
  })
})
// 增加接口
router.post('/add', upload.single('icon'), function(req, res, next) {
  // req.file is the `avatar` file
  res.send(req.file)
  // req.body will hold the text fields, if there were any
})
router.use(function(err, req, res, next) {
  if (err.code === 'LIMIT_FILE_SIZE') {
    res.send({
      msg:'文件太大啦',
      code:400,
    })
    return
  }

  // Handle any other errors
})
// 删除接口
// 修改接口

// 暴露出去
module.exports = router
