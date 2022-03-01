const inhabitantsScreen = document.getElementById("inhabitantScreens");
const guestsScreen = document.getElementById('guestsScreen');

socket.emit('get_inhabitants_list', '')
socket.on('post_inhabitants_list', data=>{
	let inhabitantList = [];

	inhabitantList = data["data"];

	if(inhabitantList.length <= 3)
	{
		for (const element of inhabitantList) {
			console.log(element);

			let link = document.createElement('a');
			let profilCard = document.createElement('div');
			let cardPicture = document.createElement('img');
			let cardTitle =  document.createElement('div');                                                                                         

			link.href = '/inhabitant/' + element['id'] + "/"
			link.classList.add("col-lg-4", "container-fluid")

			profilCard.classList.add("card", "profilCard", "rounded");

			cardPicture.classList.add("img-fluid", "rounded");
			cardPicture.src = "/static/pictures/profil.png";
			cardTitle.classList.add("card-title", "text-center");
			cardTitle.style.color = 'blue';
			cardTitle.textContent = element["firstName"] +'\n'+ element["lastName"];

			profilCard.appendChild(cardPicture);
			profilCard.appendChild(cardTitle);

			link.appendChild(profilCard);
			inhabitantsScreen.appendChild(link);
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

		carousel.id = 'inhabitantCarousel'
		carousel.classList.add("carousel", "slide", "container-fluid");
		carousel.setAttribute('data-interval', "false");

		carouselInner.classList.add("carousel-inner", "container-fluid");

		carouselActiveItem.classList.add("carousel-item", "active", "container-fluid");

		activeRow.classList.add('row')

		carouselControlPrev.classList.add("carousel-control-prev", "container-fluid");
		carouselControlPrev.href = "#inhabitantCarousel";
		carouselControlPrev.role="button";
		carouselControlPrev.setAttribute('data-slide',"prev");

		prevIcon.classList.add('carousel-control-prev-icon', "container-fluid");
		prevIcon.setAttribute('aria-hidden', "true");

		carouselControlNext.classList.add("carousel-control-next", "container-fluid");
		carouselControlNext.href = "#inhabitantCarousel";
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

			link.href = '/inhabitant/' + element['id'] + "/"
			link.classList.add("col-lg-4")

			roomCard.classList.add("card", "roomCard", "rounded", "container-fluid");

			cardPicture.classList.add("img-fluid", "rounded");
			cardPicture.src = "/static/pictures/profil.png";
			cardTitle.classList.add("card-title", "text-center");
			cardTitle.style.color = 'blue';
			cardTitle.textContent = element["firstName"] +'\n'+ element["lastName"];

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

					carouselItemList.push(passiveRow);
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

		inhabitantsScreen.appendChild(carousel);
	}
})



socket.emit('get_guests_list', '')
socket.on('post_guests_list', data=>{

	data = data["data"];

	console.log(data);
})