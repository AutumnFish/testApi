const express = require('express')
const fs = require('fs')
const path = require('path')
const router = express.Router()

// 写路由规则
// 根据查询英雄数据
router.get('/page', (req, res) => {
  // 参数判断

  // 读取数据并返回
  fs.readFile(
    path.join(__dirname, '../data/cqList.json'),
    'utf-8',
    (err, data) => {
      const cq = JSON.parse(data)
      // 获取查询字符串
      const query = req.query.query || ''
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
      // 获取 页码
      const pageNum = parseInt(req.query.pageNum)
      if (isNaN(pageNum)) {
        res.send({
          msg: 'pageNum类型不对，请检查'
        })
        return
      }

      // 获取 页容量
      const pageSize = parseInt(req.query.pageSize)
      if (isNaN(pageSize)) {
        res.send({
          msg: 'pageSize类型不对，请检查'
        })
        return
      }

      // 计算总页数
      const totalPage = Math.ceil(filterHero.length / pageSize)
      // 判断索引是否越界
      if (pageNum > totalPage) {
        res.send({
          msg: `总页数为${totalPage},pageNum不达标`
        })
      }
      // 计算起始索引
      let startIndex = (pageNum - 1) * pageSize
      let endIndex = startIndex + pageSize
      if (endIndex > filterHero.length - 1) {
        endIndex = filterHero.length - 1
      }
      // 获取 数据
      let list = []
      for (let i = startIndex; i < endIndex; i++) {
        list.push(filterHero[i])
      }

      res.send({
        msg: '获取成功',
        totalPage,
        list
      })
    }
  )
})
router.get('/', (req, res) => {
  // 参数判断

  // 读取数据并返回
  fs.readFile(
    path.join(__dirname, '../data/cqList.json'),
    'utf-8',
    (err, data) => {
      const cq = JSON.parse(data)
      // 获取查询字符串
      const query = req.query.query || ''
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
        list:filterHero
      })
    }
  )
})

// 暴露出去
module.exports = router
