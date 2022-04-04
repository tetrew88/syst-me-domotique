let loadingScreen = document.getElementById("loadingScreen");
let pageContent = document.getElementById("pageContent");

socket.emit('get_rooms_list', '');
socket.on('post_rooms_list', data=>{
	let roomInput = document.getElementById("room");
	roomInput.innerHTML = "";

	let optionList = [];

	data = data["data"];
	for (const element of data)
	{
		let option = document.createElement('option');
			
		option.text = element['name'];
		option.value = element['id'];

		optionList.push(option);
	}

	for (const element of optionList)
	{
		roomInput.appendChild(element);
	}
})


async function del_room()
{
	let roomInput = document.getElementById("room");

	let newModuleList = [];

	let data = {};
	let succes = false

	data['roomId'] = roomInput.value;

	console.log("!!!!!!!");
	console.log(roomInput.value);
	console.log("!!!!!!!!")

	socket.emit('del_room', data);
	
	pageContent.style.display = "none";
	loadingScreen.style.display = "block";

	await pause(10000);

	socket.emit('get_rooms_list', '');
	socket.on('post_rooms_list', roomData=>{
		newRoomList = roomData["data"];
	})

	await pause(2500);

	pageContent.style.display = "block";
	loadingScreen.style.display = "none";

	for (const element of newRoomList)
	{
		if(element["id"] == data['roomId'])
		{
			succes = false;
			break;
		}
		else
		{
			succes = true;
		}
	}

	if(succes == true)
	{
		document.location.href = '/roomListing'
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