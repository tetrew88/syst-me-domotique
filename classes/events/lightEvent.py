from .moduleEvent import *

class LightEvent(ModuleEvent):
	"""
		classe representing an light evenement:

			attributes:
				light state

			property:


			method:
	"""

	def __init__(self, moduleNode,datetime, bulbState, eventType = "light evenement"):
		ModuleEvent.__init__(self, moduleNode, eventType, datetime)
		self.lightState = bulbState


class LightOn(LightEvent):
	def __init__(self, moduleNode, datetime):
		LightEvent.__init__(self, moduleNode, datetime, 'on', 'turn on light')

	def __str__(self):
		return "[{}]: l'ampoule n°{} a été allumé".format(self.dateTime, self.moduleNode.node_id)

class LightOff(LightEvent):
	def __init__(self, moduleNode, datetime):
		LightEvent.__init__(self, moduleNode, datetime, 'off', 'turn off light')

	def __str__(self):
		return "[{}]: l'ampoule n°{} a été éteinte".format(self.dateTime, self.moduleNode.node_id)
