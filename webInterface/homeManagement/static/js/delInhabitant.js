let loadingScreen = document.getElementById("loadingScreen");
let pageContent = document.getElementById("pageContent");

socket.emit('get_inhabitants_list', '');
socket.on('post_inhabitants_list', data=>{
	let inhabitant = document.getElementById("inhabitant");
	inhabitant.innerHTML = "";

	let optionList = [];

	data = data["data"];
	for (const element of data)
	{
		let option = document.createElement('option');
			
		option.text = element["profil"]['firstName'];
		option.value = element['id'];

		optionList.push(option);
	}

	for (const element of optionList)
	{
		inhabitant.appendChild(element);
	}
})


async function del_inhabitant()
{
	let inhabitant = document.getElementById("inhabitant");

	let newInhabitantList = [];

	let data = {};
	let succes = false

	data['inhabitantId'] = inhabitant.value;

	socket.emit('del_room', data);
	
	pageContent.style.display = "none";
	loadingScreen.style.display = "block";

	await pause(10000);

	socket.emit('get_inhabitants_list', '');
	socket.on('post_inhabitants_list', inhabitantData=>{
		newInhabitantList = inhabitantData["data"];
	})

	await pause(2500);

	pageContent.style.display = "block";
	loadingScreen.style.display = "none";

	for (const element of newInhabitantList)
	{
		if(element["id"] == data['inhabitantId'])
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
		document.location.href = '/profilListing'
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