const express = require('express')
const fs = require('fs')
const path = require('path')
const router = express.Router()

// 写路由规则
// 根据名字查询外号
router.get('/simple', (req, res) => {
  // 参数判断
  if (!req.query['name']) {
    res.send('name参数没有传递哦')
  } else {
    // 读取数据并返回
    fs.readFile(
      path.join(__dirname, '../data/lol_details_duowan.json'),
      'utf-8',
      (err, data) => {
        const heros = JSON.parse(data)
        // console.log(heros)
        const filterHero = heros.filter(v => {
          return v.name == req.query.name
        })
        if (filterHero.length == 0) {
          res.send('没有找到，是不是名字写错了啊')
        } else {
          res.send(filterHero[0].title)
        }
      }
    )
  }
})
// 根据名字 查询简略信息
router.get('/info', (req, res) => {
  // 参数判断
  if (!req.query['name']) {
    res.send('name参数没有传递哦')
  } else {
    // 读取数据并返回
    fs.readFile(
      path.join(__dirname, '../data/lol_details_duowan.json'),
      'utf-8',
      (err, data) => {
        const heros = JSON.parse(data)
        // console.log(heros)
        const filterHero = heros.filter(v => {
          return (v.name.indexOf(req.query.name)!=-1)
        })
        if (filterHero.length == 0) {
          res.send('没有找到，是不是名字写错了啊')
        } else {
          const { title, name, bgs, bgs_thumbnail, story } = filterHero[0]

          res.send({ title, name, bg: bgs[0], icon: bgs_thumbnail[0], story })
        }
      }
    )
  }
})
// 根据名字 查询详情
router.get('/detail', (req, res) => {
  // 参数判断
  if (!req.query['name']) {
    res.send('name参数没有传递哦')
  } else {
    // 读取数据并返回
    fs.readFile(
      path.join(__dirname, '../data/lol_details_duowan.json'),
      'utf-8',
      (err, data) => {
        const heros = JSON.parse(data)
        // console.log(heros)
        const filterHero = heros.filter(v => {
          return v.name == req.query.name
        })
        if (filterHero.length == 0) {
          res.send('没有找到，是不是名字写错了啊')
        } else {
          const {
            title,
            name,
            bgs,
            tags,
            bgs_thumbnail,
            Ability,
            story
          } = filterHero[0]
          res.send({
            title,
            name,
            bgs,
            tags,
            icons: bgs_thumbnail,
            ability: Ability,
            story
          })
        }
      }
    )
  }
})

// 暴露出去
module.exports = router
