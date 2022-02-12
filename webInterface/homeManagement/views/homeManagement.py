from django.http import HttpResponse
from django.shortcuts import render

def home_management(request):
	template = "homeManagement.html"

	return render(request, template)