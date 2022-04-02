let loadingScreen = document.getElementById("loadingScreen");
let pageContent = document.getElementById("pageContent");


let typeInput = document.getElementById("roomType");
let typeList
let optionList = [];

async function add_room()
{
	let nameInput = document.getElementById("roomName");
	let typeInput = document.getElementById("roomType");

	let newRoomList = [];

	let data = {};
	let succes = false

	data['roomName'] = nameInput.value;
	data['roomType'] = typeInput.value;

	socket.emit('add_room', data);
	
	pageContent.style.display = "none";
	loadingScreen.style.display = "block";

	await pause(5000);

	socket.emit('get_rooms_list', '');
	socket.on('post_rooms_list', data=>{
		newRoomList = data["data"];
	})

	pageContent.style.display = "block";
	loadingScreen.style.display = "none";

	for (const element of newRoomList)
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
		document.location.href = '/roomListing'
	}
	else
	{
		let notif = document.createElement('div');
		let message = document.createElement("h2");

		notif.classList.add("row", "text-center");
		message.classList.add("alertNotif");
		
		message.textContent = 'Erreur';

		notif.appendChild(message);

		pageContent.appendChild(notif);
	}


}