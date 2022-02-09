import eventlet
import socketio

socketIoServer = socketio.Server()
app = socketio.WSGIApp(socketIoServer)

class SocketServer:
	"""
		class representing an socket server:

			attributes:
				socket io server
				socket io app

			property:

			methods:
	"""

	print(socketIoServer.__dict__)
	print(app.__dict__)

	def __init__(self):
		pass


	def start(self):
		eventlet.wsgi.server(eventlet.listen(('', 5000)), app)


	@socketIoServer.event
	def connect(sid, environ, auth):
		print('connect ', sid)


#eesayer de nmettre la section eventlet dans home automation system pour que l'attente ce fasse au niveau du systeme et non du sserver