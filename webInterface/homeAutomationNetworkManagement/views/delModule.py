from django.http import HttpResponse
from django.shortcuts import render

def del_module(request):
	template = "delModule.html"

	return render(request, template)