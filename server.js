const express = require('express')
const app = express()
const port = 3000


//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
 });
 

app.get('/', (req, res) => {
    var priceNum = Math.floor(Math.random()*8)
    
    res.send({Num:priceNum})
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})