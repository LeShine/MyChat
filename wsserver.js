"use strict"
// koa封装的websocket这是官网（很简单有时间去看一下https://www.npmjs.com/package/koa-websocket）
// 基于koa-websocket实现的即时通讯
const Koa = require('koa')
const route = require('koa-route')
const websocket = require('koa-websocket')
const app = websocket(new Koa());
var clientMap = new Object(),
    id = 0;
app.ws.use(function (ctx, next) {
    return next(ctx)
})
app.ws.use(route.all('/', function (ctx) {
        //存贮连接
        id += 1;
        ctx.id = id;
        clientMap[id] = ctx;
        console.log(id+"进入群聊");
        //监听消息
        ctx.websocket.on('message', function (message) {
            // //向除建立该链接的其他连接者广播
            // ctx.websocket.emit(message)
            // 发送给client
            // ctx.websocket.send(message)
            console.log(message)
            // 群发
            // for(var i in clientMap){
            //     clientMap[i].websocket.send(ctx.id+"说"+message)
            // }
            sendAll(message,ctx)
        })

        ctx.websocket.on('close', function (message) {
            // global.gc();//内存回收，需特定指令启动
            // console.log(message)
            console.log(ctx.id+"离开了聊天室")
            delete clientMap[ctx.id]
            sendAll("离开了聊天室",ctx)
            
        })

        ctx.websocket.on('error',function(err){
            console.log("出错了"+err)
        })
}))
app.listen(3000)
// 会默认打开127.0.0.1:3000这个端口号

function sendAll(mes,obj){
    for(var i in clientMap){
        clientMap[i].websocket.send(obj.id+":"+mes)
    }
}

