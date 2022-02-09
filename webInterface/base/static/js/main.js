console.log('hello world')


const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:5000",
    methods: ["GET", "POST"]
  }
});