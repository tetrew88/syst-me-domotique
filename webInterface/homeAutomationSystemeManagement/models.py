from django.db import models
from roomManagement.models import Room

class Home(models.Model):
    homeId = models.IntegerField()

    rooms = models.ManyToManyField(Room)
    #inhabitants = models.ManyToManyField(, on_delete=models.CASCADE)
    #guest = models.ManyToManyField(, on_delete=models.CASCADE)
    #event = models.ManyToManyField(, on_delete=models.CASCADE)
    #automationModules =  = models.ManyToManyField(, on_delete=models.CASCADE)


    def __str__(self):
        return 'home Id: {}'.format(self.homeId)


    def get_rooms_list(self):
        return self.rooms.all()


class HomeAutomationSystem(models.Model):
	home = models.ForeignKey(Home, on_delete=models.CASCADE)

	def get_rooms_list(self):
		return home.rooms.get_rooms_list()