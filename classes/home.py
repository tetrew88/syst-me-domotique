from .network import *

from .homeDatabase import *

from .events.event import *
from .events.motionDetection import *

from .rooms.room import *
from .rooms.bedroom import *
from .rooms.kitchen import *
from .rooms.bathroom import *
from .rooms.livingroom import *

from .users.profil import *
from .users.inhabitant import *
from .users.guest import *

import time

class Home:
    """
        class representing an house

            attributes:
                home database


                alarm: True = active/False = inactive

            property:
                id
                rooms
                inhabitants
                guest
                evenements
                automation modules

            method:
                add an room
                add an module
                add habitant
                add guest

                del an room
                del an module
                del an habitant
                del an guest
    """

    def __init__(self, controllerPath, zwaveConfigPath, logPath):
        self.homeDatabase = HomeDatabase()
        self.homeAutomationNetwork = Network(controllerPath, zwaveConfigPath, logPath)

        self.alarm = False


    @property
    def id(self):
        if self.homeAutomationNetwork != False and self.homeAutomationNetwork.isReady:
            return self.homeAutomationNetwork.homeId

    @property
    def rooms(self):
        tmpRooms = rooms = []
        if self.homeDatabase.db_connection != False:
            tmpRooms = self.homeDatabase.get_rooms_list()

            for room in tmpRooms:
                if room[2].lower() == "bathroom":
                    tmpRoom = Bathroom(room[0], room[1], self.homeAutomationNetwork)
                elif room[2].lower() == "bedroom":
                    tmpRoom = Bedroom(room[0], room[1], self.homeAutomationNetwork)
                elif room[2].lower() == "kitchen":
                    tmpRoom = Kitchen(room[0], room[1], self.homeAutomationNetwork)
                elif room[2].lower() == "livingroom":
                    tmpRoom = Livingroom(room[0], room[1], self.homeAutomationNetwork)
                else:
                    tmpRoom = Room(room[0], room[1], room[2])

                rooms.append(tmpRoom)

        return rooms

    @property
    def inhabitants(self):

        tmpInhabitants = inhabitants = []

        if self.homeDatabase.db_connection != False:
            tmpInhabitants = self.homeDatabase.get_Inhabitants_list()

            for inhabitant in tmpInhabitants:
                tmpProfil = self.homeDatabase.get_profil(inhabitant[1])[0]

                profil = Profil(tmpProfil[0], tmpProfil[1], tmpProfil[2])

                tmpInhabitant = Inhabitant(inhabitant[0], profil)

                inhabitants.append(tmpInhabitant)

        return inhabitants

    @property
    def guests(self):
        tmpGuests = guests = []

        if self.homeDatabase.db_connection != False:
            tmpGuests = self.homeDatabase.get_guests_list()

            for guest in tmpGuests:
                tmpProfil = self.homeDatabase.get_profil(guest[1])[0]

                profil = Profil(tmpProfil[0], tmpProfil[1], tmpProfil[2])

                tmpGuest = Guest(guest[0], profil)

                guests.append(tmpGuest)

        return guests

    @property
    def events(self):
        return self.homeAutomationNetwork.eventList

    @property
    def automationModules(self):
        return self.homeAutomationNetwork.modulesList


    def add_room(self, room):
        self.homeDatabase.add_room(room)

    def add_inhabitant(self, profil):
        self.homeDatabase.add_inhabitant(profil)

    def add_guest(self, profil):
        self.homeDatabase.add_guest(profil)

    def add_automation_module(self, name, location):
        self.homeAutomationNetwork.add_module(name, location)


    def del_room(self, roomId):
        self.homeDatabase.del_room(roomId)