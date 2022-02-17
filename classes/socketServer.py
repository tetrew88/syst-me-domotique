import eventlet
import socketio

socketIoServer = socketio.Server(cors_allowed_origins="*")
app = socketio.WSGIApp(socketIoServer, object)

class SocketServer(socketio.Namespace):
	"""
		class representing the home automation server:

			attributes:
				home automation système

			property:

			methods:
	"""

	homeAutomationSystem = False


	def __init__(self):
		socketio.Namespace.__init__(self, '/test')


	def start(self):
		#homeAutomationSystem.start()
		eventlet.wsgi.server(eventlet.listen(('', 5000)), app)

	def stop(self):
			socketIoServer.stop()
			homeAutomationSystem.stop()


	@staticmethod
	def set_home_automation_system(homeAutomationSystem):
		SocketServer.homeAutomationSystem = homeAutomationSystem



	@socketIoServer.event
	def connect(sid, environ, auth):
		print('connect ', sid)


	@socketIoServer.event(namespace='/test')
	def test(sid, data):
		print(SocketServer.homeAutomationSystem.name)

socketIoServer.register_namespace(SocketServer())

#eesayer de nmettre la section eventlet dans home automation system pour que l'attente ce fasse au niveau du systeme et non du sserver