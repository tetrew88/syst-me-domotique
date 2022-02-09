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

	def __init__(self):
		self.socketIoServer = socketIoServer
		self.socketIoApp = socketio.WSGIApp(self.socketIoServer)

	@socketIoServer.event
	def connect(sid, environ, auth):
		print('connect ', sid)