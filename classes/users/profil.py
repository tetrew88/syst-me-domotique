class Profil:
    """
        class representing an profil

            Attributes:
                id
                first name
                lastname

            Property:

            method:
    """

    def __init__(self, Id, firstName, lastName):
        self.id = Id
        self.firstName = firstName
        self.lastName = lastName

    def serialize(self):
        data = {}

        data = {"id": self.id,
        'firstName': self.firstName,
        'lastName': self.lastName
        }

        return data