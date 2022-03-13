let maxEvent = 0

if (window.matchMedia("(min-width: 1000px)").matches) 
{
	maxEvent = 3
}
else
{
	if (window.matchMedia("(min-width: 800px)").matches)
	{
		maxEvent = 2
	}
	else
	{
		maxEvent = 1
	}
}

function list_events(socket, screen)
{
	

	socket.emit('get_events_list', 'rooms')
	socket.on('post_events_list', data=>{

		data = data["data"]

		screen.innerHTML = "";

		if(data.length <= maxEvent)
		{
			for (const element of data)
			{
				let eventNotif = document.createElement('div');
				

				eventNotif.classList.add("row", "eventRapport");

				eventNotif.textContent = element['str'];
				

				screen.appendChild(eventNotif);
			}
		}
		else
		{
			let x = 0

			const eventCarousel = document.createElement('div');
			const eventCarouselInner = document.createElement('div');

			const eventCarouselActiveItem = document.createElement('div');
			let activeCol = document.createElement('div');
			const eventCarouselItemList = [];

			let eventCarouselControlPrev = document.createElement('a');
			let eventPrevIcon = document.createElement('span');

			let eventCarouselControlNext = document.createElement('a');
			let eventNextIcon = document.createElement('span');

			eventCarousel.id = 'eventCarousel'
			eventCarousel.classList.add("carousel", "slide", "container-fluid");
			eventCarousel.setAttribute('data-interval', "false");

			eventCarouselInner.classList.add("carousel-inner");

			eventCarouselActiveItem.classList.add("carousel-item", "active");

			activeCol.classList.add('col')

			eventCarouselControlPrev.classList.add("carousel-control-prev", "container-fluid");
			eventCarouselControlPrev.href = "#eventCarousel";
			eventCarouselControlPrev.role="button";
			eventCarouselControlPrev.setAttribute('data-slide',"prev");

			eventPrevIcon.classList.add('carousel-control-prev-icon', "container-fluid");
			eventPrevIcon.setAttribute('aria-hidden', "true");

			eventCarouselControlNext.classList.add("carousel-control-next", "container-fluid");
			eventCarouselControlNext.href = "#eventCarousel";
			eventCarouselControlNext.role="button";
			eventCarouselControlNext.setAttribute('data-slide','next');

			eventNextIcon.classList.add('carousel-control-next-icon', "container-fluid");
			eventNextIcon.setAttribute('aria-hidden', 'true');

			eventCarouselControlPrev.appendChild(eventPrevIcon);
			eventCarouselControlNext.appendChild(eventNextIcon);

			for (const element of data) {
				let eventNotif = document.createElement('div');
				

				eventNotif.classList.add("row", "eventRapport");

				eventNotif.textContent = element['str'];

				if(x <= maxEvent - 1)
				{
					activeCol.appendChild(eventNotif);
				}
				else
				{
					let result = x % maxEvent

					if(result == 0)
					{
						let eventCarouselItem = document.createElement('div');
						let passiveCol = document.createElement('div');

						passiveCol.classList.add('col');
						eventCarouselItem.classList.add('carousel-item');

						eventCarouselItemList.push(passiveCol);
					}

					eventCarouselItemList[eventCarouselItemList.length - 1].appendChild(eventNotif);
				}

				x++;
			}

			eventCarouselActiveItem.appendChild(activeCol);

			eventCarouselInner.appendChild(eventCarouselActiveItem);

			let y = 0

			if(eventCarouselItemList.length > 0)
			{
				for (const item of eventCarouselItemList)
				{
					let eventCarouselItem = document.createElement('div');
					eventCarouselItem.classList.add("carousel-item", "container-fluid");

					eventCarouselItem.appendChild(item);
					eventCarouselInner.appendChild(eventCarouselItem);
				}
			}

			eventCarousel.appendChild(eventCarouselInner);

			eventCarousel.appendChild(eventCarouselControlPrev);
			eventCarousel.appendChild(eventCarouselControlNext);

			screen.appendChild(eventCarousel);
		}

	})
}