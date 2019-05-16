// 导入express
const express = require('express')
// 导入笑话路由
const joke = require('./routers/jokeRouter')
// 导入英雄路由
const hero = require('./routers/heroRouter')
// 导入用户路由
const user = require('./routers/userRouter')
// 导入cors允许跨域
const cors = require('cors')

// 实例化服务器对象
const app = express()
// 使用cors设置允许跨域
app.use(cors())

// 统一设置延迟
app.use((req,res,next)=>{
    setTimeout(() => {
        next()
    }, 1500);
})

// 添加路由 - 笑话路由
app.use('/joke',joke)
// 添加路由 - 英雄路由
app.use('/hero',hero)
// 添加路由 - 用户路由
app.use('/user',user)

// 开启监听
const server = app.listen(8888,()=>{
    // 提示信息
    console.log('success')
})