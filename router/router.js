const express = require("express");
const model = require('../model/model.js');
// 得到一个路由器
let router = express.Router();
const multer = require('multer');
// 定义上传的目录
let upload = multer({ dest: 'uploads/' })

const catecontroller = require('../controller/catecontroller.js')
const articleController = require('../controller/articleController.js')
const userController = require('../controller/userController.js')

router.get('/',(req,res)=>{
    
   
    res.render('back-stage.html')
})
router.get('/back-stage',(req,res)=>{
    console.log(req.session.userInfo);
    let data = {
        userInfo:req.session.userInfo
    } 
    res.render('back-stage.html')
})
router.get('/cate-list',(req,res)=>{
    res.render('cate-list.html')
})
router.get('/article',(req,res)=>{
    res.render('article.html')
})

router.get('/artindex',(req,res)=>{
    res.render('article.html')
})
// 登录页面
router.get('/login',(req,res)=>{
    if(req.session.userInfo){
        res.render('back-stage.html')
        return;
    }
    res.render('login.html')
})
// 退出登录
router.get('/logout',(req,res)=>{
    req.session.destroy(err=>{
        if(err){
            throw err;
        }
    })
    res.redirect("/login")
})
// 渲染后台分类列表页面
router.get('/catindex',catecontroller.catindex)


// 获取分类数据的接口
router.get('/getCate',catecontroller.getCate)

// 获取单条数据的接口
router.get('/getOneCate',catecontroller.getOneCate)
// 编辑分类的接口
router.post('/update',catecontroller.update)
// 删除接口
router.post('/deleteCat',catecontroller.deleteCat)
// 提交分类
router.post('/addData',catecontroller.addData)
// 渲染添加分类的页面
router.get('/catadd',catecontroller.catadd)
// 渲染编辑分类的页面
router.get('/editdata',catecontroller.editdata)




// 获取文章数据请求
router.get('/getallData',articleController.getAllData)
// 删除文章
router.post('/deleteArticle',articleController.deleteArticle)
// 编辑文章
router.get("/artedit",articleController.artedit)
//添加文章
router.get("/addarticle",articleController.addarticle)
router.post("/postArticle",articleController.postArticle)
// 上传文件
router.post('/upload',upload.single('file'),articleController.upload)
router.post("/upstatus",articleController.upstatus)
// 获取单挑文章
router.get('/getOnearticle',articleController.getOnearticle)
// 编辑文章的数据接口
router.post('/updArticle',articleController.updArticle)

// 登录
router.post('/signUser',userController.signUser)

// 用户退出
router.get('/logout',(req,res)=>{
    // 清空session并重定向到登录页面
    req.session.destroy(err=>{
        if(err){ throw err; }
    })
    res.json({message:'退出成功'})
})
//更新用户头像
router.post('/updateImg',userController.updateImg)
// 统计文章的总数
router.get('/cateCount',async(req,res)=>{
    let sql = `select count(*) total,t2.name,t1.cat_id from article t1 left join category t2
    on t1.cat_id = t2.cat_id group by t1.cat_id`;
    let data = await model(sql);
    res.json(data)
})
// 统计当前文章的总数
router.get('/artCount',async(req,res)=>{
    let sql = `select month(publish_date) month,count(*) total from article
    where year(publish_date) = year(now()) group by month(publish_date)`;
    let result = await model(sql);
    res.json(result)
})
module.exports = router;