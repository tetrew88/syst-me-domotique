socket.emit('get_modules_list', '')
socket.on('post_modules_list', data=>{
	let screen = document.getElementById("screen");

	let moduleList = [];
	let moduleTypeList = [];

	moduleList = data["data"];

	for (const element of moduleList)
	{
		if(moduleTypeList.includes(element["type"]))
		{

		}
		else
		{
			moduleTypeList.push(element["type"])
		}
	}


	for (const element of moduleTypeList)
	{
		let selectedModules = [];
		let selectedType = element;

		let moduleSection = document.createElement('div');
		let content = document.createElement('div');

		let bannerSection = document.createElement('div');
		let bannerMargin1 = document.createElement('div');
		let bannerMargin2 = document.createElement('div');
		let titleZone = document.createElement('div');

		let listSection = document.createElement('div');
		let listMargin1 = document.createElement('div');
		let listMargin2 = document.createElement('div');

		let listZone = document.createElement('div');
		let listContent = document.createElement('div');


		for(const element of moduleList)
		{
			if(element['type'] == selectedType)
			{
				selectedModules.push(element);
			}
		}


		moduleSection.classList.add('row', 'moduleSection');
		content.classList.add('col');

		bannerSection.classList.add('row');
		bannerMargin1.classList.add('col-4');
		bannerMargin2.classList.add('col-4');
		titleZone.classList.add('col-4', 'text-center');

		listSection.classList.add("row");
		listMargin1.classList.add('col-3');
		listMargin2.classList.add('col-3');

		listZone.classList.add('col-6');
		listContent.classList.add('row', 'moduleList', "rounded");

		titleZone.textContent = element;


		if(selectedModules.length <= 3)
		{

			for (const element of selectedModules)
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

				listContent.appendChild(link);
			}
		}


		bannerSection.appendChild(bannerMargin1);
		bannerSection.appendChild(titleZone);
		bannerSection.appendChild(bannerMargin2);


		listZone.appendChild(listContent);


		listSection.appendChild(listMargin1);
		listSection.appendChild(listZone);
		listSection.appendChild(listMargin2);


		content.appendChild(bannerSection);
		content.appendChild(listSection);


		moduleSection.appendChild(content);


		screen.appendChild(moduleSection);
	}

})