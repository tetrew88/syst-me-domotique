const inhabitantsScreen = document.getElementById("inhabitantsScreen");
const guestsScreen = document.getElementById('guestsScreen');

list_inhabitants(socket, inhabitantsScreen);
list_guests(socket, guestsScreen);