const path = require('path')
const fs = require('fs')

const totalArr = JSON.parse(fs.readFileSync(path.join(__dirname, './data/lol_details_duowan.json')))

const qqArr = JSON.parse(fs.readFileSync(path.join(__dirname, './data/lol_qq.json')))

totalArr.forEach(v => {
  qqArr.forEach(v1 => {
    if (v1.name == v.name) {
      v1.title = v.title
      return
    }
  })
})

fs.writeFileSync(path.join(__dirname, './data/lol_qq.json'), JSON.stringify(qqArr))
console.log('finish')
