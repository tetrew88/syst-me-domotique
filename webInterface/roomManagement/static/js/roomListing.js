let roomList = []

socket.emit('get_rooms_list', 'rooms')
socket.on('post_rooms_list', data=>{
	roomList = data;
})

//const contentZone = document.getElementByClassName('content');
//const roomCard = document.createElement('div');

for (const element of roomList) {
  console.log(element);
}

//roomCard.classList.add("col-lg-4 card roomCard rounded")
