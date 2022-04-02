let roomId = document.getElementById("roomId").value;

let temperatureIndicator = document.getElementById('temperature');

let luminosityIndicator = document.getElementById('luminosity');

let pageTitle = document.getElementById('pageTitle');
let moduleScreen = document.getElementById('modulesScreen');
let eventScreen = document.getElementById("eventsScreen");

let lightButton = document.getElementById('lightButton');

list_room_content(socket, moduleScreen, roomId);
list_room_events(socket, eventsScreen, roomId);

socket.emit('get_room', roomId)
socket.on('post_room', data=>{
	let indicatorColor = ""

	data = data["data"]

	console.log(data)

	pageTitle.textContent = data['name'];

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

})

let moduleList = []
socket.on('post_room_content', data=>{
	if(data["roomId"] == roomId)
	{
		moduleList = data["data"];
	}
})


function switch_light()
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
		socket.emit('switch_light', bulbId);
	}
}

lightButton.addEventListener('click', e => {
    if (e.pointerType === "mouse") {
    	switch_light();
    } // mouse event
    else {
    	switch_light();
    } // touch event
});
