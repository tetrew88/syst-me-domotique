from django.http import HttpResponse
from django.shortcuts import render

def room(request, roomId):
	template = 'room.html'

	return render(request, template, {'roomId': roomId})