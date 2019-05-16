const express = require("express");
const fs = require("fs");
const path = require("path");
// body-parser中间件
const bodyParser = require('body-parser')

const router = express.Router();
// 注册bodyParser中间件
router.use(bodyParser.urlencoded({ extended: false }))
// 注册验证
router.post('/check',(req,res)=>{
    res.send(req.body)
})

// 暴露出去
module.exports = router;
