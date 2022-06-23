const express = require('express')
// body-parser中间件
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')
// 注册bodyParser中间件
const parser = bodyParser.urlencoded({ extended: false })
const router = express.Router()
const multer = require('multer')

function checkFileType (file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toString())
  // Check mime
  const mimetype = filetypes.test(file.mimetype)

  if (mimetype && extname) {
    return cb(null, true)
  } else {
    cb('只能上传图片')
  }
}

// 上传头像+各类验证
const upload = multer({
  storage: multer.diskStorage({
    destination (req, file, cb) {
      cb(null, path.join(__dirname, '../uploads/test'))
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname +
          '-' +
          Date.now() +
          '.' +
          file.originalname.split('.')[1]
      )
    }
  }),
  fileFilter (req, file, cb) {
    checkFileType(file, cb)
  },
  limits: {
    fileSize: 102400
  }
}).single('avatar')

router.use(
  '/static/test',
  express.static(path.join(__dirname, '../uploads/test'))
)

// 写路由规则 随机 图片
router.get('/submit', (req, res) => {
  // console.log(req.imgs)
  // 获取所有的图片
  res.send({
    code: 200,
    msg: `通过get提交数据`,
    data: req.query
  })
})

// 写路由规则 随机 图片
router.post('/submit', parser, (req, res) => {
  // 获取所有的图片
  res.send({
    code: 200,
    msg: `通过post提交数据`,
    data: req.body
  })
})

// FormData提交数据
router.post('/formdata', upload, (req, res) => {
  // if (!req.file) {
  //   res.send({
  //     msg: '请上传文件',
  //     code: 400
  //   })
  //   return
  // }
  // 获取所有的图片
  if (!req.body) {
   return res.send({
      code: 400,
      msg: '没有数据',
    
    })
  }
  res.send({
    code: 200,
    msg: `测试成功`,
    data: {
      ...req.body,
      avatar: req.file?`https://autumnfish.cn/api/form/static/test/${req.file.filename}`:'未上传头像'
    }
  })

})

// 写路由规则 随机 图片
router.post('/upload', upload, (req, res) => {
  if (!req.file) {
    res.send({
      msg: '请上传文件',
      code: 400
    })
    return
  }
  // 获取所有的图片
  res.send({
    code: 200,
    msg: `头像上传成功`,
    data: `https://autumnfish.cn/api/form/static/test/${req.file.filename}`
  })
})
router.get('/reset/:sec', upload, (req, res) => {
  if (req.params.sec === 'autumnfish') {
    try {
      const fileRes = fs.readdirSync(path.join(__dirname, '../uploads/test'))
      fileRes.forEach(v => {
        fs.unlinkSync(path.join(__dirname, `../uploads/test/${v}`))
      })
    } catch (error) {}
    res.send({
      code: 200,
      msg: '重置成功'
    })
  } else {
    res.status(404).send('404 Not Found')
  }
})

router.use(function (err, req, res, next) {
  console.log(err)
  if (err.code === 'LIMIT_FILE_SIZE') {
    res.send({
      msg: '图片太大啦,限制为100kb',
      code: 400
    })
    return
  } else if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    res.send({
      msg: '请正确上传文件',
      code: 400
    })
    return
  } else {
    res.send({
      msg: err,
      code: 400
    })
  }

  // Handle any other errors
})

// 暴露出去
module.exports = router
