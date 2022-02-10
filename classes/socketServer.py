import eventlet
import socketio

socketIoServer = socketio.Server(cors_allowed_origins="*")
app = socketio.WSGIApp(socketIoServer)

class SocketServer(socketio.Namespace):
	"""
		class representing the home automation server:

			attributes:
				home automation système

			property:

			methods:
	"""


	def __init__(self, **kwargs):
		socketio.Namespace.__init__()
		self.test = "!!!!!!!"


	def start(self):
		eventlet.wsgi.server(eventlet.listen(('', 5000)), app)


	@socketIoServer.event
	def connect(sid, environ, auth):
		print('connect ', sid)


	@socketIoServer.event(namespace='/test')
	def test(self, sid, data):
		print(data)

socketIoServer.register_namespace(SocketServer('/test'))

#eesayer de nmettre la section eventlet dans home automation system pour que l'attente ce fasse au niveau du systeme et non du sserver