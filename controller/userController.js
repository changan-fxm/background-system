let userController = {};
const model = require('../model/model.js')
let md5 = require('md5');
let {secret:passSecret} = require('../config/addpassword.json')

userController.signUser = async(req,res)=>{
    
        let {username,password} = req.body;
         password = md5(`${password}${passSecret}`)
        let sql = `select * from users where username='${username}' and password = '${password}'`
        let data = await model(sql);
         if(data.length){
        let userInfo = data[0];
        req.session.userInfo = userInfo; 
         // 2.更新此次的登录时间
         let sql = `update users set last_login_date=now() where user_id  = ${userInfo.user_id}`;
         await model(sql)
             res.json({errcode:0,message:'登陆成功',userInfo})
         }else{
            res.json({errcode:10008,message:'用户名或密码错误'})
         }
    }
module.exports = userController ;