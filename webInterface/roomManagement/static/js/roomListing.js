socket.emit('get_rooms_list', 'rooms')

socket.on('post_rooms_list', data=>{

	data = JSON.parse(data)
	console.log(data)

	console.log('test')
})