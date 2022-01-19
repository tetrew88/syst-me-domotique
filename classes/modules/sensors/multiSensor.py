from .sensor import *

class MultiSensor(Sensor):
    """
            class representing an muti sensor:

                attributes:
                    sensors (dict of sensors)

                property:

                method:
        """

    def __init__(self, modulesNodes, sensors):
        Sensor.__init__(self, modulesNodes)
        self.sensors = sensors
