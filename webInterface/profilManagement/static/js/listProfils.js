let maxProfil = 0

if (window.matchMedia("(min-width: 1000px)").matches) {
	maxProfil = 3
}
else
{
	if (window.matchMedia("(min-width: 800px)").matches)
	{
		maxProfil = 2
	}
	else
	{
		maxProfil = 1
	}
}


function list_inhabitants(socket, screen)
{
	socket.emit('get_inhabitants_list', '')
	socket.on('post_inhabitants_list', data=>{

		let inhabitantList = [];

		inhabitantList = data["data"];

		screen.innerHTML = "";

		if(inhabitantList.length <= maxProfil)
		{
			for (const element of inhabitantList) {
				console.log(element);

				let link = document.createElement('a');
				let profilCard = document.createElement('div');
				let cardPicture = document.createElement('img');
				let cardTitle =  document.createElement('div');                                                                                         

				link.href = '/inhabitant/' + element['id'] + "/"
				link.classList.add("col-lg-4", "col-md-6","col-sm-12", "container-fluid")

				profilCard.classList.add("card", "profilCard", "rounded");

				cardPicture.classList.add("img-fluid", "rounded-circle");
				cardPicture.src = "/static/pictures/profil.png";
				cardTitle.classList.add("card-title", "text-center");
				cardTitle.style.color = 'blue';
				cardTitle.textContent = element["profil"]["firstName"] +'\n'+ element["profil"]["lastName"];

				profilCard.appendChild(cardPicture);
				profilCard.appendChild(cardTitle);

				link.appendChild(profilCard);
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

			carousel.id = 'inhabitantCarousel'
			carousel.classList.add("carousel", "slide");
			carousel.setAttribute('data-interval', "false");

			carouselInner.classList.add("carousel-inner");

			carouselActiveItem.classList.add("carousel-item", "active");

			activeRow.classList.add('row')

			carouselControlPrev.classList.add("carousel-control-prev");
			carouselControlPrev.href = "#inhabitantCarousel";
			carouselControlPrev.role="button";
			carouselControlPrev.setAttribute('data-slide',"prev");

			prevIcon.classList.add('carousel-control-prev-icon');
			prevIcon.setAttribute('aria-hidden', "true");
			prevIcon.style.color = 'black';

			carouselControlNext.classList.add("carousel-control-next");
			carouselControlNext.href = "#inhabitantCarousel";
			carouselControlNext.role="button";
			carouselControlNext.setAttribute('data-slide','next');

			nextIcon.classList.add('carousel-control-next-icon');
			nextIcon.setAttribute('aria-hidden', 'true');
			nextIcon.style.color = 'black';

			carouselControlPrev.appendChild(prevIcon);
			carouselControlNext.appendChild(nextIcon);

			for (const element of inhabitantList) {
				let link = document.createElement('a')
				let profilCard = document.createElement('div');
				let cardPicture = document.createElement('img');
				let cardTitle =  document.createElement('div');

				link.href = '/inhabitant/' + element['id'] + "/"
				link.classList.add("col-lg-4", "col-md-6","col-sm-12", "container-fluid")

				profilCard.classList.add("card", "profilCard", "rounded");

				cardPicture.classList.add("img-fluid", "rounded-circle");
				cardPicture.src = "/static/pictures/profil.png";
				cardTitle.classList.add("card-title", "text-center");
				cardTitle.style.color = 'blue';
				cardTitle.textContent = element["profil"]["firstName"] +'\n'+ element["profil"]["lastName"];

				profilCard.appendChild(cardPicture);
				profilCard.appendChild(cardTitle);

				link.appendChild(profilCard);

				if(x <= maxProfil - 1)
				{
					activeRow.appendChild(link);
				}
				else
				{
					let result = x % maxProfil

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
					carouselItem.classList.add("carousel-item");

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
}


function list_guests(socket, screen)
{
	socket.emit('get_guests_list', '')
	socket.on('post_guests_list', data=>{

		let guestsList = [];

		guestsList = data["data"];

		screen.innerHTML = ""

		if(guestsList.length <= maxProfil)
		{
			for (const element of guestsList) {
				console.log(element);

				let link = document.createElement('a');
				let profilCard = document.createElement('div');
				let cardPicture = document.createElement('img');
				let cardTitle =  document.createElement('div');                                                                                         

				link.href = '/guest/' + element['id'] + "/"
				link.classList.add("col-lg-4", "col-md-6","col-sm-12", "container-fluid")

				profilCard.classList.add("card", "profilCard", "rounded");

				cardPicture.classList.add("img-fluid", "rounded-circle");
				cardPicture.src = "/static/pictures/profil.png";
				cardTitle.classList.add("card-title", "text-center");
				cardTitle.style.color = 'blue';
				cardTitle.textContent = element["profil"]["firstName"] +'\n'+ element["profil"]["lastName"];

				profilCard.appendChild(cardPicture);
				profilCard.appendChild(cardTitle);

				link.appendChild(profilCard);
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

			carousel.id = 'guestCarousel'
			carousel.classList.add("carousel", "slide");
			carousel.setAttribute('data-interval', "false");

			carouselInner.classList.add("carousel-inner");

			carouselActiveItem.classList.add("carousel-item", "active");

			activeRow.classList.add('row')

			carouselControlPrev.classList.add("carousel-control-prev");
			carouselControlPrev.href = "#guestCarousel";
			carouselControlPrev.role="button";
			carouselControlPrev.setAttribute('data-slide',"prev");

			prevIcon.classList.add('carousel-control-prev-icon');
			prevIcon.setAttribute('aria-hidden', "true");
			prevIcon.style.color = 'black';

			carouselControlNext.classList.add("carousel-control-next");
			carouselControlNext.href = "#guestCarousel";
			carouselControlNext.role="button";
			carouselControlNext.setAttribute('data-slide','next');

			nextIcon.classList.add('carousel-control-next-icon');
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
				link.classList.add("col-lg-4", "col-md-6","col-sm-12", "container-fluid")

				profilCard.classList.add("card", "profilCard", "rounded");

				cardPicture.classList.add("img-fluid", "rounded-circle");
				cardPicture.src = "/static/pictures/profil.png";
				cardTitle.classList.add("card-title", "text-center");
				cardTitle.style.color = 'blue';
				cardTitle.textContent = element["profil"]["firstName"] +'\n'+ element["profil"]["lastName"];

				profilCard.appendChild(cardPicture);
				profilCard.appendChild(cardTitle);

				link.appendChild(profilCard);

				if(x <= maxProfil - 1)
				{
					activeRow.appendChild(link);
				}
				else
				{
					let result = x % maxProfil

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
					carouselItem.classList.add("carousel-item");

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
}