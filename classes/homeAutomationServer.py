import eventlet
import socketio

from .homeAutomationSystem import *

socketIoServer = socketio.Server(cors_allowed_origins="*")
app = socketio.WSGIApp(socketIoServer)

class homeAutomationServer:
	"""
		class representing the home automation server:

			attributes:
				home automation système

			property:

			methods:
	"""

	print(socketIoServer.__dict__)
	print(app.__dict__)

	def __init__(self, controllerPath, zwaveConfigPath, logPath):
		self.homeAutomationSystem = HomeAutomationSystem(controllerPath, zwaveConfigPath, logPath)


	def start(self):
		eventlet.wsgi.server(eventlet.listen(('', 5000)), app)

		self.homeAutomationSystem.start()

	@socketIoServer.event
	def connect(sid, environ, auth):
		print('connect ', sid)


#eesayer de nmettre la section eventlet dans home automation system pour que l'attente ce fasse au niveau du systeme et non du sserver