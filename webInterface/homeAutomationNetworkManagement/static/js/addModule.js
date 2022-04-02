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


async function add_module()
{
	let nameInput = document.getElementById("moduleName");
	let locationInput = document.getElementById("moduleEmplacement");

	let previousModuleList = [];
	let newModuleList = [];

	let data = {};
	let succes = false

	socket.emit('get_modules_list', '');
	socket.on('post_modules_list', data=>{
		previousModuleList = data["data"];
	})

	data['moduleName'] = nameInput.value;
	data['roomId'] = locationInput.value;

	socket.emit('add_module', data);
	
	pageContent.style.display = "none";
	loadingScreen.style.display = "block";

	await pause(5000);

	socket.emit('get_modules_list', '');
	socket.on('post_modules_list', data=>{
		previousModuleList = data["data"];
	})

	pageContent.style.display = "block";
	loadingScreen.style.display = "none";

	if(newModuleList.length > previousModuleList.length)
	{
		for (const element of newModuleList)
		{
			if(element["name"] == data['moduleName'])
			{
				succes = true;
				break;
			}
		}
	}
	else
	{
		succes = false
	}

	if(succes == true)
	{
		document.location.href = '/moduleListing'
	}
	else
	{
		let notif = document.createElement('div');

		notif.classList.add("row", "text-center");
		notif.textContent = 'Erreur';

		document.location.href = "/addModule"

		pageContent.appendChild(notif);
	}


}