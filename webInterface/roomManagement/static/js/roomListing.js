const contentZone = document.getElementById('screenContent');


socket.emit('get_rooms_list', 'rooms')
socket.on('post_rooms_list', data=>{

	for (const element of data['data']) {
		console.log(element);

		let roomCard = document.createElement('div');
		let cardPicture = document.createElement('img');
		let cardTitle =  document.createElement('div');


		roomCard.classList.add("col-lg-4", "card", "roomCard", "rounded");

		cardPicture.classList.add("img-fluid", "rounded");
		cardPicture.src = "/static/pictures/" + element['type'] + ".jpeg";//element[2];

		cardTitle.classList.add("card-title", "text-center");
		cardTitle.style.color = 'blue';
		cardTitle.textContent = element["name"]

		roomCard.appendChild(cardPicture);
		roomCard.appendChild(cardTitle);

		contentZone.appendChild(roomCard);
	}
})


console.log('hello')