from django.http import HttpResponse
from django.shortcuts import render

def profil_listing(request):
	template = "profilListing.html"

	return render(request, template)