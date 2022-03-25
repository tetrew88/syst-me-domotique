let screen = document.getElementById("modulesScreen");

list_modules(socket, screen);

socket.emit('get_homeId', '')
socket.on('post_homeId', data=>{
	data = data["data"];

	let homeIdEmplacement = document.getElementById("homeId");

	homeIdEmplacement.textContent = data;

})


socket.emit('get_network_state', '')
socket.on('post_network_state', data=>{
	data = data["data"];

	let networkStateEmplacement = document.getElementById("networkState");

	if (data == '0')
	{
		networkStateEmplacement.textContent = "Arrété";
	}
	else if (data == '1')
	{
		networkStateEmplacement.textContent = "Erreur";
	}
	else if (data == '3')
	{
		networkStateEmplacement.textContent = "Redémarrer";
	}
	else if (data == '5')
	{
		networkStateEmplacement.textContent = "Démarrer";
	}
	else if (data == '5')
	{
		networkStateEmplacement.textContent = "Réveiller";
	}
	else if (data == '10')
	{
		networkStateEmplacement.textContent = "Prêt";
	}
	else
	{
		networkStateEmplacement.textContent = data;
	}

})