const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

// 写路由规则
router.get("/", (req, res) => {
  fs.readFile(
    path.join(__dirname, "../data/jokes.json"),
    "utf-8",
    (err, data) => {
      // 获取笑话数组
      const jokes = JSON.parse(data);
      // console.log(jokes);
      // 获取随机的索引
      let randomIndex = parseInt(Math.random() * jokes.length);
      if (randomIndex >= jokes.length - 1) {
        randomIndex = jokes.length - 1;
      }
      res.send(jokes[randomIndex]);
    }
  );
});

// 暴露出去
module.exports = router;
