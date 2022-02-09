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

	def __init__(self):
		self.socketIoServer = socketio.Server()
		self.socketIoApp = socketio.WSGIApp(self.socketIoServer)

	@sio.event
	def connect(sid, environ, auth):
		print('connect ', sid)