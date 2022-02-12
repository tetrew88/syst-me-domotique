from django.http import HttpResponse
from django.shortcuts import render

def module_listing(request):
	template = "moduleListing.html"

	return render(request, template)