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

	networkStateEmplacement.textContent = data;

})