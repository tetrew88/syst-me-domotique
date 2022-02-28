from datetime import datetime

class Event:
    """
        class representing an event

            attributes:
                type
                date time of the evenement
                location

            property:

            method:
    """


    def __init__(self, Type, dateTime, location):
        self.type = Type
        self.dateTime = dateTime.strftime("%d/%m/%y, %H:%M:%S")
        self.location = location


    def serialize(self):
        data = {}

        data = {'type': self.type,
        'dateTime': self.dateTime,
        'location': self.location,
        }

        return data