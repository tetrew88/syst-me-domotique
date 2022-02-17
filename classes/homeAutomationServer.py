import eventlet
import socketio

socketIoServer = socketio.Server(cors_allowed_origins="*")
app = socketio.WSGIApp(socketIoServer, object)

class HomeAutomationServer(socketio.Namespace):
	"""
		class representing the home automation server:

			attributes:
				home automation système

			property:

			methods:
	"""

	homeAutomationSystem = False


	def __init__(self):
		socketio.Namespace.__init__(self, '/HomeAutomationServer')


	def start(self):
		homeAutomationSystem.start()
		eventlet.wsgi.server(eventlet.listen(('', 5000)), app)

	def stop(self):
			socketIoServer.stop()
			homeAutomationSystem.stop()


	@staticmethod
	def set_home_automation_system(homeAutomationSystem):
		HomeAutomationServer.homeAutomationSystem = homeAutomationSystem



	@socketIoServer.event
	def connect(sid, environ, auth):
		print('connect ', sid)


	@socketIoServer.event(namespace='/test')
	def test(sid, data):
		print(data)
		print(HomeAutomationServer.homeAutomationSystem.name)

socketIoServer.register_namespace(HomeAutomationServer())

#eesayer de nmettre la section eventlet dans home automation system pour que l'attente ce fasse au niveau du systeme et non du sserver