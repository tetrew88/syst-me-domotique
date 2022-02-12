console.log('hello world')

var socket = io.connect("http://127.0.0.1:5000/test", { transports: ['websocket', 'polling', 'flashsocket'] })

socket.emit('test', 'test')