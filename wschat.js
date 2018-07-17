
  // 判断浏览器是否支持websocket
    var CreateWebSocket = (function () {
        return function (urlValue) {
            if (window.WebSocket) return new WebSocket(urlValue);
            if (window.MozWebSocket) return new MozWebSocket(urlValue);
            return false;
        }
    })()
   // 实例化websoscket websocket有两种协议ws(不加密)和wss(加密)
    var webSocket = CreateWebSocket("ws://127.0.0.1:3000");
    webSocket.onopen = function (evt) {
        // 一旦连接成功，就发送第一条数据
        var myname = myform.name.value;//这里的名字应该在点击加入群聊前提示就输入
         webSocket.send("大家好，我是"+myname)
    }
    webSocket.onmessage = function (evt) {
        // 这是服务端返回的数据
        // console.log("服务端说" + evt.data)
        var remes = document.getElementById("chatroom");
        remes.innerHTML += '<br/>'+evt.data;
    }
    // 关闭连接
    webSocket.onclose = function (evt) {
        console.log("Connection closed.")
    }
    // 错误捕捉
    webSocket.oner = function (err) {
        console.log("Error"+err)
    }
