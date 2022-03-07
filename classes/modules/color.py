class Color:
    '''
         class representing an color

            attributes:
                name: name of the color
                rgb values
                rgbw values
    '''


    def __init__(self, name, rgbValue, rgbwValue):
        self.name = name
        self.rgbValue = rgbValue
        self.rgbwValue= rgbwValue

    def serialize(self):
        data = {}

        data = {'name': self.name,
        'rgbValue': self.rgbValue,
        'rgbwValue': self.rgbwValue}

        return data
