from .home import *

class HomeAutomationSystem:
    """
        class representing the home automation system

            Attributes:
                running
                home

            property:

            method:
                start
                stop

                get house
                get rooms
                get home Inhabitant
                get home guest

                get modules
                get events
                get home automation network

                add room
                add inhabitant
                add guest
                add module

                del room
                del inhabitant
                del guest
                del module
    """

    def __init__(self, controllerPath, zwaveConfigPath, logPath):
        self.name = 'test!!!!!'
        self.running = False
        self.home = Home(controllerPath, zwaveConfigPath, logPath)
        self.socketIoServer = SocketServer()


    def start(self):
        self.home.homeDatabase.connect()
        self.running = True

    def stop(self):
        self.home.stop_automation_network()
        self.home.homeDatabase.disconnect()
        self.running = False


    def get_home(self):
        return self.home

    def get_home_rooms(self):
        return self.home.rooms

    def get_home_inhabitants(self):
        return self.home.inhabitants

    def get_home_guests(self):
        return self.home.guests

    def get_home_automation_modules(self):
        return self.home.automationModules

    def get_event(self):
        return self.home.events

    def get_home_automation_network(self):
        return self.home.homeAutomationEngine.network


    def add_home_room(self, room):
        self.home.add_room(room)

    def add_home_inhabitant(self, profil):
        self.home.add_inhabitant(profil)

    def add_home_guest(self, profil):
        self.home.add_guest(profil)

    def add_home_automation_module(self, name, location):
        self.home.add_automation_module(name, location)


    def del_home_room(self, roomId):
        self.home.del_room(roomId)

    def del_home_inhabitant(self, inhabitantId):
        self.home.del_inhabitant(inhabitantId)

    def del_home_guest(self, guestId):
        self.home.del_guest(guestId)

    def del_home_automation_module(self):
        self.home.del_automation_module()


    def set_home_room_name(self, roomId, newName):
        self.home.set_room_name(roomId, newName)

    def set_home_room_type(self, roomId, newType):
        self.home.set_room_type(roomId, newType)

    def set_home_inhabitant_last_name(self, inhabitantId, newLastName):
        self.home.set_inhabitant_last_name(inhabitantId, newLastName)

    def set_home_inhabitant_first_name(self, inhabitantId, newFirstName):
        self.home.set_inhabitant_first_name(inhabitantId, newFirstName)

    def set_home_guest_last_name(self, guestId, newLastName):
        self.home.set_guest_last_name(guestId, newLastName)

    def set_home_guest_first_name(self, guestId, newFirstName):
        self.home.set_guest_first_name(guestId, newFirstName)


    def heal_automation_network(self):
        self.home.heal_network()

    def destroy_automation_network(self):
        self.home.destroy_network()

    def save_home_automation_network_modification(self):
        self.home.save_network_modification()