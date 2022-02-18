let roomList = [];

socket.emit('get_rooms_list', 'rooms')
socket.on('post_rooms_list', data=>{
	for (const element of data['data']) {
		console.log(element);
	}
})

console.log(roomList)
//const contentZone = document.getElementByClassName('content');
//const roomCard = document.createElement('div');

//roomCard.classList.add("col-lg-4 card roomCard rounded")
