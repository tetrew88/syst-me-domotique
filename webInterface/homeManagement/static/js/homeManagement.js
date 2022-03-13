const roomsScreen = document.getElementById("roomsScreen");
const inhabitantsScreen = document.getElementById("inhabitantsScreen");
const guestsScreen = document.getElementById('guestsScreen');
const eventsScreen = document.getElementById('eventsScreen');

list_rooms(socket, roomsScreen, 3);
list_inhabitants(socket, inhabitantsScreen);
list_guests(socket, guestsScreen);
list_events(socket, eventsScreen);