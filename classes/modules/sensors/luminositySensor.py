from .sensor import *

class LuminositySensor(Sensor):
    """
        class representing an luminosity sensor

            Attributes

            property:

            Method:
    """

    def __init__(self, moduleNode):
        Sensor.__init__(self, moduleNode)


    @property
    def luminosity(self):
        for element in self.moduleNode.get_sensors():
            if self.moduleNode.get_sensors()[element].label == 'Luminance':
                return self.moduleNode.get_sensors()[element].data