socket.emit('get_inhabitants_list', '')
socket.on('post_inhabitants_list', data=>{

	data = data["data"];

	console.log(data)
})