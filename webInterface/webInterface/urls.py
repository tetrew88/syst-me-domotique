"""webInterface URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path
from django.conf.urls import url

from authentification.views.identification import identification

from roomManagement.views.roomListing import room_listing
from roomManagement.views.room import room

from profilManagement.views.profilListing import profil_listing
from profilManagement.views.profil import profil

from moduleManagement.views.moduleListing import module_listing

from homeManagement.views.homeManagement import home_management

from homeAutomationNetworkManagement.views.homeAutomationNetworkManagement import home_automation_network_management

from moduleManagement.views.module import module

urlpatterns = [
    url(r'^$', room_listing),
    path('admin/', admin.site.urls),
    path('identification/', identification),
    path('/index', room_listing),
    path('roomListing/', room_listing),
    path('profilListing/', profil_listing),
    path('moduleListing/', module_listing),
    path('homeManagement/', home_management),
    path('homeAutomationNetworkManagement/', home_automation_network_management),
    path('room/<int:roomId>/', room),
    path('module/<int:moduleId>/', module),
    path('inhabitant/<int:profilId>/', profil),
    path('guest/<int:profilId>/', profil),
]
