let articleController = {};

const model = require('../model/model.js')
const {delsucc,delfail,exception,argsfail,addsuccess,addfail,getsuccess,getfail, updsuccess, updfail} = require('../util/responseMessage.js');

// 导入模拟数据
let articleData = require('../mockData/articleData.json')
articleController.getAllData = async(req,res)=>{
    // 1.接收page、limit参数 pagesize别名
    let {page,limit:pagesize} = req.query;
    // 查询sql语句
    let offset = (page -1)*pagesize;
    let sql = `select * from article order by art_id desc limit ${offset},${pagesize};`
    let sql2= `select count(*) as count from article;`
    let promise1 = model(sql);
    let promise2 = model(sql2)
   let result = await Promise.all([promise1,promise2]) //返回的是数组 [{},{}]
    let data = result[0];
    let count = result[1][0].count;
    // 返回数据
    let response= {
        code:0,
        count:10000,
        data:data,
        msg:''
    }

    res.json(response)
}
// 删除
articleController.deleteArticle = async(req,res)=>{
    let {art_id} = req.body;
    let sql = `delete from article where art_id = ${art_id};`
    let result = await model(sql);
    if(result.affectedRows){
        res.json(delsucc)
    }else{
        res.json(delfail)
    }

}
// 编辑页面
articleController.artedit = (req,res)=>{
    res.render('article-edit.html')
}
// 添加
articleController.addarticle = (req,res)=>{
    res.render('article-add.html')
}
//提交数据入库
articleController.postArticle = async(req,res)=>{
    let {title,cat_id,status,content} = req.body;
    let sql = `insert into article(title,content,cat_id,status) 
    values('${title}','${status}','${cat_id}','${content}')`;
    let result = await model (sql)
    if(result.affectedRows){
        res.json(addsuccess)
    }else{
        res.json(addfail)
    }
  
}
module.exports = articleController ;