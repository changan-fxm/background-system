
const responseMessage = {
    argsfail: {errcode:10001,'message':"参数有误"},
    delsucc: {errcode:0,'message':"删除成功"},
    delfail: {errcode:10002,'message':"原因未知，请重新尝试"},
    exception: {errcode:10003,'message':"服务器繁忙，请稍后再试"},
    notfound:{errcode:10004,'message':'请求错误'},
    addsuccess:{errcode:0,'message':'添加成功'},
    addfail:{errcode:10005,'message':'添加失败'},
     getsuccess:{errcode:0,'message':'获取成功'},
    getfail:{errcode:10007,'message':'获取失败'},
    updsuccess:{errcode:0,'message':'编辑成功'},
    updfail:{errcode:10008,'message':'编辑失败'}
}

module.exports = responseMessage;