const contentZone = document.getElementById('screenContent');


socket.emit('get_rooms_list', 'rooms')
socket.on('post_rooms_list', data=>{

	data = data["data"]

	if(data.lenght <= 6)
	{
		for (const element of data) {
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
	}
	else
	{
		let x = 1

		const carousel = document.createElement('div');
		const carouselInner = document.createElement('div');

		let carouselControlPrev = document.createElement('a');
		let prevIcon = document.createElement('span');

		let carouselControlNext = document.createElement('a');
		let nextIcon = document.createElement('span');

		const carouselActiveItem = document.createElement('div');
		const carouselItemList = [];

		carousel.id = 'carousel'
		carousel.classList.add("carousel", "slide", "row");
		carousel.setAttribute('data-interval', "false");

		carouselInner.classList.add("carousel-inner");

		carouselActiveItem.classList.add("carousel-item", "active");

		carouselControlPrev.classList.add("carousel-control-prev");
		carouselControlPrev.href = "#carousel";
		carouselControlPrev.role="button";
		carouselControlPrev.setAttribute('data-slide',"prev");

		prevIcon.classList.add('carousel-control-prev-icon');
		prevIcon.setAttribute('aria-hidden', "true");

		carouselControlNext.classList.add("carousel-control-next");
		carouselControlNext.href = "#carousel";
		carouselControlNext.role="button";
		carouselControlNext.setAttribute('data-slide','next');

		nextIcon.classList.add('carousel-control-prev-icon');
		nextIcon.setAttribute('aria-hidden', "true");

		for (const element of data) {
			let roomCard = document.createElement('div');
			let cardPicture = document.createElement('img');
			let cardTitle =  document.createElement('div');
			

			roomCard.classList.add("col-lg-4", "card", "roomCard", "rounded");

			cardPicture.classList.add("img-fluid", "rounded");
			cardPicture.src = "/static/pictures/" + element['type'] + ".jpeg";
			cardTitle.classList.add("card-title", "text-center");
			cardTitle.style.color = 'blue';
			cardTitle.textContent = element["name"];

			roomCard.appendChild(cardPicture);
			roomCard.appendChild(cardTitle);

			if(x <= 6)
			{
				carouselActiveItem.appendChild(roomCard);
			}
			else
			{
				let result = x % 6

				if(result == 0)
				{
					let carouselItem = document.createElement('div');
					carouselItem.classList.add("carousel-item");

					carouselItemList.push(carouselItem);
					console.log(carouselItemList[carouselItemList.lenght])
				}

				carouselItemList[carouselItemList.lenght].appendChild(roomCard);
			}

			x++;
		}

		carouselInner.appendChild(carouselActiveItem);
		for (const item of carouselItemList) {
			carouselInner.appendChild(item);
		}

		carouselControlPrev.appendChild(prevIcon);
		carouselControlNext.appendChild(nextIcon);

		carousel.appendChild(carouselInner);

		carousel.appendChild(carouselControlPrev);
		carousel.appendChild(carouselControlNext);


	}
})