from django.http import HttpResponse
from django.shortcuts import render

def del_inhabitant(request):
	template = "delRoom.html"

	return render(request, template)