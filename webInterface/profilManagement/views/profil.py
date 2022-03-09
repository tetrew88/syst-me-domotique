from django.http import HttpResponse
from django.shortcuts import render

def profil(request, profilId):
	template = "profil.html"

	return render(request, template, {"profilId": profilId})