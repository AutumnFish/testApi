const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// 统一读取数据
router.use((req, res, next) => {
  fs.readFile(
    path.join(__dirname, '../data/lol_details_duowan.json'),
    'utf-8',
    (err, data) => {
      if (err) {
        res.status(500).send({
          msg: '服务器内部错误'
        });
      } else {
        const lolArr = JSON.parse(data);
        const imgs = [];
        lolArr.forEach(v=>{
          imgs.push(...v.bgs)
        })
        req.imgs = imgs;
        next();
      }
    }
  );
});

// 写路由规则 随机 图片
router.get('/random', (req, res) => {
  // console.log(req.imgs)
  const index = parseInt(Math.random()*req.imgs.length)
  // 获取所有的图片
  res.send({
    code:200,
    msg:'获取成功',
    url:req.imgs[index]
  })
});



// 暴露出去
module.exports = router;
