let articleController = {};

const model = require('../model/model.js')

// 导入模拟数据
let articleData = require('../mockData/articleData.json')
articleController.getAllData = async(req,res)=>{
    // 1.接收page、limit参数 pagesize别名
    let {page,limit:pagesize} = req.query;
    // 查询sql语句
    let offset = (page -1)*pagesize;
    let sql = `select * from article limit ${offset},${pagesize};`
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
module.exports = articleController ;