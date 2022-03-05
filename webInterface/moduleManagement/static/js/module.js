let moduleId = document.getElementById("moduleId").value;

socket.emit('get_module', moduleId)
socket.on('post_module', data=>{
	let modulePictureZone = document.getElementById("modulePicture");
	let moduleInformationZone = document.getElementById("moduleInformation");
	let productInformationZone = document.getElementById("productInformation");
	let moduleStateInformationZone = document.getElementById("moduleStateInformation");

	let modulePicture = document.createElement('img');

	data = data["data"];

	modulePicture.classList.add("img-fluid", "rounded");
	if(element['type'] == 'rgb bulb')
	{
		modulePicture.src = "/static/pictures/" + 'bulb' + ".jpeg";
	}
	else
	{
		modulePicture.src = "/static/pictures/" + element['type'] + ".jpeg";
	}


	modulePictureZone.appendChild(modulePicture);

})