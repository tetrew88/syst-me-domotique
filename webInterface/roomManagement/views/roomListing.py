from django.http import HttpResponse
from django.shortcuts import render

def room_listing(request):
	template = 'roomListing.html'
	xMin = 0
	xMax = 2

	rooms = ["kitchen", "bedroom", "livingroom", 'bathroom', 'bathroom', 'bathroom']
	tmpRooms = []

	return render(request, template, {'roomsList': rooms, "tmpRooms": tmpRooms, "xMin": xMin, "xMax": xMax})