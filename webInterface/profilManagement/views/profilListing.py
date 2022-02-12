from django.http import HttpResponse
from django.shortcuts import render

def profil_listing(request):
	template = "profilListing.html"

	inhabitantsList = ["donovan", "gerard", "tom"]

	guestsList = ["jean", "jacque"]

	return render(request, template, {"inhabitantsList": inhabitantsList,
		"guestsList": guestsList})