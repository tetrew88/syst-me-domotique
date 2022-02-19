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
		let x = 0

		const carousel = document.createElement('div');
		const carouselInner = document.createElement('div');

		let carouselControlPrev = document.createElement('a');
		let prevIcon = document.createElement('span');

		let carouselControlNext = document.createElement('a');
		let nextIcon = document.createElement('span');

		const carouselActiveItem = document.createElement('div');
		const carouselItemList = [];

		carousel.id = 'roomCarousel'
		carousel.classList.add("carousel", "slide", "row");
		carousel.setAttribute('data-interval', "false");

		carouselInner.classList.add("carousel-inner", "col");

		carouselActiveItem.classList.add("carousel-item", "active", "row");

		carouselControlPrev.classList.add("carousel-control-prev");
		carouselControlPrev.href = "#roomCarousel";
		carouselControlPrev.role="button";
		carouselControlPrev.setAttribute('data-slide',"prev");

		prevIcon.classList.add('carousel-control-prev-icon');
		prevIcon.setAttribute('aria-hidden', "true");

		carouselControlNext.classList.add("carousel-control-next");
		carouselControlNext.href = "#roomCarousel";
		carouselControlNext.role="button";
		carouselControlNext.setAttribute('data-slide','next');

		nextIcon.classList.add('carousel-control-next-icon');
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

			if(x <= 5)
			{
				carouselActiveItem.appendChild(roomCard);
				console.log("!!!!!!!!!!!!!!!!")
			}
			else
			{
				console.log("?????????")
				let result = x % 6

				if(result == 0)
				{
					console.log('gggggggggg')
					let carouselItem = document.createElement('div');
					carouselItem.classList.add("carousel-item", "row");

					carouselItemList.push(carouselItem);
				}

				carouselItemList[carouselItemList.length - 1].appendChild(roomCard);
			}

			x++;
		}

		carouselInner.appendChild(carouselActiveItem);

		if(carouselItemList.length > 0)
		{
			for (const item of carouselItemList) {
				console.log(item);
				carouselInner.appendChild(item);
			}
		}

		carouselControlPrev.appendChild(prevIcon);
		carouselControlNext.appendChild(nextIcon);

		carousel.appendChild(carouselInner);

		carousel.appendChild(carouselControlPrev);
		carousel.appendChild(carouselControlNext);

		contentZone.appendChild(carousel);


	}
})