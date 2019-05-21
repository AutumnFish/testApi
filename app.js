// 导入express
const express = require('express')
// 导入笑话路由
const joke = require('./routers/jokeRouter')
// 导入英雄路由
const hero = require('./routers/heroRouter')
// 导入用户路由
const user = require('./routers/userRouter')
// 导入cq路由
const cq = require('./routers/cqRouter')
// 导入manager路由
const manager = require('./routers/managerRouter.js')
// 导入cors允许跨域
const cors = require('cors')
// 导入express日志插件
const morgan = require('morgan');


// 实例化服务器对象
const app = express()
// 使用cors设置允许跨域
app.use(cors())
// 使用日志插件
app.use(morgan('short'));

// 统一设置延迟
app.use((req, res, next) => {
  setTimeout(() => {
    next()
  }, 1000)
})

// 托管静态资源


// 添加路由 - 笑话路由
app.use('/joke', joke)
// 添加路由 - 英雄路由
app.use('/hero', hero)
// 添加路由 - 用户路由
app.use('/user', user)
// 添加路由 - cq路由
app.use('/cq', cq)
// 添加路由 - manager路由
app.use('/manager', manager)

// 开启监听
const server = app.listen(8888, () => {
  // 提示信息
  console.log('success')
})
