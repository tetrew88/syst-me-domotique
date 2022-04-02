let maxModule = 0

if (window.matchMedia("(min-width: 1000px)").matches) {
	maxModule = 3
}
else
{
	if (window.matchMedia("(min-width: 800px)").matches)
	{
		maxModule = 2
	}
	else
	{
		maxModule = 1
	}
}


function list_room_content(socket, screen, roomId)
{
	socket.emit('get_room_content', roomId)
	socket.on('post_room_content', data=>{
		if(data["roomId"] == roomId)
		{
			screen.innerHTML = "";

			data = data["data"];

			if(data.length <= maxModule)
			{

				for (const element of data)
				{
					let link = document.createElement('a');
					let cardPicture = document.createElement('img');
					let cardTitle =  document.createElement('div');

					link.href = '/module/' + element['id'] + "/";
					link.classList.add("col-lg-4", "col-md-6","col-sm-12", "card", "moduleCard", "rounded", "container-fluid");

					cardPicture.classList.add("img-fluid", "rounded", "container-fluid");
					if(element['type'] == 'rgb bulb')
					{
						cardPicture.src = "/static/pictures/" + 'bulb' + ".jpeg";
					}
					else
					{
						cardPicture.src = "/static/pictures/" + element['type'] + ".jpeg";
					}

					cardTitle.classList.add("card-title", "text-center");
					cardTitle.textContent = element["name"];

					link.appendChild(cardPicture);
					link.appendChild(cardTitle);

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

				carousel.id = 'moduleCarousel'
				carousel.classList.add("carousel", "slide", "container-fluid");
				carousel.setAttribute('data-interval', "false");

				carouselInner.classList.add("carousel-inner", "container-fluid");

				carouselActiveItem.classList.add("carousel-item", "active");

				activeRow.classList.add('row')

				carouselControlPrev.classList.add("carousel-control-prev", "container-fluid");
				carouselControlPrev.href = "#moduleCarousel";
				carouselControlPrev.role="button";
				carouselControlPrev.setAttribute('data-slide',"prev");

				prevIcon.classList.add('carousel-control-prev-icon', "container-fluid");
				prevIcon.setAttribute('aria-hidden', "true");

				carouselControlNext.classList.add("carousel-control-next", "container-fluid");
				carouselControlNext.href = "#moduleCarousel";
				carouselControlNext.role="button";
				carouselControlNext.setAttribute('data-slide','next');

				nextIcon.classList.add('carousel-control-next-icon', "container-fluid");
				nextIcon.setAttribute('aria-hidden', 'true');

				carouselControlPrev.appendChild(prevIcon);
				carouselControlNext.appendChild(nextIcon);

				for (const element of data) {
					let link = document.createElement('a');
					let cardPicture = document.createElement('img');
					let cardTitle =  document.createElement('div');

					link.href = '/module/' + element['id'] + "/"
					link.classList.add("col-lg-4", "col-md-6","col-sm-12", "card", "moduleCard", "rounded", "container-fluid")

					cardPicture.classList.add("img-fluid", "rounded", "container-fluid");
					cardPicture.src = "/static/pictures/" + element['type'] + ".jpeg";
					cardTitle.classList.add("card-title", "text-center");
					cardTitle.style.color = 'blue';
					cardTitle.textContent = element["name"];

					link.appendChild(cardPicture);
					link.appendChild(cardTitle);

					if(x <= maxModule - 1)
					{
						activeRow.appendChild(link);
					}
					else
					{
						let result = x % maxModule

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
		}
	})
}