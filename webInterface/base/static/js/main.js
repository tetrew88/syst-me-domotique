console.log('hello world')


var socket = io("http://127.0.0.1:5000", { transports: ['websocket', 'polling', 'flashsocket'] })