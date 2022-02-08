from django.http import HttpResponse
from django.shortcuts import render

def room_listing(request):
	template = 'roomListing.html'

	rooms = ["kitchen", "bedroom", "livingroom", 'bathroom']

	return render(request, template, {'roomsList': rooms})