from .sensor import *

class MotionSensor(Sensor):
    """
        class representing an motion sensor

            Attributes:

            property:

            method:
    """

    def __init__(self, moduleNode):
        Sensor.__init__(self, moduleNode)