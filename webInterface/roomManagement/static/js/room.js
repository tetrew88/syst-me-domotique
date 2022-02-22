let roomId = document.getElementById("roomId").value;

socket.emit('get_room', roomId)
socket.on('post_room', data=>{

})