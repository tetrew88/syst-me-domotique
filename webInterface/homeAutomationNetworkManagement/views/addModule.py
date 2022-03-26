from django.http import HttpResponse
from django.shortcuts import render

def add_module(request):
	template = "addModule.html"

	return render(request, template)