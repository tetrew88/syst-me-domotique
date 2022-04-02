from django.http import HttpResponse
from django.shortcuts import render

def add_guest(request):
	template = "addGuest.html"

	return render(request, template)