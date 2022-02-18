const contentZone = document.getElementById('screenContent');


socket.emit('get_rooms_list', 'rooms')
socket.on('post_rooms_list', data=>{

	for (const element of data['data']) {
		console.log(element);

		let roomCard = document.createElement('div');
		let cardPicture = document.createElement('img');
		let cardTitle =  document.createElement('div');

		let roomCardClasses = ["col-lg-4", "card", "roomCard", "rounded"]
		let cardPictureClasses = ["img-fluid", "rounded"]
		let cardTitleClasses = ["card-title", "text-center"]


		roomCard.classList.add(roomCardClasses);

		cardPicture.classList.add(cardPictureClasses);
		cardPicture.src = "/static/pictures/" + "kitchen.jpeg";//element[2];

		cardTitle.classList.add();
		cardTitle.style.color = 'blue';
		cardTitle.textContent = element[1]

		roomCard.appendChild(cardPicture);
		roomCard.appendChild(cardTitle);

		contentZone.appendChild(roomCard);
	}
})
