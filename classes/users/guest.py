class Guest:
    """
        class representing an Inhabitant

            Attributes:
                id
                profil

            property:

            method:
    """

    def __init__(self, Id, profil):
        self.id = Id
        self.profil = profil

    def serialize(self):
        data = {}

        data = {'id': self.id,
        'profil': self.profil.serialize()
        }

        return data