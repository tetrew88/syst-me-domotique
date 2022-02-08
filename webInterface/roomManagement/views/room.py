from django.http import HttpResponse
from django.shortcuts import render

def room(request):
	template = 'room.html'

	room = 'bedroom'
	roomName = 'chambre de donovan'
	temp = 19
	lum = 5
	modulesList = ['bulb', 'multiSensor', "bulb", 'bulb', 'bulb']

	indicatorColor = ""

	if temp < 0:
		indicatorColor = "blue"
	elif temp > 0 and temp < 20:
		indicatorColor = "green"
	else:
		indicatorColor = "red"

	return render(request, template, {'room': room,
		'temp': temp,
		'lum': lum,
		'indicatorColor': indicatorColor,
		'roomName': roomName,
		'modulesList': modulesList})