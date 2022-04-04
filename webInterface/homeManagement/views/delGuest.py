from django.http import HttpResponse
from django.shortcuts import render

def del_guest(request):
	template = "delGuest.html"

	return render(request, template)