let loadingScreen = document.getElementById("loadingScreen");
let pageContent = document.getElementById("pageContent");

loadingScreen.style.display = "none";

socket.emit('get_rooms_list', '')
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


function add_module()
{
	let nameInput = document.getElementById("moduleName");
	let locationInput = document.getElementById("moduleEmplacement");

	let data = {}

	data['moduleName'] = nameInput.value;
	data['roomId'] = locationInput.value;

	socket.emit('add_module', data);
	pageContent.style.display = "none";
	loadingScreen.style.display = "block";
}