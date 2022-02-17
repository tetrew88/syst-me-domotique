import eventlet
import socketio

import json

from classes.homeAutomationSystem import *

socketIoServer = socketio.Server(cors_allowed_origins="*")
app = socketio.WSGIApp(socketIoServer, object)

class HomeAutomationServer(socketio.Namespace):
	"""
		class representing the home automation server:

			attributes:
				home automation système

			property:

			methods:
				start
				stop

				set home automation system

			server event:
				connection
				get
	"""

	homeAutomationSystem = False


	def __init__(self):
		socketio.Namespace.__init__(self, '/HomeAutomationServer')


	def start(self):
		HomeAutomationServer.homeAutomationSystem.start()
		eventlet.wsgi.server(eventlet.listen(('', 5000)), app)

	def stop(self):
			socketIoServer.stop()
			homeAutomationSystem.stop()


	@staticmethod
	def set_home_automation_system(homeAutomationSystem):
		HomeAutomationServer.homeAutomationSystem = homeAutomationSystem



	@socketIoServer.event(namespace='/HomeAutomationServer')
	def connect(sid, environ, auth):
		print('connect ', sid)


	@socketIoServer.event(namespace='/HomeAutomationServer')
	def get_rooms_list(sid, data):
		outputData = {}

		rooms = []
		for room in HomeAutomationServer.homeAutomationSystem.get_home_rooms():
			rooms.append(room.serialize())

		print(rooms)

		self.emit('post_rooms_list', {'data', json.dumps(rooms)}, namespace='/HomeAutomationServer')

	def emitData(self):



socketIoServer.register_namespace(HomeAutomationServer())

#eesayer de nmettre la section eventlet dans home automation system pour que l'attente ce fasse au niveau du systeme et non du sserver