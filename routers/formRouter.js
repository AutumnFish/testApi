const express = require('express');
// body-parser中间件
const bodyParser = require('body-parser')
// 注册bodyParser中间件
const parser = bodyParser.urlencoded({ extended: false })
const jsonParser = bodyParser.json()
const router = express.Router();
const multer = require('multer')
const upload = multer({
  dest: path.join(__dirname, '../uploads'),
  limits: {
    fileSize: 10240
  }
})
router.use('/static', express.static(path.join(__dirname, '../uploads/')))


// 写路由规则 随机 图片
router.get('/submit', (req, res) => {
  // console.log(req.imgs)
  // 获取所有的图片
  res.send({
    code:200,
    msg: `通过get提交数据`,
    data:req.query
  })
});

// 写路由规则 随机 图片
router.post('/submit',parser, (req, res) => {
  // 获取所有的图片
  res.send({
    code:200,
    msg: `通过post提交数据`,
    data:req.body
  })
});

// 写路由规则 随机 图片
router.post('/upload',parser, (req, res) => {
  // 获取所有的图片
  res.send({
    code:200,
    msg: `通过post提交数据`,
    data:req.body
  })
});


router.use(function (err, req, res, next) {
  if (err.code === 'LIMIT_FILE_SIZE') {
    res.send({
      msg: '文件太大啦,限制为10kb',
      code: 400
    })
    return
  }

  // Handle any other errors
})



// 暴露出去
module.exports = router;
