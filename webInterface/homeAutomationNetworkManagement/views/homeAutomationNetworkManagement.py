from django.http import HttpResponse
from django.shortcuts import render

def home_automation_network_management(request):
	template = "homeAutomationNetworkManagement.html"

	return render(request, template)