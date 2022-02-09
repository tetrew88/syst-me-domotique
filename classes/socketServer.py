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



	def start(self):
		eventlet.wsgi.server(eventlet.listen(('', 5000)), app)

	def connect(sid, environ, auth):
		print('connect ', sid)


socketIoServer.register_namespace(SocketServer('/test'))


#eesayer de nmettre la section eventlet dans home automation system pour que l'attente ce fasse au niveau du systeme et non du sserver