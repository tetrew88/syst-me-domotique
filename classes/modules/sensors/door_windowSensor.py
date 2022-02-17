from .sensor import *

class Door_WindowsSensor(Sensor):
	"""
		classes representing an door/windows sensor

			Attributes:

			property:

			Method:
	"""

	def __init__(self, moduleNode):
        Sensor.__init__(self, moduleNode)


    @property
    def door_windowState(self):
    	pass