let profilId = document.getElementById("profilId").value;

socket.emit('get_profil', profilId)
socket.on('post_profil', data=>{
	lastNameInput = document.getElementById('lastNameInput');
	firstNameInput = document.getElementById('firstNameInput');

	data = data["data"];

	firstNameInput.value = data["firstName"];
	lastNameInput.value = data["lastName"];
})

function set_profil_lastName()
{
	let profilId = document.getElementById("profilId").value;
	let lastName = document.getElementById('lastNameInput').value;

	socket.emit('set_profil_lastName', {"profilId": profilId, "lastName": lastName});
}


function set_profil_firstName()
{
	let profilId = document.getElementById("profilId").value;
	firstName = document.getElementById('firstNameInput').value;

	socket.emit('set_profil_firstName', {"profilId": profilId, "firstName": firstName});
}