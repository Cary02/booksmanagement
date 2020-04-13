

const express = require('express');
const path = require('path');
const router = require('./router.js');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// //启动静态资源
// app.use('/www',express.static('public'));
//
// //设置模板引擎路径
// app.set('views',path.join(__dirname,'view'));
// //设置模板引擎
// app.set('view engine','html');
// //使express兼容art-template模板引擎
// app.engine('html',require('express-art-template'));
//允许跨域请求
app.use(cors());
//处理请求参数
//挂载参数中间件(post)
app.use(bodyParser.urlencoded({ extended: false}));
//处理json格式的参数
app.use(bodyParser.json());

//启动服务器功能
//配置路由
app.use(router);
// app.use(user);
//监听端口
app.listen(9000,()=>{
    console.log('running...');
});