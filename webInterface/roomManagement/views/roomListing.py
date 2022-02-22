from django.http import HttpResponse
from django.shortcuts import render

def room_listing(request):
	template = 'roomListing.html'

	return render(request, template)