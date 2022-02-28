from .event import *

class ModuleEvent(Event):
    """
        class representing an event emitted by an module

        attributes:
            moduleNode
            type(motion detection, controller, ...)

        property:
            location

        method:
    """

    def __init__(self, moduleNode, Type, dateTime):
        Event.__init__(self, Type, dateTime, moduleNode.location)
        self.moduleNode = moduleNode