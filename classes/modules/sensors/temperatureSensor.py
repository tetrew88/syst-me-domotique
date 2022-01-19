from .sensor import *

class TemperatureSensor(Sensor):
    """
            class representing an temperature sensor:

                attributes:

                property:

                method:
        """

    def __init__(self, modulesNodes):
        Sensor.__init__(self, modulesNodes)


    @property
    def temperature(self):
        for element in self.moduleNode.get_sensors():
            if self.moduleNode.get_sensors()[element].label == 'Temperature':
                return self.moduleNode.get_sensors()[element].data

