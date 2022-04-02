from django.http import HttpResponse
from django.shortcuts import render

def add_inhabitant(request):
	template = "addInhabitant.html"

	return render(request, template)