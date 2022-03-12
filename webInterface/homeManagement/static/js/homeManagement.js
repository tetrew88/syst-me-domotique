const roomsScreen = document.getElementById("roomsScreen");
const inhabitantsScreen = document.getElementById("inhabitantsScreen");
guestsScreen = document.getElementById('guestsScreen');

listRooms(socket, roomsScreen, 3);
list_inhabitants(socket, inhabitantsScreen);
list_guests(socket, guestsScreen);