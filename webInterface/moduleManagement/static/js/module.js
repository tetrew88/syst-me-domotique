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

	let typeSection = document.createElement('div');
	let typeLabel = document.createElement('div');
	let typeData = document.createElement('div');

	let manufacturerNameSection = document.createElement('div');
	let manufacturerNameLabel = document.createElement('div');
	let manufacturerNameData = document.createElement('div');

	let productNameSection = document.createElement('div');
	let productNameLabel = document.createElement('div');
	let productNameData = document.createElement('div');

	let productTypeSection = document.createElement('div');
	let productTypeLabel = document.createElement('div');
	let productTypeData = document.createElement('div');

	let systemTypeSection = document.createElement('div');
	let systemTypeLabel = document.createElement('div');
	let systemTypeData = document.createElement('div');


	modulePicture.classList.add("img-fluid", "rounded-circle", "container-fluid");
	if(data['type'] == 'rgb bulb')
	{
		modulePicture.src = "/static/pictures/" + 'bulb' + ".jpeg";
	}
	else
	{
		modulePicture.src = "/static/pictures/" + data['type'] + ".jpeg";
	}

	//module information

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
	
	idData.textContent = data["id"];
	idData.classList.add('col-7', 'rounded', 'data');

	idSection.appendChild(idLabel);
	idSection.appendChild(idData);

	//type section
	typeSection.classList.add('row', 'container-fluid', 'typeSection');

	typeLabel.classList.add('col-5');
	typeLabel.textContent = "Type:";
	
	typeData.textContent = data["type"];
	typeData.classList.add('col-7', 'rounded', 'data');

	typeSection.appendChild(typeLabel);
	typeSection.appendChild(typeData);


	//product information

	//manufacturerNameSection
	manufacturerNameSection.classList.add('row', 'container-fluid', 'typeSection');

	manufacturerNameLabel.classList.add('col-5');
	manufacturerNameLabel.textContent = "Manufacturer name:";
	
	manufacturerNameData.textContent = data["manufacturer name"];
	manufacturerNameData.classList.add('col-7', 'rounded', 'data');

	manufacturerNameSection.appendChild(manufacturerNameLabel);
	manufacturerNameSection.appendChild(manufacturerNameData);

	//productNameSection
	productNameSection.classList.add('row', 'container-fluid', 'typeSection');

	productNameLabel.classList.add('col-5');
	productNameLabel.textContent = "Product name:";
	
	productNameData.textContent = data["product name"];
	productNameData.classList.add('col-7', 'rounded', 'data');

	productNameSection.appendChild(productNameLabel);
	productNameSection.appendChild(productNameData);

	//productTypeSection
	productTypeSection.classList.add('row', 'container-fluid', 'typeSection');

	productTypeLabel.classList.add('col-5');
	productTypeLabel.textContent = "Product type:";
	
	productTypeData.textContent = data["product type"];
	productTypeData.classList.add('col-7', 'rounded', 'data');

	productTypeSection.appendChild(productTypeLabel);
	productTypeSection.appendChild(productTypeData);

	//systemTypeSection
	systemTypeSection.classList.add('row', 'container-fluid', 'typeSection');

	systemTypeLabel.classList.add('col-5');
	systemTypeLabel.textContent = "System type:";
	
	systemTypeData.textContent = data["system type"];
	systemTypeData.classList.add('col-7', 'rounded', 'data');

	systemTypeSection.appendChild(systemTypeLabel);
	systemTypeSection.appendChild(systemTypeData);system


	modulePictureZone.appendChild(modulePicture);

	moduleInformationZone.appendChild(nameSection);
	moduleInformationZone.appendChild(locationSection);
	moduleInformationZone.appendChild(idSection);
	moduleInformationZone.appendChild(typeSection);

	productInformationZone.appendChild(manufacturerNameSection);
	productInformationZone.appendChild(productNameSection);
	productInformationZone.appendChild(productTypeSection);
	productInformationZone.appendChild(systemTypeSection);

})

function set_module_name()
{

}