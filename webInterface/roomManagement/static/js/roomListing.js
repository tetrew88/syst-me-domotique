const screen = document.getElementById('screen');


socket.emit('get_rooms_list', 'rooms')
socket.on('post_rooms_list', data=>{

	data = data["data"]

	if(data.length <= 6)
	{
		for (const element of data) {
			console.log(element);

			let link = document.createElement('a');
			let roomCard = document.createElement('div');
			let cardPicture = document.createElement('img');
			let cardTitle =  document.createElement('div');                                                                                         

			link.href = '/room/' + element['id'] + "/"
			link.classList.add("col-lg-4", "container-fluid")

			roomCard.classList.add("card", "roomCard", "rounded");

			cardPicture.classList.add("img-fluid", "rounded");
			cardPicture.src = "/static/pictures/" + element['type'] + ".jpeg";//element[2];

			cardTitle.classList.add("card-title", "text-center");
			cardTitle.style.color = 'blue';
			cardTitle.textContent = element["name"]

			roomCard.appendChild(cardPicture);
			roomCard.appendChild(cardTitle);

			link.appendChild(roomCard);

			screen.appendChild(link);
		}
	}
	else
	{
		let x = 0

		const carousel = document.createElement('div');
		const carouselInner = document.createElement('div');

		const carouselActiveItem = document.createElement('div');
		let activeRow = document.createElement('div');
		const carouselItemList = [];

		let carouselControlPrev = document.createElement('a');
		let prevIcon = document.createElement('span');

		let carouselControlNext = document.createElement('a');
		let nextIcon = document.createElement('span');

		carousel.id = 'roomCarousel'
		carousel.classList.add("carousel", "slide", "container-fluid");
		carousel.setAttribute('data-interval', "false");

		carouselInner.classList.add("carousel-inner", "container-fluid");

		carouselActiveItem.classList.add("carousel-item", "active", "container-fluid");

		activeRow.classList.add('row')

		carouselControlPrev.classList.add("carousel-control-prev", "container-fluid");
		carouselControlPrev.href = "#roomCarousel";
		carouselControlPrev.role="button";
		carouselControlPrev.setAttribute('data-slide',"prev");

		prevIcon.classList.add('carousel-control-prev-icon', "container-fluid");
		prevIcon.setAttribute('aria-hidden', "true");

		carouselControlNext.classList.add("carousel-control-next", "container-fluid");
		carouselControlNext.href = "#roomCarousel";
		carouselControlNext.role="button";
		carouselControlNext.setAttribute('data-slide','next');

		nextIcon.classList.add('carousel-control-next-icon', "container-fluid");
		nextIcon.setAttribute('aria-hidden', 'true');

		carouselControlPrev.appendChild(prevIcon);
		carouselControlNext.appendChild(nextIcon);

		for (const element of data) {
			let link = document.createElement('a')
			let roomCard = document.createElement('div');
			let cardPicture = document.createElement('img');
			let cardTitle =  document.createElement('div');

			link.href = '/room/' + element['id'] + "/"
			link.classList.add("col-lg-4")

			roomCard.classList.add("card", "roomCard", "rounded", "container-fluid");

			cardPicture.classList.add("img-fluid", "rounded");
			cardPicture.src = "/static/pictures/" + element['type'] + ".jpeg";
			cardTitle.classList.add("card-title", "text-center");
			cardTitle.style.color = 'blue';
			cardTitle.textContent = element["name"];

			roomCard.appendChild(cardPicture);
			roomCard.appendChild(cardTitle);

			link.appendChild(roomCard);

			if(x <= 5)
			{
				activeRow.appendChild(link);
			}
			else
			{
				let result = x % 6

				if(result == 0)
				{
					let carouselItem = document.createElement('div');
					let passiveRow = document.createElement('div');

					passiveRow.classList.add('row');

					carouselItemList.push(row);
				}

				carouselItemList[carouselItemList.length - 1].appendChild(link);
			}

			x++;
		}

		carouselActiveItem.appendChild(activeRow);

		carouselInner.appendChild(carouselActiveItem);

		let y = 0

		if(carouselItemList.length > 0)
		{
			for (const item of carouselItemList)
			{
				let carouselItem = document.createElement('div');
				carouselItem.classList.add("carousel-item", "container-fluid");

				carouselItem.appendChild(item);
				carouselInner.appendChild(carouselItem);
			}
		}

		carousel.appendChild(carouselInner);

		carousel.appendChild(carouselControlPrev);
		carousel.appendChild(carouselControlNext);

		screen.appendChild(carousel);
	}
})