from django.http import HttpResponse
from django.shortcuts import render

def module(request, moduleId):
	template = 'module.html'

	return render(request, template, {'moduleId': moduleId})