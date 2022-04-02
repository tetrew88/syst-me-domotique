from django.http import HttpResponse
from django.shortcuts import render

def add_room(request):
	template = "addRoom.html"

	return render(request, template)