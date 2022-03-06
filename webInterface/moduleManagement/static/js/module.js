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

	modulePicture.classList.add("img-fluid", "rounded-circle", "container-fluid");
	if(data['type'] == 'rgb bulb')
	{
		modulePicture.src = "/static/pictures/" + 'bulb' + ".jpeg";
	}
	else
	{
		modulePicture.src = "/static/pictures/" + data['type'] + ".jpeg";
	}

	nameSection.classList.add('row', 'container-fluid', 'nameSection');

	nameLabel.classList.add('col-5');
	nameLabel.textContent = "Name:";
	
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


	modulePictureZone.appendChild(modulePicture);

	moduleInformationZone.appendChild(nameSection);

})

function set_module_name()
{

}