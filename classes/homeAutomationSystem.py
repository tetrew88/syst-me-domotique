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
        self.running = False
        self.home = Home(controllerPath, zwaveConfigPath, logPath)


    def start(self):
        self.home.homeDatabase.connect()
        self.home.homeAutomationNetwork.load()
        self.home.homeAutomationNetwork.start()
        self.running = True

    def stop(self):
        self.home.homeAutomationNetwork.stop()
        self.home.homeDatabase.disconnect()
        self.running = False


    def get_home(self):
        return self.home

    def get_home_rooms(self):
        return self.home.rooms

    def get_home_inhabitants(self):
        return self.home.inhabitants

    def get_home_guest(self):
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