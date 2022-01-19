from .module import *

class NetworkController(Module):
    '''
         class representing the zwave automatisation engine

            attributes:
                controllerNode

            property:
                name

            method:
                hard reset
                soft reset

                add node: allows to add node (start the inclusion mode)
                remove node: remove an node
    '''


    def __init__(self, moduleNode):
        """
            constructor of the class

                parameter:
                    controllerNode
        """

        Module.__init__(self, moduleNode)


    def hard_reset(self):
        self.moduleNode.hard_reset


    def soft_reset(self):
        self.moduleNode.soft_reset()


    def add_node(self):
        self.moduleNode.add_node()


    def remove_node(self):
        self.moduleNode.remove_node()
