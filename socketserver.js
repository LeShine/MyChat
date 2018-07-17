var net = require('net');
var chatServer = net.createServer(),
    clientMap = new Object();

var ii = 0;
chatServer.on('connection', function (client) {
    //存储连接者
    client.name = ++ii;
    clientMap[client.name] = client;
    //监听client消息
    client.on('data', function (data) {
        console.log('客户端传来:' + data);
        //client.write('你发来:'+data);//回复client
        //群发
        sendAll(data, client);
    });
    //监听错误信息
    client.on('error', function (exception) {
        console.log('client error:' + exception);
        client.end();
    });
    //客户端关闭事件
    client.on('close', function (data) {
        delete clientMap[client.name];
        console.log(client.name + '下线了');
        sendAll(client.name + '下线了', client);

    });

}).listen(8080);

console.log("服务已开启");

function sendAll(message, client) {
    for (var i in clientMap) {
        clientMap[i].write(client.name + ':' + message + '\n');
    }
}  