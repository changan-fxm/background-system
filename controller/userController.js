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
// 更新用户头像
 userController.updateImg = async (req,res)=>{
        let {avatar} = req.body;
        let user_id = req.session.userInfo.user_id;
        let sql = `update users set avatar = '${avatar}' where user_id = ${user_id}`
        let result = await model(sql)
        if(result.affectedRows){
            // 成功
            res.json({code:0,message:"修改头像成功"})
        }else{
            res.json({code:1,message:"修改头像失败"})
        }
    }
module.exports = userController ;