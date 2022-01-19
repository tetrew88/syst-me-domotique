from classes.modules import *
from classes.modules.networkController import *

from classes.modules.controller import *

from classes.modules.bulb import *
from classes.modules.rgbBulb import *

from classes.modules.sensors.sensor import *
from classes.modules.sensors.multiSensor import *

from classes.modules.sensors.motionSensor import *
from classes.modules.sensors.luminositySensor import *
from classes.modules.sensors.SeismicIntensitySensor import *
from classes.modules.sensors.temperatureSensor import *


class Room:
    """
        class representig an room

            Attributes:
                id
                name
                type (bedroom, lounge, bathroom, ...)

                domotique Network

            property:
                content

                temperature
                presence: if an presence was detect
                luminosity

                evenement

            method:
                add automation module
    """


    def __init__(self, id, name, type, automationNetwork=False):
        self.id = int(id)
        self.name = name
        self.type = type

        self.automationNetwork = automationNetwork

    @property
    def content(self):
        modules = []

        for module in self.automationNetwork.modulesList:
            if module.location != '':
                if int(module.location) == self.id:
                    modules.append(module)
                else:
                    pass

        return modules

    @property
    def temperature(self):
        temperatureSensor = False

        for module in self.content:
            if isinstance(module, TemperatureSensor):
                return module.temperature
            elif isinstance(module, MultiSensor):
                if 'temperature' in module.sensors.keys():
                    temperatureSensor = module.sensors['temperature']

                    return temperatureSensor.temperature

            else:
                return False

    @property
    def luminosity(self):
        luminositySensor = False

        for module in self.content:
            if isinstance(module, LuminositySensor):
                return module.luminosity
            elif isinstance(module, MultiSensor):
                if 'temperature' in module.sensors.keys():
                    luminositySensor = module.sensors['luminosity']

                    return luminositySensor.luminosity

            else:
                return False

    @property
    def events(self):
        events = []

        for event in self.automationNetwork.eventList:
            if event.node.location != '':
                if int(event.location) == self.id:
                    events.append(event)

        return events


    def add_automation_module(self, moduleName):
        self.automationNetwork.add_module(moduleName, str(self.id))



    def __str__(self):
        return "id: {}\nname: {}\ntype: {}\ncontenu: {}\ntemperature: {}\nluminosity: {}"\
            .format(self.id, self.name, self.type,self.content,self.temperature, self.luminosity)

