const express = require('express')
const fs = require('fs')
const path = require('path')
const router = express.Router()

// 写路由规则 随机获取笑话
router.get('/', (req, res) => {
  fs.readFile(
    path.join(__dirname, '../data/jokes.json'),
    'utf-8',
    (err, data) => {
      // 获取笑话数组
      const jokes = JSON.parse(data)
      // console.log(jokes);
      // 获取随机的索引
      let randomIndex = parseInt(Math.random() * jokes.length)
      if (randomIndex >= jokes.length - 1) {
        randomIndex = jokes.length - 1
      }
      res.send(jokes[randomIndex])
    }
  )
})

// 获取列表的笑话
router.get('/list', (req, res) => {
  // 获取传递的num
  if (req.query.num) {
    // 获取个数
    const num = parseInt(req.query.num)
    // console.log(num)
    if (!isNaN(num)) {
      fs.readFile(
        path.join(__dirname, '../data/jokes.json'),
        'utf-8',
        (err, data) => {
          // 获取笑话数组
          const jokes = JSON.parse(data)
          if (num <= jokes.length) {
            // 随机索引数组
            let randomIndexArr = []
            function getRandomIndex() {
              let randomIndex = parseInt(Math.random() * jokes.length)
              if (randomIndex >= jokes.length - 1) {
                randomIndex = jokes.length - 1
              }
              if (randomIndexArr.indexOf(randomIndex) != -1) {
                getRandomIndex()
              } else {
                randomIndexArr.push(randomIndex)
                if (randomIndexArr.length < num) {
                  getRandomIndex()
                }
              }
            }
            getRandomIndex()
            // 获取随机的索引
            let  randomJokes = []
            randomIndexArr.forEach(v=>{
              randomJokes.push(jokes[v])
            })

            res.send({
              msg:`获取${randomJokes.length}条笑话`,
              jokes:randomJokes
            })
          } else {
            res.send({
              msg:`num超过了最大值，目前只有${jokes.length}条笑话`
            })
          }
        }
      )
    } else {
      res.send({
        msg: 'num的类型不对哦'
      })
    }
  } else {
    res.send({
      msg: '请传递num参数'
    })
  }
})

// 暴露出去
module.exports = router
