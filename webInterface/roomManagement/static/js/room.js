const url = new URL(window.location.href);

let parameters = new URLSearchParams(url.search);

let roomId = 0;

if(parameters.has('roomId'))
{
	roomId = parameters.get('roomId');
}

console.log(roomId);