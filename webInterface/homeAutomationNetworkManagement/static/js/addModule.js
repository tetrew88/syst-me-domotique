socket.emit('get_rooms_list', 'rooms')
socket.on('post_rooms_list', data=>{
	let locationInput = document.getElementById("moduleEmplacement");

	let optionList = [];

	data = data["data"];

	for (const element of data)
	{
		let option = document.createElement('option');
			
		option.text = element['name']
		option.value = element['id']

		optionList.push(option);
	}

	for (const element of optionList)
	{
		locationInput.appendChild(element);
	}
})