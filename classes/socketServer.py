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
	app = socketio.WSGIApp(self.socketIoServer)

	def __init__(self):
	@socketIoServer.event
	def connect(sid, environ, auth):
		print('connect ', sid)