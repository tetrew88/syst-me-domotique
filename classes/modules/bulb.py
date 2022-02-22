from .module import *


class Bulb(Module):
    '''
         class representing an zwave bulb

            attributes:

            property:
                -light up; true/false
                -intensity; intensity of the light

            methods:
                set intensity; allows to modify the intensity of the light

                turn on
                turn off
    '''

    def __init__(self, moduleNode):
        Module.__init__(self, moduleNode)
        self.type = 'bulb'


    @property
    def lightUp(self):
        if self.intensity > 0:
            return True
        else:
            return False

    @property
    def intensity(self):
        """
            property representing the level of intensity oh the light
        """

        for values in self.moduleNode.get_dimmers().values():
            if values.label == 'Level':
                return values.data


    def set_intensity(self, intensity):
        """
            method used for modify the intensity of the light
        """

        """
            for values in self.moduleNode.get_dimmers().values():
                if values.label == 'Level':
                    valueId = values.value_id
                    break
    
            self.moduleNode.set_dimmer(valueId, intensity)
        """

    def on(self, intensity = 30):
        """
            method used for light up an bulb
        """

        self.set_intensity(intensity)


    def off(self):
        """
            method used for light down an bulb
        """

        self.set_intensity(0)