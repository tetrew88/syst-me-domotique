let profilId = document.getElementById("profilId").value;

socket.emit('get_profil', profilId)
socket.on('post_profil', data=>{
	lastNameInput = document.getElementById('lastNameInput');
	firstNameInput = document.getElementById('firstNameInput');

	data = data["data"];

	firstNameInput.value = data["firstName"];
	lastNameInput.value = data["lastName"];
})