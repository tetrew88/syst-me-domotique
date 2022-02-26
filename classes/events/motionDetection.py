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