const express = require("express");
const fs = require("fs");
const path = require('path');
const router = express.Router();
const app = express();
const port = 3000;
let bodyParser = require('body-parser')
//json文件所在路径
const RaffileList = "/data/RaffileList.json";
const HistoryList = "/data/HistoryList.json";
global.len = 0;

//设置跨域访问
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", " 3.2.1");
  res.header("Content-Type", "application/json;charset=utf-8");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  next();
});
let jsonParser = bodyParser.json()

// 抽奖结果接口，根据概率计算
app.get('/PrizeResult', (req, res) => {
  // read prize json
  const fs = require('fs');
  let prize_data = fs.readFileSync(__dirname + RaffileList, {
    encoding: 'utf8',
    flag: 'r'
  })
  let prize_json = JSON.parse(prize_data)['resultList']
  // cumulative probability counting
  let total_probability = 0;
  const cumulative_probability = [];
  prize_json.forEach((element) => {
    total_probability += element['probability']
    cumulative_probability.push(total_probability)
  })
  // random number and check prize
  const price = Math.floor(Math.random() * total_probability);
  for (let i = 0; i < cumulative_probability.length; i++) {
    if (price <= cumulative_probability[i]) {
      res.send(prize_json[i])
      // 保存中奖信息
      let prizetime = new Date
      let prizeInfo = {
        username: '您',
        prizename: prize_json[i].name,
        time: prizetime.toLocaleDateString()
      }
      RaffileHistory(prizeInfo)
      return
    }
  }
})

app.get("/RaffleList", (req, res) => {
  const fs = require('fs');
  let RaffleList = JSON.parse(fs.readFileSync(__dirname + RaffileList, {
    encoding: 'utf8',
    flag: 'r'
  }))
  res.send({
    RaffleList
  });
});

// 中奖列表接口
app.get("/HistoryList", (req, res) => {
  const fs = require('fs');
  let historyList = JSON.parse(fs.readFileSync(__dirname + HistoryList, {
    encoding: 'utf8',
    flag: 'r'
  }))
  res.send({
    historyList: historyList
  });
});

// 金币余额读取接口
let UserBanace = 2000
app.get('/getUserBanace', (req, res) => {
  res.send({
    UserBanace: UserBanace
  })
})

// 金币余额更新接口,每次抽奖减10金币
app.post('/setUserBanace', jsonParser, (req, res) => {
  UserBanace -= 40
  console.log('用户余额：' + UserBanace)
  res.send({
    UserBanace: UserBanace
  })
})

// 中奖列表更新函数
function RaffileHistory(prizeInfo) {
  const fs = require('fs');
  let prize_data = fs.readFileSync(__dirname + HistoryList, {
    encoding: 'utf8',
    flag: 'r'
  })
  let historyList_json = JSON.parse(prize_data)
  historyList_json['historyList'].push(prizeInfo)
  console.log(historyList_json['historyList'].length);
  if (historyList_json['historyList'].length>10) {
    historyList_json['historyList'].length=0
  }
  console.log(historyList_json);
  var str = JSON.stringify(historyList_json);
  fs.writeFile(__dirname + HistoryList, str, function (err) {
    if (err) {
      console.error(err);
    }
    console.log('中奖列表更新成功');
  })
}

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
// 编辑中奖率接口
app.post('/updateProbability', jsonParser, (req, res) => {
  console.log(req.body)
  res.send({
    data: '修改成功'
  })
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})