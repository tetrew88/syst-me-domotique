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

    def __init__(self, moduleNode, type, dateTime):
        Event.__init__(self, type, dateTime, moduleNode.location)
        self.moduleNode = moduleNode

    def __str__(self):
        return "type: {}\tdatetime: {}\tlocation: {}".format(
            self.type,
            self.dateTime,
            self.location
        )