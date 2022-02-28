from .moduleEvent import *

class Door_WindowEvent(ModuleEvent):
	"""
		classes representing an door evenement

			Attributes:
				door/window state

			property:

			method:

	"""

	def __init__(self, moduleNode,datetime, door_windowState, eventType = "window/door event"):
        ModuleEvent.__init__(self, moduleNode, eventType, datetime)
        self.door_windowState = door_windowState

class Door_WindowOpening(Door_WindowEvent):

	def __init__(self, moduleNode, datetime):
       	Door_WindowEvent.__init__(self, moduleNode, datetime, 'open', "door/window opening")


class Door_WindowClosing(Door_WindowEvent):

	def __init__(self, moduleNode, datetime):
        Door_WindowEvent.__init__(self, moduleNode, datetime, 'closed', "door/window closing")