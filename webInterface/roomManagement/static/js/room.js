let roomId = document.getElementById("roomId").value;

let temperatureIndicator = document.getElementById('temperature');

let luminosityIndicator = document.getElementById('luminosity');

socket.emit('get_room', roomId)
socket.on('post_room', data=>{
	let indicatorColor = ""

	data = data["data"]

	temperatureIndicator.textContent = data["temperature"];

	luminosityIndicator.textContent = data['luminosity'];

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