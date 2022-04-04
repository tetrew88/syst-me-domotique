from django.http import HttpResponse
from django.shortcuts import render

def del_room(request):
	template = "delRoom.html"

	return render(request, template)