import eventlet
import socketio

class SocketServer:
	"""
		class representing an socket server:

			attributes:
				socket io server
				socket io app

			property:

			methods:
	"""

	socketIoServer = socketio.Server()
	app = socketio.WSGIApp(socketIoServer)

	eventlet.wsgi.server(eventlet.listen(('', 5000)), app)

	print(socketIoServer.__dict__)
	print(app.__dict__)

	def __init__(self):
		pass

	@socketIoServer.event
	def connect(sid, environ, auth):
		print('connect ', sid)