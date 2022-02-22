let roomId = document.getElementById("roomId").value;

let temperatureIndicator = document.getElementById('temperature');

let luminosityIndicator = document.getElementById('luminosity');

let banner = document.getElementById('banner');

let moduleListScreen = document.getElementById('moduleList');

socket.emit('get_room', roomId)
socket.on('post_room', data=>{
	let indicatorColor = ""
	let bannerTitle = document.createElement('h2');
	let moduleList = []

	data = data["data"]

	bannerTitle.textContent = data['name'];
	banner.appendChild(bannerTitle);

	temperatureIndicator.textContent = data["temperature"] + "°c";

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

	console.log(moduleList)

	if(moduleList.length <= 6)
	{
		console.log('!!!!!!!!!!!!')
		moduleListScreen.classList.add("row");

		for (const element of moduleList)
		{
			console.log(element);

			let link = document.createElement('a')
			let moduleCard = document.createElement('div');
			let cardPicture = document.createElement('img');
			let cardTitle =  document.createElement('div');

			link.href = '/module/' + element['id'] + "/";

			moduleCard.classList.add("col-lg-4", "card", "moduleCard", "rounded");

			cardPicture.classList.add("img-fluid", "rounded");
			cardPicture.src = "../moduleManagement/static/pictures/" + 'bulb' + ".jpeg";

			cardTitle.classList.add("card-title", "text-center");
			cardTitle.textContent = element["name"];

			moduleCard.appendChild(cardPicture);
			moduleCard.appendChild(cardTitle);

			link.appendChild(moduleCard);

			moduleListScreen.appendChild(link);
		}
	}

})