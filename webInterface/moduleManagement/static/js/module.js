let moduleId = document.getElementById("moduleId").value;

socket.emit('get_module', moduleId)
socket.on('post_module', data=>{

	data = data["data"];

	console.log(data);

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

	let awakeSection = document.createElement('div');
	let awakeLabel = document.createElement('div');
	let awakeData = document.createElement('div');

	let disfunctionnementSection = document.createElement('div');
	let disfunctionnementLabel = document.createElement('div');
	let disfunctionnementData = document.createElement('div');

	let readySection = document.createElement('div');
	let readyLabel = document.createElement('div');
	let readyData = document.createElement('div');

	let sleepSection = document.createElement('div');
	let sleepLabel = document.createElement('div');
	let sleepData = document.createElement('div');

	let lightUpSection = document.createElement('div');
	let lightUpLabel = document.createElement('div');
	let lightUpData = document.createElement('div');
	let switchLightButton = document.createElement('button');

	let intensitySection = document.createElement('div');
	let intensityLabel = document.createElement('div');
	let intensityInput = document.createElement('input');

	let colorSection = document.createElement('div');
	let colorLabel = document.createElement('div');
	let colorInput = document.createElement('select');


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
	locationLabel.textContent = "emplacement:";
	
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

	////Bulb section
	if(data['type'] == 'bulb' || data['type'] == 'rgb bulb')
	{
		//light up section
		lightUpSection.classList.add('row', 'container-fluid', 'lightUpSection');

		lightUpLabel.classList.add('col-5');
		lightUpLabel.textContent = "Allumé:";
		
		lightUpData.textContent = data["lightUp"];
		lightUpData.classList.add('col-5', 'rounded', 'data');

		switchLightButton.type = "button";
		switchLightButton.setAttribute('onclick', 'switch_light();');
		switchLightButton.classList.add('col-2');

		lightUpSection.appendChild(lightUpLabel);
		lightUpSection.appendChild(lightUpData);
		lightUpSection.appendChild(switchLightButton);

		//intensity section
		intensitySection.classList.add('row', 'container-fluid', 'intensitySection');

		intensityLabel.classList.add('col-5');
		intensityLabel.textContent = "intensité:";
		
		intensityInput.id = "intensity";
		intensityInput.type = "range";
		intensityInput.value = data["intensity"];
		intensityInput.classList.add('col-7', 'rounded');
		intensityInput.setAttribute('min', '0');
		intensityInput.setAttribute('max', '100');
		intensityInput.setAttribute('onchange', 'set_intensity();');


		intensitySection.appendChild(intensityLabel);
		intensitySection.appendChild(intensityInput);

		////rgb bulb section
		if(data['type'] == 'rgb bulb')
		{
			//color section
			colorSection.classList.add('row', 'container-fluid', 'colorSection');

			colorLabel.classList.add('col-5');
			colorLabel.textContent = "couleur:";
		
			colorInput.id = "color";
			colorInput.classList.add('col-7', 'rounded');
			colorInput.setAttribute('onchange', 'set_color();');

			let firstOption = document.createElement('option');
			let optionList = []

			firstOption.text = data["color"]["name"];
			firstOption.value = data["color"]["rgbwValue"];

			for (const element of data["color palette"])
			{
				if(element['name'] == data["color"]["name"])
				{

				}
				else
				{
					let option = document.createElement('option');

					option.text = element['name']
					option.value = element['rgbwValue']

					optionList.push(option);
				}
			}

			colorInput.appendChild(firstOption);

			for (const element of optionList)
			{
				colorInput.appendChild(element);
			}

			colorSection.appendChild(colorLabel);
			colorSection.appendChild(colorInput);
		}


	}

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
	manufacturerNameSection.classList.add('row', 'container-fluid', 'ManufacturerNameSection');

	manufacturerNameLabel.classList.add('col-5');
	manufacturerNameLabel.textContent = "Nom du fabriquant:";
	
	manufacturerNameData.textContent = data["manufacturer name"];
	manufacturerNameData.classList.add('col-7', 'rounded', 'data');

	manufacturerNameSection.appendChild(manufacturerNameLabel);
	manufacturerNameSection.appendChild(manufacturerNameData);

	//productNameSection
	productNameSection.classList.add('row', 'container-fluid', 'productNameSection');

	productNameLabel.classList.add('col-5');
	productNameLabel.textContent = "Nom de produit:";
	
	productNameData.textContent = data["product name"];
	productNameData.classList.add('col-7', 'rounded', 'data');

	productNameSection.appendChild(productNameLabel);
	productNameSection.appendChild(productNameData);

	//productTypeSection
	productTypeSection.classList.add('row', 'container-fluid', 'productTypeSection');

	productTypeLabel.classList.add('col-5');
	productTypeLabel.textContent = "Type de produit:";
	
	productTypeData.textContent = data["product type"];
	productTypeData.classList.add('col-7', 'rounded', 'data');

	productTypeSection.appendChild(productTypeLabel);
	productTypeSection.appendChild(productTypeData);

	//systemTypeSection
	systemTypeSection.classList.add('row', 'container-fluid', 'systemTypeSection');

	systemTypeLabel.classList.add('col-5');
	systemTypeLabel.textContent = "Type de système:";
	
	systemTypeData.textContent = data["system type"];
	systemTypeData.classList.add('col-7', 'rounded', 'data');

	systemTypeSection.appendChild(systemTypeLabel);
	systemTypeSection.appendChild(systemTypeData);

	//state information

	//awake section
	awakeSection.classList.add('row', 'container-fluid', 'awakeSection');

	awakeLabel.classList.add('col-5');
	awakeLabel.textContent = "Réveillé:";
	
	awakeData.textContent = data["awake"];
	awakeData.classList.add('col-7', 'rounded', 'data');

	awakeSection.appendChild(awakeLabel);
	awakeSection.appendChild(awakeData);

	//disfunctionnement section
	disfunctionnementSection.classList.add('row', 'container-fluid', 'disfunctionnementSection');

	disfunctionnementLabel.classList.add('col-5');
	disfunctionnementLabel.textContent = "Disfonctionnement:";
	
	disfunctionnementData.textContent = data["disfunctionnement"];
	disfunctionnementData.classList.add('col-7', 'rounded', 'data');

	disfunctionnementSection.appendChild(disfunctionnementLabel);
	disfunctionnementSection.appendChild(disfunctionnementData);

	//ready section
	readySection.classList.add('row', 'container-fluid', 'readySection');

	readyLabel.classList.add('col-5');
	readyLabel.textContent = "Prêt:";
	
	readyData.textContent = data["ready"];
	readyData.classList.add('col-7', 'rounded', 'data');

	readySection.appendChild(readyLabel);
	readySection.appendChild(readyData);

	//sleep section
	sleepSection.classList.add('row', 'container-fluid', 'sleepSection');

	sleepLabel.classList.add('col-5');
	sleepLabel.textContent = "Dort:";
	
	sleepData.textContent = data["sleep"];
	sleepData.classList.add('col-7', 'rounded', 'data');

	sleepSection.appendChild(sleepLabel);
	sleepSection.appendChild(sleepData);


	modulePictureZone.appendChild(modulePicture);

	moduleInformationZone.appendChild(nameSection);
	moduleInformationZone.appendChild(locationSection);

	if(data['type'] == 'bulb' || data['type'] == 'rgb bulb')
	{
		moduleInformationZone.appendChild(lightUpSection);
		moduleInformationZone.appendChild(intensitySection);

		if(data['type'] == 'rgb bulb')
		{
			moduleInformationZone.appendChild(colorSection);
		}
	}

	moduleInformationZone.appendChild(idSection);
	moduleInformationZone.appendChild(typeSection);

	productInformationZone.appendChild(manufacturerNameSection);
	productInformationZone.appendChild(productNameSection);
	productInformationZone.appendChild(productTypeSection);
	productInformationZone.appendChild(systemTypeSection);

	moduleStateInformationZone.appendChild(awakeSection);
	moduleStateInformationZone.appendChild(disfunctionnementSection);
	moduleStateInformationZone.appendChild(readySection);
	moduleStateInformationZone.appendChild(sleepSection);


})


function set_module_name()
{

}

function switch_light()
{
	let moduleId = document.getElementById("moduleId").value;

	socket.emit('switch_light', moduleId);

}

function set_color()
{
	let moduleId = document.getElementById("moduleId").value;
	let select = document.getElementById("color");
	let choice = select.selectedIndex
	let value = select.options[choice].value;

	socket.emit('set_rbgBulb_color', {'moduleId': moduleId,
	'colorValue': value
	});
}

function set_intensity()
{
	let moduleId = document.getElementById("moduleId").value;
	let value = document.getElementById("intensity").value;
}