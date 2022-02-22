import mysql.connector

class HomeDatabase:
    """
        classes allowing to communicate with the home database

            attributes:
                username
                host
                database name
                database password

                db_connection
                db_cursor

            property:

            method:
                connect
                disconnect
                commit change

                get rooms list
                get profils list
                get events list
                get Inhabitants list
                get guests list
                get users list

                get_room
                get profil
                get event
                get inhabitant
                get guest
                get user

                add room
                add profil
                add event
                add inhabitant
                add guest
                add user

                del room
                del profil
                del event
                del inhabitant
                del guest

                get room

                set room name

    """

    def __init__(self):
        self.username = "HomeAutomatisationSystem"
        self.host = "localHost"
        self.databaseName = "Home"
        self.databasePassword = "0000"

        self.db_connection = False
        self.db_cursor = False


    def connect(self):
        self.db_connection = mysql.connector.connect(
            host = self.host,
            user = self.username,
            passwd = self.databasePassword,
            database = self.databaseName
        )
        self.db_cursor = self.db_connection.cursor(buffered=True)


    def disconnect(self):
        if self.db_connection != False:
            self.db_connection.close()
            self.db_cursor = False
            self.db_connection = False


    def commit_change(self):
        if self.db_connection != False:
            self.db_connection.commit()

    def get_rooms_list(self):
        request = """SELECT * FROM Rooms"""

        self.db_cursor.execute(request)

        rooms = self.db_cursor.fetchall()

        return rooms

    def get_profils_list(self):
        request = """ SELECT * FROM Profils"""

        self.db_cursor.execute(request)

        profils = self.db_cursor.fetchall()

        return profils

    def get_events_list(self):
        pass

    def get_Inhabitants_list(self):
        request = """ SELECT * FROM Inhabitants"""

        self.db_cursor.execute(request)

        inhabitants = self.db_cursor.fetchall()

        return inhabitants

    def get_guests_list(self):
        request = """ SELECT * FROM Guests"""

        self.db_cursor.execute(request)

        guests = self.db_cursor.fetchall()

        return guests

    def get_room(self, roomId):
        request = "SELECT * FROM Rooms WHERE id = {}".format(roomId)

        self.db_cursor.execute(request)

        room = self.db_cursor.fetchall()

        return room

    def get_profil(self, profilId):
        request = "SELECT * FROM Profils WHERE id = {}".format(profilId)

        self.db_cursor.execute(request)

        profil = self.db_cursor.fetchall()

        return profil

    def get_event(self, eventId):
        pass

    def get_inhabitant(self, inhabitantId):
        request = "SELECT * FROM Inhabitants WHERE id = {}".format(inhabitantId)

        self.db_cursor.execute(request)

        inhabitant = self.db_cursor.fetchall()

        return inhabitant

    def get_guest(self, guestId):
        request = "SELECT * FROM Guests WHERE id = {}".format(guestId)

        self.db_cursor.execute(request)

        guest = self.db_cursor.fetchall()

        return guest

    def add_room(self, room):
        request = "INSERT INTO Rooms(name, type) VALUES\
        ('{}', '{}')".format(room.name, room.type)

        self.db_cursor.execute(request)
        self.commit_change()

        return self.db_cursor.lastrowid

    def add_profil(self, profil):
        request = "INSERT INTO Profils(first_name, last_name) VALUES\
                ('{}', '{}')".format(profil.firstName, profil.lastName)

        self.db_cursor.execute(request)
        self.commit_change()

        return self.db_cursor.lastrowid

    def add_event(self, event):
        pass

    def add_inhabitant(self, profil):
        profilId = self.add_profil(profil)

        request = "INSERT INTO Inhabitants(fk_profil_id) VALUES\
                ({})".format(profilId)

        self.db_cursor.execute(request)
        self.commit_change()

        return self.db_cursor.lastrowid

    def add_guest(self, profil):
        profilId = self.add_profil(profil)

        request = "INSERT INTO Guests(fk_profil_id) VALUES\
                        ({})".format(profilId)

        self.db_cursor.execute(request)
        self.commit_change()

        return self.db_cursor.lastrowid


    def del_room(self, roomId):

        request = "DELETE FROM Rooms WHERE id = {}".format(roomId)
        self.db_cursor.execute(request)

        self.commit_change()


    def del_profil(self, profilId):
        request = "DELETE FROM Profils WHERE id = {}".format(profilId)
        self.db_cursor.execute(request)

        self.commit_change()


    def del_inhabitant(self, inhabitantId):
        request = "SELECT * FROM Inhabitants WHERE id = {}".format(inhabitantId)

        self.db_cursor.execute(request)

        inhabitant = self.db_cursor.fetchall()[0]
        profilId = inhabitant[1]

        request = "DELETE FROM Inhabitants WHERE id = {}".format(inhabitantId)
        self.db_cursor.execute(request)

        self.commit_change()

        self.del_profil(profilId)

    def del_guest(self, guestId):
        request = "SELECT * FROM Guests WHERE id = {}".format(guestId)

        self.db_cursor.execute(request)

        guest = self.db_cursor.fetchall()[0]
        profilId = guest[1]

        request = "DELETE FROM Guests WHERE id = {}".format(guestId)
        self.db_cursor.execute(request)

        self.commit_change()

        self.del_profil(profilId)


    def get_room(roomId):
        request = "SELECT * FROM Rooms WHERE id = {}".format(roomId)

        self.db_cursor.execute(request)

        room = self.db_cursor.fetchall()[0]

        return room


    def set_room_name(self, roomId, newName):
        request = """UPDATE Rooms SET name = '{}' where id = {}""".format(newName, roomId)

        self.db_cursor.execute(request)

        self.commit_change()

    def set_room_type(self, roomId, newType):
        request = """UPDATE Rooms SET type = '{}' where id = {}""".format(newType, roomId)

        self.db_cursor.execute(request)

        self.commit_change()

    def set_profil_last_name(self, profilId, newLastName):
        request = """UPDATE Profils SET last_name = '{}' where id = {}""".format(newLastName, profilId)

        self.db_cursor.execute(request)

        self.commit_change()

    def set_profil_first_name(self, profilId, newFirstName):
        request = """UPDATE Profils SET first_name = '{}' where id = {}""".format(newFirstName, profilId)

        self.db_cursor.execute(request)

        self.commit_change()

    def set_inhabitant_last_name(self, inhabitantId, newLastName):
        request = "SELECT * FROM Inhabitants WHERE id = {}".format(inhabitantId)

        self.db_cursor.execute(request)

        inhabitant = self.db_cursor.fetchall()[0]
        profilId = inhabitant[1]

        self.set_profil_last_name(profilId, newLastName)

    def set_inhabitant_first_name(self, inhabitantId, newFirstName):
        request = "SELECT * FROM Inhabitants WHERE id = {}".format(inhabitantId)

        self.db_cursor.execute(request)

        inhabitant = self.db_cursor.fetchall()[0]
        profilId = inhabitant[1]

        self.set_profil_first_name(profilId, newFirstName)

    def set_guest_last_name(self, guestId, newLastName):
        request = "SELECT * FROM Guests WHERE id = {}".format(guestId)

        self.db_cursor.execute(request)

        guest = self.db_cursor.fetchall()[0]
        profilId = guest[1]

        self.set_profil_last_name(profilId, newLastName)

    def set_guest_first_name(self, guestId, newFirstName):
        request = "SELECT * FROM Guests WHERE id = {}".format(guestId)

        self.db_cursor.execute(request)

        guest = self.db_cursor.fetchall()[0]
        profilId = guest[1]

        self.set_profil_first_name(profilId, newFirstName)
