var net = require('net');
var port = 8080;
var host = '127.0.0.1';

var client = new net.Socket();
client.setEncoding('UTF-8');
//client.setEncoding('binary');//二进制格式
//连接到服务端
client.connect(port, host, function () {
    // client.write('你好');
    say();
});

client.on('data', function (data) {
    console.log('服务端传来:' + data);
    say();
});

client.on('error', function (error) {
    console.log('error:' + error);
});

client.on('close', function () {
    console.log('Connection closed');
});
//----------------------------------------------------------
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function say() {
    rl.question('请输入： ', (inputStr) => {
        if (inputStr != 'bye') {
            client.write(inputStr + '\n');
        } else {
            client.destroy();     //关闭连接
            rl.close();
        }
    });
}

