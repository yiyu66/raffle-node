const express = require('express')
const app = express()
const port = 3000


//设置跨域访问
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

// 抽奖结果接口
// todo 添加保存中奖信息
app.get('/PrizeResult', (req, res) => {
    // read prize json
    const fs = require('fs');
    let prize_data = fs.readFileSync('PrizeList.json', {encoding: 'utf8', flag: 'r'})
    let prize_json = JSON.parse(prize_data)
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
app.get('/PrizeList', (req, res) => {
    res.send({
        resultList: [
            {
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
        resultList: [
            {
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

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})