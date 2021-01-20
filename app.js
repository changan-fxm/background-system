const express = require('express');
const app = express();
const path = require('path');

const router = require('./router/router.js')

const artTemplate = require('art-template'); 
const express_template = require('express-art-template');
// 托管静态资源
app.use('/public',express.static(path.join(__dirname,'public')))

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


//配置模板的路径
app.set('views', __dirname + '/views/');

//设置express_template模板引擎的静态文件扩展名为.html
app.engine('html', express_template); 

//使用模板引擎扩展名为html
app.set('view engine', 'html');






app.use(router)
app.listen(5000,()=>{
    console.log('server is running at port 5000');
    
})