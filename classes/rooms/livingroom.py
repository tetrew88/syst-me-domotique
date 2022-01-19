from .room import *


class Livingroom(Room):
    """
        class representing an livingroom

            Attributes:

            property:

            method:
    """

    def __init__(self, id, name, automationNetwork):
        Room.__init__(self, id, name, "livingroom", automationNetwork)