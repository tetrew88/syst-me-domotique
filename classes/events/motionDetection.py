from .moduleEvent import *


class MotionDetection(ModuleEvent):
    """
        class representing an motion detection event

            attributes:

            property:

            method:
    """

    def __init__(self, moduleNode, datetime):
        ModuleEvent.__init__(self, moduleNode, "motion detection", datetime)


    def __str__(self):
        datetimeAlert = []
        dateTimeAlert = self.dateTime.split(" ")
        return "un mouvement as été détecter le {} a {}".format(dateTimeAlert[0], dateTimeAlert[1])