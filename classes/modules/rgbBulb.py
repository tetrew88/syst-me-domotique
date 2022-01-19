from .bulb import *
from .color import *

class RgbBulb(Bulb):
    '''
         class representing an rgbbulb

            attributes:
                color palette: list of class color

            property:

            methods:
                set state: allows to modify state of the bulb

    '''


    def __init__(self, moduleNode):
        Bulb.__init__(self, moduleNode)
        self.colorPalette = [Color("rouge", '#FF0000', '#FF00000000'),
                             Color("blanc", '#FFFFFF', '#FFFFFF0000'),
                             Color("bleu", "#0000FF", '#0000FF0000'),
                             Color("vert", "#008000", "#0080000000")]

    @property
    def color(self):
        for values in self.moduleNode.get_rgbbulbs().values():
            if values.label == 'Color':
                return values.data


    def set_color(self, color):
        valuesId = ""

        for values in self.moduleNode.get_rgbbulbs().values():
            if values.label == 'Color':
                valueId = values.value_id

        self.moduleNode.set_rgbw(valueId, color.rgbwValue)