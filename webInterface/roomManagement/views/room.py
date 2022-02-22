from django.http import HttpResponse
from django.shortcuts import render

def room(request, roomId):
	template = 'room.html'

	room = 'bedroom'
	roomName = 'chambre de donovan'
	modulesList = ['bulb', 'multiSensor', "bulb", 'bulb', 'bulb']

	return render(request, template, {'room': room,
		'indicatorColor': indicatorColor,
		'roomName': roomName,
		'modulesList': modulesList,
		'roomId': roomId})