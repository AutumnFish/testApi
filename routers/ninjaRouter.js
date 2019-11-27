const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// 统一读取数据
router.use((req, res, next) => {
  fs.readFile(
    path.join(__dirname, '../data/ninja.json'),
    'utf-8',
    (err, data) => {
      if (err) {
        res.status(500).send({
          msg: '服务器内部错误'
        });
      } else {
        req.data = JSON.parse(data);
        next();
      }
    }
  );
});

// 写路由规则 随机获取笑话
router.get('/search', (req, res) => {
  // 获取get的数据
    res.send({
      code: 200,
      msg: '获取成功',
      data:req.data
    });
});



// 暴露出去
module.exports = router;
