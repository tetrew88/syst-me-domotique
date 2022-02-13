import openzwave
from openzwave.node import ZWaveNode
from openzwave.value import ZWaveValue
from openzwave.controller import ZWaveController
from openzwave.network import ZWaveNetwork
from openzwave.option import ZWaveOption

import sys
import time
import datetime

import six
if six.PY3:
    from pydispatch import dispatcher
else:
    from louie import dispatcher

from .modules import *
from.modules.networkController import *

from .modules.controller import *

from .modules.bulb import *
from .modules.rgbBulb import *

from .modules.sensors.sensor import *
from .modules.sensors.multiSensor import *

from .modules.sensors.motionSensor import *
from .modules.sensors.luminositySensor import *
from .modules.sensors.SeismicIntensitySensor import *
from .modules.sensors.temperatureSensor import *


from .events.moduleEvent import *
from .events.motionDetection import *


class Network:
    '''
         class representing the zwave network

            attributes:
                path to controller
                path to Zwave Config file
                path to logs

                zwave network
                event list


            property:
                - homeId: identifiant of domicile

                - state: STATE_STOPPED = 0, STATE_FAILED = 1, STATE_RESETTED = 3, STATE_STARTED = 5, STATE_AWAKED = 7, STATE_READY = 10
                - is ready: Says if the network is ready

                - node list: list of node on the network
                - sleeping node list: list of sleeping node

                - node counter: number of node on the network
                - sleeping node counter: number of sleeping node on the network

                - main controller
                - controller


            method:
                load: load the network
                start: start the network
                stop: stop the network

                destroy; destroy the network
                heal: heal the network

                add module

                save modification
    '''


    def __init__(self, controllerPath, zwaveConfigPath, logPath):
        """
            constructor of the class

                parameters:
                    path to the Zwave controller
                    path to the zwave config file
                    path to log file
        """

        self.controllerPath = controllerPath
        self.zwaveConfigPath = zwaveConfigPath
        self.logPath = logPath

        self.network = False
        self.eventList = []


    @property
    def homeId(self):
        if self.network != False:
            return self.network.home_id
        else:
            return False

    @property
    def state(self):
        if self.network != False:
            return self.network.state
        else:
            return False


    @property
    def isReady(self):
        if self.network != False:
            return self.network.is_ready
        else:
            return False

    @property
    def modulesList(self):
        modules = []

        if self.state != False and self.isReady:
            modules.append(NetworkController(self.mainController.node))

            for node in self.network.nodes.values():
                if 'bulb' in node.device_type.lower() or 'light' in node.device_type.lower():
                    if "COMMAND_CLASS_COLOR" in node.command_classes_as_string:
                        modules.append(RgbBulb(node))
                    else:
                        modules.append(Bulb(node))
                elif 'sensor' in node.device_type.lower():
                    if 'COMMAND_CLASS_SENSOR_MULTILEVEL' in node.command_classes_as_string:
                        sensors = {}

                        for element in node.get_sensors():
                            if node.get_sensors()[element].label == 'Sensor':
                                sensors['motion sensor'] = MotionSensor(node)
                            if node.get_sensors()[element].label == 'Temperature':
                                sensors['temperature'] = TemperatureSensor(node)
                            if node.get_sensors()[element].label == 'Luminance':
                                sensors['luminosity'] = LuminositySensor(node)
                            if node.get_sensors()[element].label == 'Seismic Intensity':
                                sensors['seismic intensity'] = SeismicIntensitySensor(node)

                        modules.append(MultiSensor(node, sensors))
                    else:
                        for element in node.get_sensors():
                            if node.get_sensors()[element].label == 'Sensor':
                                modules.append(MotionSensor(node))
                            elif node.get_sensors()[element].label == 'Temperature':
                                modules.append(TemperatureSensor(node))
                            elif node.get_sensors()[element].label == 'Luminance':
                                modules.append(LuminositySensor(node))
                            elif node.get_sensors()[element].label == 'Seismic Intensity':
                                modules.append(SeismicIntensitySensor(node))

                elif 'controller' in node.device_type.lower():
                    modules.append(Controller(node))

                else:
                    if node.node_id != self.mainController.node.node_id:
                        modules.append(Module(node))

        else:
            return []

        return modules

    @property
    def sleepingModulesList(self):
        modules = []

        if self.state != False and self.isReady:
            for module in self.modulesList:
                if module.is_sleeping:
                    modules.append(module)
                else:
                    pass
        else:
            return False

        return modules


    @property
    def modulesCounter(self):
        return len(self.modulesList)

    @property
    def sleepingmodulesCounter(self):
        return len(self.sleepingModulesList)


    @property
    def mainController(self):
        if self.network != False:
            return self.network.controller
        else:
            return False


    def load(self):
        dispatcher.connect(self.network_started, ZWaveNetwork.SIGNAL_NETWORK_STARTED)
        dispatcher.connect(self.network_ready, ZWaveNetwork.SIGNAL_NETWORK_READY)
        dispatcher.connect(self.network_awake, ZWaveNetwork.SIGNAL_NETWORK_AWAKED)
        dispatcher.connect(self.node_event, ZWaveNetwork.SIGNAL_VALUE_CHANGED)
        dispatcher.connect(self.node_added, ZWaveNetwork.SIGNAL_NODE_ADDED)

    def start(self):
        """
            method used for start the zwave network
        """

        succes = False

        device = self.controllerPath
        sniff = 300.0
        log = "Debug"

        # configuration og the logs
        options = ZWaveOption(device, self.zwaveConfigPath, user_path=".", cmd_line="")
        options.set_log_file(self.logPath)
        options.set_append_log_file(True)
        options.set_console_output(False)
        options.set_save_log_level(log)
        options.set_logging(True)
        options.lock()

        # Construction of the zwave network
        self.network = ZWaveNetwork(options, autostart=False)

        self.network.start()

        print("***** Etablissement du serveur ZWave: ")
        for i in range(0, 80):
            if self.state >= self.network.STATE_READY:
                print("***** Le serveur ZWave est prêt")

                succes = True
                break
            else:
                sys.stdout.write(".")
                sys.stdout.flush()
                time.sleep(1.0)

                succes = False

        time.sleep(5.0)

        if not self.isReady:
            if len(self.sleepingModulesList) > 0:
                for node in self.sleepingModulesList:
                        print("le noeud {}: est endormis, veuillez le reveillez manuellement\n".format(node.name))

            for i in range(0, 80):
                if self.state >= self.network.STATE_READY:
                    print("***** Le serveur ZWave est prêt")

                    succes = True
                    break
                else:
                    sys.stdout.write(".")
                    sys.stdout.flush()
                    time.sleep(1.0)

            succes = False
            time.sleep(5.0)

        # succes return
        return succes


    def stop(self):
        self.network.stop()


    def destroy(self):
        self.network.destroy()


    def heal(self):
        self.network.heal()

    def add_module(self, name, location):
        moduleIdList = []
        newModule = False

        for module in self.modulesList:
            moduleIdList.append(module.id)

        self.mainController.add_node()

        print("Mettez le module en état d'inclusion")
        time.sleep(10)

        for module in self.modulesList:
            if module.id in moduleIdList:
                newModule = False
            else:
                newModule = module
        if newModule != False:
            newModule.set_name(name)
            newModule.set_location(str(location))

            self.save_modification()

    def del_module(self):
        self.mainController.remove_node()
        print("Mettez le module en état d'exclusion")
        time.sleep(10)


    def network_started(self, network):
        print("Hello from network : I'm started : homeid {:08x} – {} nodes were found.".format(network.home_id,
                                                                                                   network.nodes_count))

    def network_ready(self, network):
        print("Hello from network : I'm ready : {} nodes were found.".format(network.nodes_count))
        print("Hello from network : my controller is : {}".format(network.controller))


    def network_awake(self, network):
        print("Hello from network : I'm awake")

    def node_event(self, node, value, **kwargs):
        event=False
        if self.isReady:
            if 'sensor' in node.device_type.lower() or 'COMMAND_CLASS_SENSOR_MULTILEVEL' in node.command_classes_as_string:
                for element in node.get_sensors():
                    if node.get_sensors()[element].label == "Sensor":
                        if node.get_sensors()[element].data == True  :
                            event = MotionDetection(node,
                                              datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"))

                            print(event)

                            self.eventList.append(event)
                        else:
                            pass
            else:
                print(node.name)
                print('xxxxxxxxxxxxx')

    def node_added(self, node):
        print("le noeud {} a été ajouter", node.node_id)

    def value_changed(self, node, value):
        print(node.name)
        print(value.label)


    def save_modification(self):
        self.network.write_config()