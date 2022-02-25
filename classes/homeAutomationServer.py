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
		rooms = []
		for room in HomeAutomationServer.homeAutomationSystem.get_home_rooms():
			rooms.append(room.serialize())

		print(rooms)
		
		socketIoServer.emit('post_rooms_list', {'data': rooms}, namespace='/HomeAutomationServer')


	@socketIoServer.event(namespace='/HomeAutomationServer')
	def get_room(sid, data):
		room = HomeAutomationServer.homeAutomationSystem.get_room(data)
		room = room.serialize()

		print(room)

		socketIoServer.emit('post_room', {"data": room}, namespace='/HomeAutomationServer')


	@socketIoServer.event(namespace='/HomeAutomationServer')
	def get_inhabitants_list(sid, data):
		inhabitants = []

		for inhabitant in HomeAutomationServer.homeAutomationSystem.get_home_inhabitants():
			inhabitants.append(inhabitant.serialize())

		print(inhabitants)

		socketIoServer.emit('post_inhabitants_list', {"data": inhabitants}, namespace='/HomeAutomationServer')


	@socketIoServer.event(namespace='/HomeAutomationServer')
	def get_guests_list(sid, data):
		guests = []

		for guest in HomeAutomationServer.homeAutomationSystem.get_home_guests():
			guests.append(guest.serialize())

		print(guests)

		socketIoServer.emit('post_guests_list', {"data": guests}, namespace='/HomeAutomationServer')

	@socketIoServer.event(namespace='/HomeAutomationServer')
	def set_on_light(sid, data):
		if type(data) == list():
			bulbs = []

			for module in HomeAutomationServer.homeAutomationSystem.get_home_automation_modules():
				for moduleId in data:
					if module.id == moduleId:
						bulbs.append(module)
						break
					else:
						pass

			for bulb in bulbs:
				if bulb.lightUp:
					bulb.off()
				else:
					bulb.off()

		elif type(data) == int():
			bulb = False

			for module in HomeAutomationServer.homeAutomationSystem.get_home_automation_modules():
				if module.id == data:
					bulb = module

			if bulb.lightUp:
				bulb.off()
			else:
				bulb.off()



socketIoServer.register_namespace(HomeAutomationServer())