const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// 统一读取数据
router.use((req, res, next) => {
  fs.readFile(
    path.join(__dirname, '../data/lol_qq.json'),
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
  const { q } = req.query;
  console.log(q)
  if (!q) {
    res.send({
      code: 200,
      msg: '获取成功',
      data:req.data
      .map(v => {
        const { id, name, iconUrl } = v;
        return {
          id,
          name,
          iconUrl
        };
      })
    });
  } else {
    res.send({
      code: 200,
      msg: '获取成功',
      data: req.data
        .filter(v => {
          return v.title.indexOf(q) != -1 || v.name.indexOf(q) != -1;
        })
        .map(v => {
          const { id, name, iconUrl } = v;
          return {
            id,
            name,
            iconUrl
          };
        })
    });
  }
});

// 获取列表的笑话
router.get('/info', (req, res) => {
  // 获取get的数据
  const { id } = req.query;
  // console.log(q)
  if (!id) {
    res.send({
      code: 400,
      msg: '请正确传递参数 id'
    });
  } else {
    const data = req.data.filter(v => {
      return v.id === id;
    })[0];
    if (data) {
      res.send({
        code: 200,
        msg: '获取成功',
        data
      });
    } else {
      res.send({
        code: 400,
        msg: 'id有误,请检查'
      });
    }
  }
});

// 暴露出去
module.exports = router;
