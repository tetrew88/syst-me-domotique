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
                home automation network (z-wave network)
                alarm: True = active/False = inactive

            property:
                id
                rooms
                inhabitants
                guest
                evenements
                automation modules

            method:
                start automation network
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

    def start_automation_network(self):
        self.homeAutomationNetwork.load()
        self.homeAutomationNetwork.start()

    def stop_automation_network(self):
        self.homeAutomationNetwork.stop()


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


    def del_inhabitant(self, inhabitantId):
        self.homeDatabase.del_inhabitant(inhabitantId)

    def del_guest(self, guestId):
        self.homeDatabase.del_guest(guestId)

    def del_automation_module(self):
        self.homeAutomationNetwork.del_module()


    def set_room_name(self, roomId, newName):
        self.homeDatabase.set_room_name(roomId, newName)

    def set_room_type(self, roomId, newType):
        self.homeDatabase.set_room_type(roomId, newType)

    def set_inhabitant_first_name(self, inhabitantId, newFirstName):
        self.homeDatabase.set_inhabitant_first_name(inhabitantId, newFirstName)

    def set_inhabitant_last_name(self, inhabitantId, newLastName):
        self.homeDatabase.set_inhabitant_last_name(inhabitantId, newLastName)

    def set_guest_first_name(self, guestId, newFirstName):
        self.homeDatabase.set_guest_first_name(guestId, newFirstName)

    def set_guest_last_name(self, guestId, newLastName):
        self.homeDatabase.set_guest_last_name(guestId, newLastName)

    def get_room(self, roomId):
        tmpRoom = self.homeDatabase.get_room(roomId)
        room = False

        if tmpRoom[2].lower() == "bathroom":
            room = Bathroom(tmpRoom[0], tmpRoom[1], self.homeAutomationNetwork)
        elif tmpRoom[2].lower() == "bedroom":
            room = Bedroom(tmpRoom[0], tmpRoom[1], self.homeAutomationNetwork)
        elif tmpRoom[2].lower() == "kitchen":
            room = Kitchen(tmpRoom[0], tmpRoom[1], self.homeAutomationNetwork)
        elif tmpRoom[2].lower() == "livingroom":
            room = Livingroom(tmpRoom[0], tmpRoom[1], self.homeAutomationNetwork)
        else:
            room = Room(tmpRoom[0], tmpRoom[1], tmpRoom[2])

        return room

    def get_automation_module(self, moduleId):
        module = False

        print(self.automationModules)

        for element in self.automationModules:
            print(element.id)
            print(module.id)

            if element.id == moduleId:
                module = element
                break

        return module


    def heal_network(self):
        self.homeAutomationNetwork.heal()

    def destroy_network(self):
        self.homeAutomationNetwork.destroy()

    def save_network_modification(self):
        self.homeAutomationNetwork.save_modification()


    def serialize(self):
        data = {}

        data = {'id': self.id,
        'rooms': [],
        'inhabitants': [],
        'guest': [],
        'events': [],
        'automationModules': []
        }

        rooms = []
        for room in self.rooms:
            tmp = rooms.serialize()

            rooms.append(tmp)
        data['rooms'] = rooms

        inhabitants = []
        for inhabitant in self.inhabitants:
            tmp = inhabitant.serialize()

            inhabitants.append(tmp)
        data['inhabitants'] = inhabitants

        guests = []
        for guest in self.guests:
            tmp = guest.serialize()

            guests.append(tmp)
        data['guests'] = guests

        events = []
        for event in self.events:
            tmp = event.serialize()

            events.append(tmp)
        data['events'] = events

        automationModules = []
        for automationModule in self.automationModules:
            tmp = automationModule.serialize()

            inhabitants.append(tmp)
        data['automationModules'] = automationModules

        return data
