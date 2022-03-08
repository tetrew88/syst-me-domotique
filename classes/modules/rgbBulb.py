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
        self.type = 'rgb bulb'

    @property
    def color(self):
        for values in self.moduleNode.get_rgbbulbs().values():
            if values.label == 'Color':
                for element in self.colorPalette:
                    if values.data == element.rgbwValue:
                        return element


    def set_color(self, color):
        valuesId = ""

        for values in self.moduleNode.get_rgbbulbs().values():
            if values.label == 'Color':
                valueId = values.value_id

        self.moduleNode.set_rgbw(valueId, color.rgbwValue)


    def serialize(self):
        data = {}

        colorPalette = []

        for color in self.colorPalette:
            colorPalette.append(color.serialize())

        data = {'id': self.id,
        'name': self.name,
        'location': self.location,
        "awake": self.isAwake,
        "disfunctionnement": self.isFailed,
        "ready": self.isReady,
        "sleep": self.isSleeping,
        "manufacturer name": self.manufacturerName,
        "product name": self.productName,
        "product type": self.productType,
        "system type": self.deviceType,
        "batterie level": self.batteryLevel,
        "type": self.type,
        "lightUp": self.lightUp,
        "intensity" : self.intensity,
        "color": self.color.serialize(),
        "color palette": colorPalette
        }

        return data