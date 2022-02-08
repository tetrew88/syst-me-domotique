from django.db import models

class Room(models.Model):
	idNumber = models.IntegerField()
	name = models.CharField(max_length=50)
	roomType = models.CharField(max_length=50)
    #content = ManyToManyField(on_delete=models.CASCADE)
	temperature = models.IntegerField()
	presence = models.BooleanField()
	luminosity = models.IntegerField()
	#evenement = ManyToManyField(on_delete=models.CASCADE)


	def __str__(self):
		return 'id: {}\nname: {}\ntype: {}\ntemperature: {}\npresence: {}\nluminosity: {}'.format(self.idNumber, self.name, 
			self.roomType, self.temperature, self.presence, self.luminosity)