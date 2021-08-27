const express = require("express");
const fs = require("fs");
const path = require('path');
const router = express.Router();
const app = express();
const port = 3000;
//json文件所在路径
const RaffileList = "/data/RaffileList.json";
global.len = 0;

//设置跨域访问
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", " 3.2.1");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

//初始化
app.get("/RaffileList", (req, res) => {
  //  读取文件并把新的内容传入json文件
  fs.readFile((__dirname + RaffileList), 'utf8', function (err, data) {
    //  如果有错，抛出错误，防止格式错误
    if (err) {
      return res.send(err)
    }
    try {
      data = JSON.parse(data)
      global.len = data.resultList.length
      return res.status(200).send({data})
    } catch (error) {
      return res.status(200).send(error)
    }
  })
});

// todo 添加保存中奖信息
app.get('/PrizeResult', (req, res) => {
    // read prize json
    const fs = require('fs');
    let prize_data = fs.readFileSync(__dirname + RaffileList, {encoding: 'utf8', flag: 'r'})
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
            return
        }
    }
})

// 奖品列表接口
app.get("/PrizeList", (req, res) => {
  res.send({
    resultList: [],
  });
});

// todo 创建
router.post('/create', function (req, res) {
  //  设置id等数据
  let newS = {
    name: "奖品0",
    order: 1,
    probability: 12.5,
    prizeimage: "待添加"
  };

  //  读取文件并把新的内容传入json文件
  fs.readFile((__dirname + RaffileList), 'utf8', function (err, data) {
    //如果有错，抛出错误，防止格式错误
    if (err) throw err

    try {
      data = JSON.parse(data)
    } catch (error) {
      return res.status(200).send(error)
    }

    data.push(newS)
    //  把新数据传入json文件
    fs.writeFile(path.join(__dirname + RaffileList), JSON.stringify(data, null, 4), function (err) {
      if (err) throw err
      res.status(200).send(data)
    })
  })
})

// 当前选中的8个奖品列表接口
app.get("/RaffleList", (req, res) => {
  res.send({});
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
