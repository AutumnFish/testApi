const express = require('express')
const fs = require('fs')
const path = require('path')
const router = express.Router()
var multer = require('multer')
var upload = multer({
  dest: path.join(__dirname, '../uploads')
  // limits: {
  //   //在这里设置最多能上传多少个文件，那么就不用在下面upload.array('field1', 5)设置了
  //   files: 1, //一次只允许上传一个文件
  //   fileSize: 1000 * 1024 // 设置文件大小不能超过1000*1024
  // }
})
// 托管静态资源
router.use('/static', express.static(path.join(__dirname, '../uploads')))

// ------------获取详细信息并返回------------
// 根据不同的类型获取对应的英雄
router.get('/category', (req, res) => {
  if (!req.query.type) {
    res.send({
      msg: '请传递type',
      code: 400
    })
    return
  }
  fs.readFile(
    path.join(__dirname, '../data/cqList.json'),
    'utf-8',
    (err, data) => {
      const cq = JSON.parse(data)
      const filterHero = cq
        .filter(v => {
          return v.type == req.query.type
        })
        .map(v => {
          return {
            heroName: v.heroName,
            heroIcon: v.heroIcon,
            skillName: v.skillName,
            skillIcon: v.skillIcon,
            weaponName: v.weaponName,
            weaponIcon: v.weaponIcon
          }
        })
      if (filterHero.length == 0) {
        res.send({
          msg: 'type的值不对，请正确输入',
          code: 400
        })
      } else {
        res.send({
          msg: `获取${req.query.type}英雄数据`,
          code: 200,
          data: {
            heros: filterHero
          }
        })
      }
    }
  )
})
// 获取gif图
// 传英雄名过来
router.get('/gif', (req, res) => {
  if (!req.query.name) {
    res.send({
      msg: '请正确传递参数',
      code: 400
    })
    return
  }
  fs.readFile(
    path.join(__dirname, '../data/cqList.json'),
    'utf-8',
    (err, data) => {
      const cq = JSON.parse(data)
      // 判断数据
      const filterOne = cq.filter(v => {
        if (v.heroName == req.query.name) {
          return true
        }
      })
      if (filterOne == 0) {
        res.send({
          msg: '查询的英雄不存在哦，检查一下',
          code: 400
        })
      } else {
        res.send({
          data: {
            skillGif: filterOne[0].skillGif,
            heroName: req.query.name
          },
          msg: `${req.query.name}的技能图片获取成功`,
          code: 200
        })
      }
    }
  )
})

// ------------获取基础信息------------
// 写路由规则
// 根据查询英雄数据
router.get('/page', (req, res) => {
  // 参数判断
  // 读取数据并返回
  fs.readFile(
    path.join(__dirname, '../data/cqSimple.json'),
    'utf-8',
    (err, data) => {
      const cq = JSON.parse(data)
      // console.log(cq)
      // 获取查询字符串
      const query = req.query.query || ''
      const filterHero = cq
        .filter(v => {
          // console.log(v);
          if (!v.skillName) {
            console.log(v)
          }
          try {
            return (
              v.heroName.indexOf(query) != -1 ||
              v.skillName.indexOf(query) != -1
            )
          } catch (error) {
            return false
          }
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
      const totalPage = Math.ceil(filterHero.length / pageSize)-1
      // 判断索引是否越界
      if (pageNum > totalPage) {
        res.send({
          msg: `总页数为${totalPage},pageNum不达标`
        })
        return
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
// 数据查询
router.get('/', (req, res) => {
  // 参数判断
  // 读取数据并返回
  fs.readFile(
    path.join(__dirname, '../data/cqSimple.json'),
    'utf-8',
    (err, data) => {
      const cq = JSON.parse(data)
      // 获取查询字符串
      const query = req.query.query || ''
      const filterHero = cq
        .filter(v => {
          try {
            return (
              v.heroName.indexOf(query) != -1 ||
              v.skillName.indexOf(query) != -1
            )
          } catch (error) {
            return false
          }
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
        list: filterHero
      })
    }
  )
})
// 英雄新增
router.post('/add', upload.single('heroIcon'), function(req, res, next) {
  // res.send(req.file)d
  // fs.renameSync(path.join())
  if (!req.body.heroName || !req.body.heroSkill || !req.body.file) {
    res.send({
      msg: '参数不对哦',
      code: 400
    })
    return
  }
  // res.send(req.body)
  fs.readFile(
    path.join(__dirname, '../data/cqSimple.json'),
    'utf-8',
    (err, data) => {
      const cq = JSON.parse(data)

      // 检查是否已经存在
      const filterOne = cq.filter(v => {
        return v.heroName == req.body.heroName
      })
      if (filterOne.length != 0) {
        res.send({
          msg: '该英雄已存在,请检查',
          code: 400
        })
        return
      }
      cq.push({
        heroIcon: `https://autumnfish.cn/api/cq/static/${req.file.filename}`,
        ...req.body
      })
      // 保存
      fs.writeFile(
        path.join(__dirname, '../data/cqSimple.json'),
        JSON.stringify(cq),
        (err, data) => {
          res.send({
            msg: '新增成功',
            code: 201,
            info: {
              heroIcon: `https://autumnfish.cn/api/cq/static/${
                req.file.filename
              }`,
              ...req.body
            }
          })
        }
      )
    }
  )
  // res.send(req.file)
  // res.send({
  //   msg:'新增成功',
  //   code:201,
  //   url:`localhost:8888/cq/static/${req.file.filename}`
  // })
})

// 文件上传错误处理
router.use(function(err, req, res, next) {
  if (err.code === 'LIMIT_FILE_SIZE') {
    res.send({
      msg: '文件太大啦',
      code: 400
    })
    return
  }

  // Handle any other errors
})

// 英雄新增

// 暴露出去
module.exports = router
