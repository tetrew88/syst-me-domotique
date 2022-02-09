console.log('hello world')


const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://127.0.0.1:5000",
    methods: ["GET", "POST"]
  }
});