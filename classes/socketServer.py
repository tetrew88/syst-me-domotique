import eventlet
import socketio


class SocketServer:
	"""
		class representing the home automation server:

			attributes:
				home automation système

			property:

			methods:
	"""


	def __init__(self):
		self.socketIoServer = socketio.Server(cors_allowed_origins="*")
		self.app = socketio.WSGIApp(self.socketIoServer)
		self.test = "!!!!!!!"


	def start(self):
		eventlet.wsgi.server(eventlet.listen(('', 5000)), app)

	def on(self, event, callback):
        self.socketIO.on(event, callback)
        print("test")




#eesayer de nmettre la section eventlet dans home automation system pour que l'attente ce fasse au niveau du systeme et non du sserver

"""class Broadcaster(object):
    port = 8080
    host = "localhost"

    def __init__(self, port=8080, host="localhost"):
        self.port = port
        self.host = host
        self.socketIO = SocketIO(host, int(port))

        self.socketIO.on("ack", self.logACK)

    def logACK(self, data):
        print("Acknowledgement received for %s" % data['original'])

    def emit(self, event, data):
        self.socketIO.emit(event, data)

    def on(self, event, callback):
        self.socketIO.on(event, callback)

    def wait(self, millis):
        self.socketIO.wait(millis)

    def wait_forever(self):
        self.socketIO.wait()"""