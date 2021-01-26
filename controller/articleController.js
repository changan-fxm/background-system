const fs = require('fs')
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
    //联表查询
    let sql = `select t1.*,t2.name from article t1 left join category t2 on t1.cat_id=t2.cat_id order by art_id desc limit ${offset},${pagesize};`
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
    let {title,cat_id,status,content,cover} = req.body;
    let sql = `insert into article(title,content,cat_id,status,cover,publish_date)
                values('${title}','${content}',${cat_id},${status},'${cover}',now())
                `;
    let result = await model (sql)
    if(result.affectedRows){
        res.json(addsuccess)
    }else{
        res.json(addfail)
    }
  
}
//图片上传
articleController.upload = (req,res)=>{
    console.log(req.file); //接收文件上传成功后的信息
    if(req.file){
        // 进行文件的重命名即可 fs.rename
        let {originalname,destination,filename} = req.file;
        let dotIndex = originalname.lastIndexOf('.');
        let ext = originalname.substring(dotIndex);
        let oldPath = `${destination}${filename}`;
        let newPath = `${destination}${filename}${ext}`;
        fs.rename(oldPath,newPath,err=>{
            if(err){ throw err; }
            res.json({message:'上传成功',code: 0,src:newPath})
        })
    }else{
        res.json({message:'上传失败',code: 1,src:''})
    }
}
// 修改文章状态
articleController.upstatus =async (req,res)=>{
    let {art_id,status} = req.body;
    let sql = `update article set status = ${status} where art_id = ${art_id}`
    let result = await model(sql);
    if(result.affectedRows){
        res.json(updsuccess)
    }else{
        res.json( updfail)
    }
    
}
// 获取文章单条数据
articleController.getOnearticle = async(req,res)=>{
    let {art_id} = req.query;
    let sql = `select * from article where art_id = ${art_id};`
    let data = await model(sql);
    // 有则返回data,无就返回一个空对象
    res.json(data[0] || {})

}
// 编辑文章数据入库
articleController.updArticle = async(req,res)=>{
    // 还未实现删除原图功能
    // 接收数据
    let {cover,title,cat_id,art_id,content,status} = req.body;
    // 执行sql
    let sql = `update article set cover = '${cover}',cat_id = '${cat_id}',
     title = '${title}',content = '${content}',status = '${status}' where art_id = ${art_id}`
     let result = await model(sql);
     if(result.affectedRows){
         res.json(updsuccess)
     }else{
         res.json( updfail)
     }
}
module.exports = articleController ;