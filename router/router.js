const express = require("express");
// 得到一个路由器
let router = express.Router();

const catecontroller = require('../controller/catecontroller.js')

router.get('/',(req,res)=>{
    res.render('back-stage.html')
})
router.get('/back-stage',(req,res)=>{
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

module.exports = router;