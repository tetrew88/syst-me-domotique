from .room import *


class Bathroom(Room):
    """
        class representing an livingroom

            Attributes:
                type
            property:

            method:
    """

    def __init__(self, id, name, automationNetwork):
        Room.__init__(self, id, name, 'bathroom', automationNetwork)