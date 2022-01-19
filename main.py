#!/usr/bin/python3


from classes.homeAutomationSystem import *
from classes.modules.module import *


from classes.rooms.livingroom import *
from classes.users.profil import *

def main():
    homeAutomationSystem = HomeAutomationSystem("/dev/ttyACM0",
                    "env/lib/python3.7/site-packages/python_openzwave/ozw_config",
                    "log.log")

    homeAutomationSystem.start()

    while homeAutomationSystem.running:
        tmpChoice = choice = -1

        while choice < 0 or choice > 4:
            print("Menu principale\n")

            print("1.options système")
            print('2.options domicile')
            print("3.options réseaux")
            print("4.options modules")

            tmpChoice = input("\nentrer votre choix (0: quitter): ")
            try:
                tmpChoice = int(tmpChoice)
            except TypeError:
                tmpChoice = -1
            finally:
                choice = tmpChoice

        if choice == 1:
            optionsChoice = tmpOptionsChoice = -1

            while optionsChoice < 0 or optionsChoice > 1:
                print("\n\nOptions Système\n")

                if homeAutomationSystem.running:
                    print("1.éteindre")
                else:
                    print("1.allumer")

                tmpOptionsChoice = input("\nentrer votre choix (0: retour): ")
                try:
                    tmpOptionsChoice = int(tmpOptionsChoice)
                except TypeError:
                    tmpOptionsChoice = -1
                finally:
                    optionsChoice = tmpOptionsChoice

            if optionsChoice == 1:
                if homeAutomationSystem.running:
                    homeAutomationSystem.stop()
                else:
                    homeAutomationSystem.start()
            else:
                pass

        elif choice == 2:
            optionsChoice = tmpOptionsChoice = -1

            while optionsChoice < 0 or optionsChoice > 17:
                print("\n\nOptions du domicile\n\n")
                print("1.ajouter une pièces")
                print("2.supprimer une pièce")
                print("3.modifier une piece")
                print("4.lister les pièces")

                print("5.ajouter un habitant")
                print("6.supprimmer un habitant")
                print("7.modifier un habitant")
                print("8.lister les habitants")

                print("9.ajouter un invité")
                print("10.supprimer un invité")
                print("11.modifier un invité")
                print("12.lister les invités")

                print("13.ajouter un module domotique")
                print("14.supprimer un module domotique")
                print("15.modifier un module domotique")
                print("16.lister les modules domotique")

                print("17.lister événement")

                tmpOptionsChoice = input("\nentrer votre choix (0: retour): ")
                try:
                    tmpOptionsChoice = int(tmpOptionsChoice)
                except TypeError:
                    tmpOptionsChoice = -1
                finally:
                    optionsChoice = tmpOptionsChoice

            if optionsChoice == 1:
                roomTypes = ['bathroom', 'bedroom', 'kitchen', 'livingroom']
                roomType = name = ""
                typeChoice = tmpTypeChoice = 0
                x=1

                print("ajout d'une pièce\n\n")

                while typeChoice < 1 or typeChoice > len(roomTypes):
                    print("choisissez le type de pièce\n")
                    for element in roomTypes:
                        print("{}: {}".format(x, element))
                        x+=1

                    tmpTypeChoice = input("entrer votre choix: ")
                    try:
                        tmpTypeChoice = int(tmpTypeChoice)
                    except:
                        tmpTypeChoice = 0
                    finally:
                        typeChoice = tmpTypeChoice

                roomType = roomTypes[typeChoice - 1]

                name = input("Entrer le nom de la pièce: ")

                room = Room(0, name, roomType, False)

                homeAutomationSystem.add_home_room(room)

            elif optionsChoice == 2:
                selectedRoom = False
                roomChoice = tmpRoomChoice = 0
                x=1

                print('suppression de pièce\n\n')
                while roomChoice < 1 or roomChoice > len(homeAutomationSystem.get_home_rooms()):
                    print("selectionner une pièce\n")
                    for room in homeAutomationSystem.get_home_rooms():
                        print("{}: {}".format(x, room.name))
                        x+=1

                    tmpRoomChoice = input("Entrer votre choix: ")
                    try:
                        tmpRoomChoice = int(tmpRoomChoice)
                    except:
                        tmpRoomChoice = 0
                    finally:
                        roomChoice = tmpRoomChoice

                selectedRoom = homeAutomationSystem.get_home_rooms()[roomChoice - 1]

                homeAutomationSystem.del_home_room(selectedRoom.id)

            elif optionsChoice == 3:
                selectedRoom = False
                roomChoice = tmpRoomChoice = 0
                settingChoice = tmpSettingChoice = 0
                x = 1

                print('Modification de pièce\n\n')
                while roomChoice < 1 or roomChoice > len(homeAutomationSystem.get_home_rooms()):
                    print("selectionner une pièce\n")
                    for room in homeAutomationSystem.get_home_rooms():
                        print("{}: {}".format(x, room.name))
                        x += 1

                    tmpRoomChoice = input("Entrer votre choix: ")
                    try:
                        tmpRoomChoice = int(tmpRoomChoice)
                    except:
                        tmpRoomChoice = 0
                    finally:
                        roomChoice = tmpRoomChoice

                selectedRoom = homeAutomationSystem.get_home_rooms()[roomChoice - 1]

                while settingChoice < 1 or settingChoice > 3:
                    print("1.Renommer")
                    print("2.changer le type de pièce")
                    print("3.supprimer")

                    tmpSettingChoice = input("Entrer votre choix: ")
                    try:
                        tmpSettingChoice = int(tmpSettingChoice)
                    except:
                        tmpSettingChoice = 0
                    finally:
                        settingChoice = tmpSettingChoice

                if settingChoice ==1:
                    name = ""

                    name = input("entrer le nouveau nom: ")
                    ##################
                    ##################
                elif settingChoice == 2:
                    pass

                elif settingChoice ==3:
                    homeAutomationSystem.del_home_room(selectedRoom)

            elif optionsChoice == 4:
                print("Listing des pièces\n")
                for room in homeAutomationSystem.get_home_rooms():
                    print("id: {}\tnom: {}".format(room.id, room.name))

            elif optionsChoice ==5:
                firstName = lastName = ""
                profil = False
                print("ajout d'un nouvel habitant")

                firstName = input("Entrer le prénom de l'habitant")
                lastName = input("Entrer le nom de famille de l'habitant")

                profil = Profil(0, firstName, lastName)

                homeAutomationSystem.add_home_inhabitant(profil)

            elif optionsChoice == 6:
                pass#pour la suppression penser a supprimer le profil associé

            elif optionsChoice == 0:
                pass
            else:
                pass

        elif choice == 3:
            optionsChoice = tmpOptionsChoice = -1

            while optionsChoice < 0 or optionsChoice > 16:
                print("\n\nOptions réseau\n\n")
                if homeAutomationSystem.home.homeAutomationNetwork.isReady:
                    print("1.arreter")
                else:
                    print("1.démarrer")

                print("2.ajouter un module")
                print("3.supprimer un module")
                print("4.soigner réseau")
                print("5.detruire réseau")
                print("6.lister les événement")

                tmpOptionsChoice = input("\nentrer votre choix (0: retour): ")
                try:
                    tmpOptionsChoice = int(tmpOptionsChoice)
                except TypeError:
                    tmpOptionsChoice = -1
                finally:
                    optionsChoice = tmpOptionsChoice

        elif choice ==4:
            optionsChoice = tmpOptionsChoice = -1

            while optionsChoice < 0 or optionsChoice > 16:
                print("\n\nOptions module \n\n")
                print("1.ajouter un module domotique")
                print("2.supprimer un module domotique")
                print("3.modifier un module domotique")
                print("4.manipuler un module")
                print("5.lister les modules domotique")

                tmpOptionsChoice = input("\nentrer votre choix (0: retour): ")
                try:
                    tmpOptionsChoice = int(tmpOptionsChoice)
                except TypeError:
                    tmpOptionsChoice = -1
                finally:
                    optionsChoice = tmpOptionsChoice


        elif choice == 0:
            homeAutomationSystem.stop()

        else:
            pass




if __name__ == '__main__':
    main()