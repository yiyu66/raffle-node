const express = require('express')
let bodyParser = require('body-parser')
const app = express()
const port = 3000


//设置跨域访问
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  next();
});

// 解析提交的json参数
let jsonParser = bodyParser.json()
// 解析提交的form表单参数
let urlencodedParser = bodyParser.urlencoded({
  extended: true
})

// 抽奖结果接口
app.get('/PrizeResult', (req, res) => {
  var priceNum = Math.floor(Math.random() * 8)
  res.send({
    Num: priceNum
  })
})
// 奖品列表接口
app.get('/PrizeList', (req, res) => {
  res.send({
    resultList: [{
        name: '奖品0',
        order: 1, // 顺序
        probability: 12.5,
        prizeimage: "待添加 ",
      },
      {
        name: '奖品1',
        order: 2,
        probability: 12.5,
        prizeimage: "待添加",
      },
      {
        name: '奖品2',
        order: 2,
        probability: 12.5,
        prizeimage: "待添加",
      },
      {
        name: '奖品3',
        order: 3,
        probability: 12.5,
        prizeimage: "待添加",
      },
      {
        name: '奖品4',
        order: 4,
        probability: 12.5,
        prizeimage: "待添加",
      },
      {
        name: '奖品5',
        order: 5,
        probability: 12.5,
        prizeimage: "待添加",
      },
      {
        name: '奖品6',
        order: 6,
        probability: 12.5,
        prizeimage: "待添加",
      },
      {
        name: '奖品7',
        order: 7,
        probability: 12.5,
        prizeimage: "待添加",
      },
    ]
  })
})
// 当前选中的8个奖品列表接口
app.get('/RaffleList', (req, res) => {
  res.send({
    resultList: [{
        name: '奖品0',
        order: 1, // 顺序
        probability: 12.5,
        prizeimage: "待添加 ",
      },
      {
        name: '奖品1',
        order: 2,
        probability: 12.5,
        prizeimage: "待添加",
      },
      {
        name: '奖品2',
        order: 2,
        probability: 12.5,
        prizeimage: "待添加",
      },
      {
        name: '奖品3',
        order: 3,
        probability: 12.5,
        prizeimage: "待添加",
      },
      {
        name: '奖品4',
        order: 4,
        probability: 12.5,
        prizeimage: "待添加",
      },
      {
        name: '奖品5',
        order: 5,
        probability: 12.5,
        prizeimage: "待添加",
      },
      {
        name: '奖品6',
        order: 6,
        probability: 12.5,
        prizeimage: "待添加",
      },
      {
        name: '奖品7',
        order: 7,
        probability: 12.5,
        prizeimage: "待添加",
      },
    ]
  })
})
// 新增奖品接口
app.post('/addprize', jsonParser, (req, res) => {
  console.log(req.body)
  res.send({
    data: '添加成功'
  })
})
// 删除奖品接口
app.delete('/deletePrize', jsonParser, (req, res) => {
  console.log(req.body)
  res.send({
    data: '删除成功'
  })
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})