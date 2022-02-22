let roomId = document.getElementById("roomId").value;

let temperatureIndicator = document.getElementById('temperature');

let luminosityIndicator = document.getElementById('luminosity');

let banner = document.getElementById('banner');

socket.emit('get_room', roomId)
socket.on('post_room', data=>{
	let indicatorColor = ""
	let bannerTitle = document.createElement('h2');

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

})