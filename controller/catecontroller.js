let catecontroller = {};


const model = require('../model/model.js');
// 导入返回结果的信息
const {delsucc,delfail,exception,argsfail,addsuccess,addfail,getsuccess,getfail, updsuccess, updfail} = require('../util/responseMessage.js');

// 渲染后台分类列表页面
catecontroller.catindex = (req,res)=>{
    res.render('cate-list.html')
}
// 添加分类数据的接口
catecontroller.catadd = (req,res)=>{
    res.render('cateadd.html')
}
// 编辑分类数据的接口
catecontroller.editdata = (req,res)=>{
    res.render('cate-edit.html')
}
// 编辑入库

catecontroller.update = async (req,res)=>{
    let {cat_id,name,sort,add_date} = req.body; 
    if(!cat_id){
        res.json(argsfail)
        return;
    }
    let sql = `update category set name='${name}',sort=${sort},add_date='${add_date}' 
    where cat_id = ${cat_id}`;
    let result = await model(sql)
    if(result.affextedRows){
        res.json({updsuccess})
    }else{
        res.json({updfail})
    }
 

}
    

// 添加分类接口
catecontroller.addData = async(req,res)=>{
    let {name,sort,add_date} = req.body;
    let sql = `insert into category(name,sort,add_date) values('${name}',${sort},'${add_date}')`
    let result = await model(sql);
    if(result.affextedRows){
        res.json(addsuccess)
    }else{
        res.json(addfail)
    }
}

// 获取分类数据的接口
catecontroller.getCate = async (req,res)=>{
    let sql = "select * from category order by sort"
    let data = await model(sql);
    res.json(data)

}
// 获取单条分类数据的接口
catecontroller.getOneCate = async (req,res)=>{
    // 1.接收参数
    let {cat_id} = req.query;
    if(!cat_id){
        res.json(argsfail)
    }else{
        // 2.查询数据库
        let sql = `select * from category where cat_id = ${cat_id}`;
        
        let data = await model(sql);
        // 3.返回数据
        if(data.length){
             data[0].errcode = 0;
             res.json(data[0])
        }else{
            res.json(getfail)
        }
    }
 
 

}

// 删除接口
catecontroller.deleteCat = async(req,res)=>{
    let{cat_id} = req.body;

    if(!cat_id){
        res.json(argsfail)
    }else{
        cat_id = parseInt(cat_id);
        let sql = `delete from category where cat_id = ${cat_id}`
        let result;
        let response;
       try{
        //    成功
        result = await model(sql);
        if(result.affectedRows){
            response = delsucc;
        }else{
            // 失败
            response = delfail;
        }
       }catch(e){
           response = exception;
       }
       res.json(response)
    }
}
module.exports = catecontroller;
