from .sensor import *

class Door_WindowSensor(Sensor):
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
		valueId = False

		for value in self.moduleNode.get_values():
			if self.moduleNode.get_values()[value].label == 'Access Control':
				valueId = value
				break

		if valueId != False:
			if self.moduleNode.get_values()[value].data == 23:
				return 'closed'
			elif self.moduleNode.get_values()[value].data == 22:
				return 'open'
		else:
			return 'None'