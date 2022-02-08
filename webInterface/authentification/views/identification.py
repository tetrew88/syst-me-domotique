from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
def identification(request):
	return render(request, 'identification.html')