class User:
    """
        class representing an Inhabitant

            Attributes:
                id
                profil

            property:

            method:
    """

    def __init__(self, id, profil):
        self.id = id
        self.profil = profil


class GuestUser(User):
    """
        class representing an Inhabitant

            Attributes:
                id
                profil

            property:

            method:
    """

    def __init__(self, id, profil):
        User.__init__(id, profil)