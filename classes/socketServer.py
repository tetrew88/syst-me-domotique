import eventlet
import socketio

socketIoServer = socketio.Server(cors_allowed_origins="*")
app = socketio.WSGIApp(socketIoServer)

class SocketServer(socketio.ClientNamespace:
	"""
		class representing the home automation server:

			attributes:
				home automation système

			property:

			methods:
	"""

	print(socketIoServer.__dict__)
	print(app.__dict__)

	def __init__(self):
		self.test="...............!!!!!!!!!!........"


	def start(self):
		socketIoServer.register_namespace(MyCustomNamespace('/chat'))
		eventlet.wsgi.server(eventlet.listen(('', 5000)), app)

	def connect(sid, environ, auth):
		print('connect ', sid)
		print(self.test)


#eesayer de nmettre la section eventlet dans home automation system pour que l'attente ce fasse au niveau du systeme et non du sserver