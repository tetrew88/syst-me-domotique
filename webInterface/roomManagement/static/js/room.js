let roomId = document.getElementById("roomId").value;

let temperatureIndicator = document.getElementById('temperature');

let luminosityIndicator = document.getElementById('luminosity');

let banner = document.getElementById('banner');

let moduleListScreen = document.getElementById('moduleList');

let eventList = document.getElementById("eventList");

let moduleList = []

socket.emit('get_room', roomId)
socket.on('post_room', data=>{
	let indicatorColor = ""
	let bannerTitle = document.createElement('h2');
	let contentZone = document.createElement('div')

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
		contentZone.classList.add("row");

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

			contentZone.appendChild(link);

			moduleListScreen.appendChild(contentZone);
		}
	}

	for (const element of data["evenement"])
	{
		let notif = document.createElement('div');

		notif.classList.add("row", "eventRapport");

		notif.textContent(element["str"]);

		eventList.appendChild(notif);
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