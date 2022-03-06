let moduleId = document.getElementById("moduleId").value;

socket.emit('get_module', moduleId)
socket.on('post_module', data=>{

	data = data["data"];

	let modulePictureZone = document.getElementById("modulePicture");
	let moduleInformationZone = document.getElementById("moduleInformation");
	let productInformationZone = document.getElementById("productInformation");
	let moduleStateInformationZone = document.getElementById("moduleStateInformation");

	let modulePicture = document.createElement('img');

	let nameSection = document.createElement('div');
	let nameLabel = document.createElement('div');
	let nameInput = document.createElement('input');
	let nameButton = document.createElement('button');

	let locationSection = document.createElement('div');
	let locationLabel = document.createElement('div');
	let locationInput = document.createElement('input');
	let locationButton = document.createElement('button');

	let idSection = document.createElement('div');
	let idLabel = document.createElement('div');
	let idData = document.createElement('div');

	modulePicture.classList.add("img-fluid", "rounded-circle", "container-fluid");
	if(data['type'] == 'rgb bulb')
	{
		modulePicture.src = "/static/pictures/" + 'bulb' + ".jpeg";
	}
	else
	{
		modulePicture.src = "/static/pictures/" + data['type'] + ".jpeg";
	}

	//name section
	nameSection.classList.add('row', 'container-fluid', 'nameSection');

	nameLabel.classList.add('col-5');
	nameLabel.textContent = "Nom:";
	
	nameInput.id = "moduleName";
	nameInput.type = "text";
	nameInput.value = data["name"];
	nameInput.classList.add('col-5', 'rounded');

	nameButton.type = "button";
	nameButton.setAttribute('onclick', 'set_module_name();');
	nameButton.classList.add('col-2');

	nameSection.appendChild(nameLabel);
	nameSection.appendChild(nameInput);
	nameSection.appendChild(nameButton);

	//location section
	locationSection.classList.add('row', 'container-fluid', 'locationSection');

	locationLabel.classList.add('col-5');
	locationLabel.textContent = "Location:";
	
	locationInput.id = "moduleLocation";
	locationInput.type = "text";
	locationInput.value = data["location"];
	locationInput.classList.add('col-5', 'rounded');

	locationButton.type = "button";
	locationButton.setAttribute('onclick', 'set_module_location();');
	locationButton.classList.add('col-2');


	locationSection.appendChild(locationLabel);
	locationSection.appendChild(locationInput);
	locationSection.appendChild(locationButton);

	//id section
	idSection.classList.add('row', 'container-fluid', 'idSection');

	idLabel.classList.add('col-5');
	idLabel.textContent = "Id:";
	
	idData.id = "moduleId";
	idData.textContent = data["id"];
	idData.classList.add('col-7', 'rounded');

	idSection.appendChild(idLabel);
	idSection.appendChild(idData);

	modulePictureZone.appendChild(modulePicture);

	moduleInformationZone.appendChild(nameSection);
	moduleInformationZone.appendChild(locationSection);
	moduleInformationZone.appendChild(idSection);

})

function set_module_name()
{

}