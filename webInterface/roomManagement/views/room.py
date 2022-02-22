from django.http import HttpResponse
from django.shortcuts import render

def room(request, roomId):
	template = 'room.html'
	modulesList = ['bulb', 'multiSensor', "bulb", 'bulb', 'bulb']

	return render(request, template, {'modulesList': modulesList,
		'roomId': roomId})