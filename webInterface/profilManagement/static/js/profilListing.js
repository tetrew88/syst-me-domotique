socket.emit('get_inhabitants_list', '')
socket.on('post_inhabitants_list', data=>{

	data = data["data"];

	console.log(data)
})

socket.emit('get_guests_list', '')
socket.on('post_guests_list', data=>{

	data = data["data"];

	console.log(data);
})