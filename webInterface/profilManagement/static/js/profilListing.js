const inhabitantsScreen = document.getElementById("inhabitantsScreen");
const guestsScreen = document.getElementById('guestsScreen');

list_inhabitants(socket, inhabitantsScreen);

socket.emit('get_guests_list', '')
socket.on('post_guests_list', data=>{
	const guestsScreen = document.getElementById('guestsScreen');

	let guestsList = [];

	guestsList = data["data"];

	guestsScreen.innerHTML = ""

	if(guestsList.length <= 3)
	{
		for (const element of guestsList) {
			console.log(element);

			let link = document.createElement('a');
			let profilCard = document.createElement('div');
			let cardPicture = document.createElement('img');
			let cardTitle =  document.createElement('div');                                                                                         

			link.href = '/guest/' + element['id'] + "/"
			link.classList.add("col-lg-4", "container-fluid")

			profilCard.classList.add("card", "profilCard", "rounded");

			cardPicture.classList.add("img-fluid", "rounded-circle");
			cardPicture.src = "/static/pictures/profil.png";
			cardTitle.classList.add("card-title", "text-center");
			cardTitle.style.color = 'blue';
			cardTitle.textContent = element["profil"]["firstName"] +'\n'+ element["profil"]["lastName"];

			profilCard.appendChild(cardPicture);
			profilCard.appendChild(cardTitle);

			link.appendChild(profilCard);
			guestsScreen.appendChild(link);
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

		carousel.id = 'guestCarousel'
		carousel.classList.add("carousel", "slide", "container-fluid");
		carousel.setAttribute('data-interval', "false");

		carouselInner.classList.add("carousel-inner", "container-fluid");

		carouselActiveItem.classList.add("carousel-item", "active", "container-fluid");

		activeRow.classList.add('row')

		carouselControlPrev.classList.add("carousel-control-prev", "container-fluid");
		carouselControlPrev.href = "#guestCarousel";
		carouselControlPrev.role="button";
		carouselControlPrev.setAttribute('data-slide',"prev");

		prevIcon.classList.add('carousel-control-prev-icon', "container-fluid");
		prevIcon.setAttribute('aria-hidden', "true");
		prevIcon.style.color = 'black';

		carouselControlNext.classList.add("carousel-control-next", "container-fluid");
		carouselControlNext.href = "#guestCarousel";
		carouselControlNext.role="button";
		carouselControlNext.setAttribute('data-slide','next');

		nextIcon.classList.add('carousel-control-next-icon', "container-fluid");
		nextIcon.setAttribute('aria-hidden', 'true');
		nextIcon.style.color = 'black';

		carouselControlPrev.appendChild(prevIcon);
		carouselControlNext.appendChild(nextIcon);

		for (const element of guestsList) {
			let link = document.createElement('a')
			let profilCard = document.createElement('div');
			let cardPicture = document.createElement('img');
			let cardTitle =  document.createElement('div');

			link.href = '/inhabitant/' + element['id'] + "/"
			link.classList.add("col-lg-4")

			profilCard.classList.add("card", "profilCard", "rounded");

			cardPicture.classList.add("img-fluid", "rounded-circle");
			cardPicture.src = "/static/pictures/profil.png";
			cardTitle.classList.add("card-title", "text-center");
			cardTitle.style.color = 'blue';
			cardTitle.textContent = element["profil"]["firstName"] +'\n'+ element["profil"]["lastName"];

			profilCard.appendChild(cardPicture);
			profilCard.appendChild(cardTitle);

			link.appendChild(profilCard);

			if(x <= 2)
			{
				activeRow.appendChild(link);
			}
			else
			{
				let result = x % 3

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

		guestsScreen.appendChild(carousel);
	}

})