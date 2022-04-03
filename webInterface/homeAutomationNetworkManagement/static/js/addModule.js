let loadingScreen = document.getElementById("loadingScreen");
let pageContent = document.getElementById("pageContent");

socket.emit('get_rooms_list', '')
socket.on('post_rooms_list', data=>{
	let locationInput = document.getElementById("moduleEmplacement");

	locationInput.innerHTML = "";

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

	let newModuleList = [];

	let data = {};
	let succes = false

	data['moduleName'] = nameInput.value;
	data['roomId'] = locationInput.value;

	socket.emit('add_module', data);
	
	pageContent.style.display = "none";
	loadingScreen.style.display = "block";

	await pause(10000);

	socket.emit('get_modules_list', '');
	socket.on('post_modules_list', data=>{
		newModuleList = data["data"];
	})

	await pause(2500);

	pageContent.style.display = "block";
	loadingScreen.style.display = "none";

	for (const element of newModuleList)
	{
		if(element["name"] == data['moduleName'])
		{
			succes = true;
			break;
		}
		else
		{
			succes = false
		}
	}

	if(succes == true)
	{
		document.location.href = '/moduleListing'
	}
	else
	{
		if(!document.getElementById('notif'))
		{
  			// on ajoute la div
			let notif = document.createElement('div');
			let message = document.createElement("h2");

			notif.classList.add("row", "text-center");
			notif.id = "notif"

			message.classList.add("alertNotif");
			
			message.textContent = 'Erreur';

			notif.appendChild(message);

			pageContent.appendChild(notif);
		}
	}


}