const express = require('express')
const fs = require('fs')
const path = require('path')
const router = express.Router()

// 写路由规则
// 根据名字查询外号
router.get('/', (req, res) => {
  // 参数判断

  // 读取数据并返回
  fs.readFile(
    path.join(__dirname, '../data/cqList.json'),
    'utf-8',
    (err, data) => {
      const cq = JSON.parse(data)
      // 获取查询字符串
      const query = req.query.query
      const filterHero = cq
        .filter(v => {
          return (
            v.heroName.indexOf(query) != -1 || v.skillName.indexOf(query) != -1
          )
        })
        .map(v => {
          return {
            name: v.heroName,
            icon: v.heroIcon,
            skill: v.skillName
          }
        })
      res.send({
        msg: '获取成功',
        total: cq.length,
        list: filterHero
      })
    }
  )
})

// 暴露出去
module.exports = router
