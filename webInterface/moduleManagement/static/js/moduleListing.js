socket.emit('get_modules_list', '')
socket.on('post_modules_list', data=>{
	let screen = document.getElementById("screen");

	let moduleList = [];
	let moduleTypeList = [];

	moduleList = data["data"];

	for (const element of moduleList)
	{
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


		moduleSection.classList.add('row', 'moduleSection');
		content.classList.add('col');

		bannerSection.classList.add('row');
		bannerMargin1.classList.add('col-4');
		bannerMargin2.classList.add('col-4');
		titleZone.classList.add('col-4', 'text-center');

		listSection.classList.add("row");
		listMargin1.classList.add('col-4');
		listMargin2.classList.add('col-4');

		listZone.classList.add('col-4');
		listContent.classList.add('row', 'moduleList');

		titleZone.textContent = element;


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