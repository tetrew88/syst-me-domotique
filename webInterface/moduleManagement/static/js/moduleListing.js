socket.emit('get_modules_list', '')
socket.on('post_modules_list', data=>{
	let screen = document.getElementById("screen");

	let moduleList = [];
	let moduleTypeList = [];

	moduleList = data["data"];

	for (const element of moduleList) {
		if(moduleList.includes(element["type"]))
		{

		}
		else
		{
			moduleTypeList.push(element["type"])
		}
	}


	for (const element of moduleTypeList)
	{
		let moduleSection = document.createElement('div');
		
		let bannerSection = document.createElement('div');
		let titleSection = document.createElement("div");
		let titleZone = document.createElement('div');
		let listSection = document.createElement('div');
		let listZone = document.createElement('div');
		let moduleListScreen = document.createElement('div')


		let margin1 = document.createElement('div');
		let margin2 = document.createElement('div');

		let actualType = element
		let selectedModuleList = []

		for (const element of moduleList)
		{
			if(element['type'] == actualType)
			{
				selectedModuleList.push(element)
			}
		}


		moduleSection.classList.add("row", "container-fluid", "moduleSection")

		titleSection.classList.add("row", "container-fluid")
		titleZone.classList.add("col-4");
		titleZone.textContent = element

		margin1.classList.add("col-4");
		margin2.classList.add("col-2");

		listSection.classList.add('row');
		listZone.classList.add('col-10');

		moduleListScreen.classList.add('row');
		///////////////////
		for (const element of selectedModuleList)
		{
			
		}
		//////////////////

		if(selectedModuleList.length <= 3)
		{
			for (const element of selectedModuleList) {
				console.log(element);

				let link = document.createElement('a');
				let moduleCard = document.createElement('div');
				let cardPicture = document.createElement('img');
				let cardTitle =  document.createElement('div');                                                                                         

				link.href = '/module/' + element['id'] + "/"
				link.classList.add("col-lg-4", "container-fluid")

				moduleCard.classList.add("card", "moduleCard", "rounded");

				cardPicture.classList.add("img-fluid");
				cardPicture.src = "/static/pictures/" + element['type'] + ".jpeg";
				cardTitle.classList.add("card-title", "text-center");
				cardTitle.style.color = 'blue';
				cardTitle.textContent = element["name"]

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

			carousel.id = 'moduleCarousel'
			carousel.classList.add("carousel", "slide", "container-fluid");
			carousel.setAttribute('data-interval', "false");

			carouselInner.classList.add("carousel-inner", "container-fluid");

			carouselActiveItem.classList.add("carousel-item", "active", "container-fluid");

			activeRow.classList.add('row')

			carouselControlPrev.classList.add("carousel-control-prev", "container-fluid");
			carouselControlPrev.href = "#moduleCarousel";
			carouselControlPrev.role="button";
			carouselControlPrev.setAttribute('data-slide',"prev");

			prevIcon.classList.add('carousel-control-prev-icon', "container-fluid");
			prevIcon.setAttribute('aria-hidden', "true");
			prevIcon.style.color = 'black';

			carouselControlNext.classList.add("carousel-control-next", "container-fluid");
			carouselControlNext.href = "#moduleCarousel";
			carouselControlNext.role="button";
			carouselControlNext.setAttribute('data-slide','next');

			nextIcon.classList.add('carousel-control-next-icon', "container-fluid");
			nextIcon.setAttribute('aria-hidden', 'true');
			nextIcon.style.color = 'black';

			carouselControlPrev.appendChild(prevIcon);
			carouselControlNext.appendChild(nextIcon);

			for (const element of selectedModuleList) {
				let link = document.createElement('a')
				let moduleCard = document.createElement('div');
				let cardPicture = document.createElement('img');
				let cardTitle =  document.createElement('div');

				link.href = '/module/' + element['id'] + "/"
				link.classList.add("col-lg-4")

				moduleCard.classList.add("card", "moduleCard", "rounded");

				cardPicture.classList.add("img-fluid", "rounded-circle");
				cardPicture.src = "/static/pictures/" + element['type'] + ".jpeg";
				cardTitle.classList.add("card-title", "text-center");
				cardTitle.style.color = 'blue';
				cardTitle.textContent = element["name"];

				moduleCard.appendChild(cardPicture);
				moduleCard.appendChild(cardTitle);

				link.appendChild(moduleCard);

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

			moduleListScreen.appendChild(carousel);
		}

		//////////////////
		titleSection.appendChild(margin1);
		titleSection.appendChild(titleZone);
		titleSection.appendChild(margin1);

		bannerSection.appendChild(titleSection);


		listZone.appendChild(moduleListScreen);

		listSection.appendChild(margin2);
		listSection.appendChild(listZone);
		listSection.appendChild(margin2);

		moduleSection.appendChild(bannerSection);
		moduleSection.appendChild(listSection);

		screen.appendChild(moduleSection);
	}

})