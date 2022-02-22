from ..module import *


class Sensor(Module):
    """
        class representing an sensor:

            attributes:

            property:

            method:
    """

    def __init__(self, moduleNode):
        Module.__init__(self, moduleNode)
        self.type = 'sensor'