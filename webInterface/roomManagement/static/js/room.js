let roomId = document.getElementById("roomId").value;

let temperatureIndicator = document.getElementById('temperature');

let luminosityIndicator = document.getElementById('luminosity');

let banner = document.getElementById('banner');

let moduleListScreen = document.getElementById('moduleList');

let eventListScreen = document.getElementById("eventList");

let moduleList = []
let eventList = []

socket.emit('get_room', roomId)
socket.on('post_room', data=>{
	let indicatorColor = ""
	let bannerTitle = document.createElement('h2');

	data = data["data"]

	console.log(data)

	bannerTitle.textContent = data['name'];
	banner.appendChild(bannerTitle);

	temperatureIndicator.textContent = Number.parseFloat(data["temperature"]).toFixed(1) + "°c";

	luminosityIndicator.textContent = data['luminosity'] + "lux";

	if( data["temperature"] < 20)
	{
		indicatorColor = 'blue';
	}
	else if(data['temperature'] < 30)
	{
		indicatorColor = 'green';
	}
	else
	{
		indicatorColor = 'red';
	}

	temperatureIndicator.style.color = indicatorColor;
	luminosityIndicator.style.color = indicatorColor;

	moduleList = data['content'];

	if(moduleList.length <= 6)
	{

		for (const element of moduleList)
		{
			let link = document.createElement('a');
			let moduleCard = document.createElement('div');
			let cardPicture = document.createElement('img');
			let cardTitle =  document.createElement('div');

			link.href = '/module/' + element['id'] + "/";
			link.classList.add("col-lg-4");

			moduleCard.classList.add("card", "moduleCard", "rounded");

			cardPicture.classList.add("img-fluid", "rounded");
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

			moduleCard.appendChild(cardPicture);
			moduleCard.appendChild(cardTitle);

			link.appendChild(moduleCard);

			moduleListScreen.appendChild(link);
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

		moduleListScreen.appendChild(carousel);
	}

	eventList = data['events'];

	if(eventList.length <= 3)
	{
		for (const element of eventList)
		{
			let eventNotif = document.createElement('div');
			

			eventNotif.classList.add("row", "eventRapport");

			eventNotif.textContent = element['str'];
			

			eventListScreen.appendChild(eventNotif);
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

		eventCarouselInner.classList.add("carousel-inner", "container-fluid");

		eventCarouselActiveItem.classList.add("carousel-item", "active", "container-fluid");

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

			if(x <= 2)
			{
				activeCol.appendChild(eventNotif);
			}
			else
			{
				let result = x % 3

				if(result == 0)
				{
					let eventCarouselItem = document.createElement('div');
					let passiveCol = document.createElement('div');

					passiveCol.classList.add('col');

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

		eventListScreen.appendChild(eventCarousel);
	}



})


function light_on()
{
	bulbId = []

	for (const element of moduleList)
	{
		if(element['type'] == 'bulb' || element['type'] == 'rgb bulb')
		{
			bulbId.push(element['id'])
		}
	}

	if (bulbId.length > 0)
	{
		socket.emit('set_on_light', bulbId);
	}
}