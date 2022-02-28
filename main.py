#!/usr/bin/python3


from classes.homeAutomationServer import *
from classes.homeAutomationSystem import *
from classes.modules.module import *


from classes.rooms.livingroom import *
from classes.users.profil import *

def main():
    homeAutomationSystem = HomeAutomationSystem("/dev/ttyACM0",
                    "env/lib/python3.7/site-packages/python_openzwave/ozw_config",
                    "log.log")

    homeAutomationServer = HomeAutomationServer()
    homeAutomationServer.set_home_automation_system(homeAutomationSystem)

    homeAutomationServer.start()


    homeAutomationSystem.home.homeAutomationNetwork.network.create_scene("test")

    while homeAutomationSystem.running:
        tmpChoice = choice = -1

        while choice < 0 or choice > 3:
            print("Menu principale\n")

            print("1.options système")
            print('2.options domicile')
            print("3.options réseaux")

            print(homeAutomationSystem.home.homeAutomationNetwork.network.get_scenes())

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

                print("13.lister événement")

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

                    homeAutomationSystem.set_home_room_name(selectedRoom.id, name)

                elif settingChoice == 2:
                    roomTypes = ['bathroom', 'bedroom', 'kitchen', 'livingroom']
                    typeChoice = tmpTypeChoice = 0
                    x = 1

                    print("ajout d'une pièce\n\n")

                    while typeChoice < 1 or typeChoice > len(roomTypes):
                        print("choisissez le type de pièce\n")
                        for element in roomTypes:
                            print("{}: {}".format(x, element))
                            x += 1

                        tmpTypeChoice = input("entrer votre choix: ")
                        try:
                            tmpTypeChoice = int(tmpTypeChoice)
                        except:
                            tmpTypeChoice = 0
                        finally:
                            typeChoice = tmpTypeChoice

                    roomType = roomTypes[typeChoice - 1]

                    homeAutomationSystem.set_home_room_type(selectedRoom.id, roomType)


                elif settingChoice ==3:
                    homeAutomationSystem.del_home_room(selectedRoom.id)

            elif optionsChoice == 4:
                print("Listing des pièces\n")
                for room in homeAutomationSystem.get_home_rooms():
                    print("id: {}\tnom: {}".format(room.id, room.name))

            elif optionsChoice ==5:
                firstName = lastName = ""
                profil = False
                print("ajout d'un nouvel habitant")

                firstName = input("Entrer le prénom de l'habitant: ")
                lastName = input("Entrer le nom de famille de l'habitant: ")

                profil = Profil(0, firstName, lastName)

                homeAutomationSystem.add_home_inhabitant(profil)

            elif optionsChoice == 6:
                inhabitantChoice = tmpInhabitantChoice = 0
                selectedInhabitant = False
                x =1
                print("suppression d'un habitant\n\n")

                while inhabitantChoice < 1 or inhabitantChoice > len(homeAutomationSystem.get_home_inhabitants()):
                    print('selectionner un habitant\n')

                    for inhabitant in homeAutomationSystem.get_home_inhabitants():
                        print("{}: {} {}".format(x, inhabitant.profil.lastName, inhabitant.profil.firstName))
                        x+=1

                    tmpInhabitantChoice = input("entrer votre choix")
                    try:
                        tmpInhabitantChoice = int(tmpInhabitantChoice)
                    except:
                        tmpInhabitantChoice = 0
                    finally:
                        inhabitantChoice = tmpInhabitantChoice

                selectedGuest = homeAutomationSystem.get_home_inhabitants()[inhabitantChoice -1]

                homeAutomationSystem.del_home_inhabitant(selectedGuest.id)

            elif optionsChoice == 7:
                inhabitantChoice = tmpInhabitantChoice = 0
                x=1
                selectedInhabitant = False

                print("Modification d'un habitant\n\n")

                while inhabitantChoice < 1 or inhabitantChoice > len(homeAutomationSystem.get_home_inhabitants()):
                    print('selectionner un habitant')

                    for inhabitant in homeAutomationSystem.get_home_inhabitants():
                        print("{}: {} {}".format(x, inhabitant.profil.lastName, inhabitant.profil.firstName))
                        x+=1

                    tmpInhabitantChoice = input("entrer votre choix")
                    try:
                        tmpInhabitantChoice = int(tmpInhabitantChoice)
                    except:
                        tmpInhabitantChoice = 0
                    finally:
                        inhabitantChoice = tmpInhabitantChoice

                selectedInhabitant = homeAutomationSystem.get_home_inhabitants()[inhabitantChoice - 1]

                settingChoice = tmpSettingChoice = 0
                x = 1

                while settingChoice < 1 or settingChoice > 2:
                    print('1.changer nom')
                    print('2.changer prenom')

                    tmpSettingChoice = input("Entrer votre choix: ")
                    try:
                        tmpSettingChoice = int(tmpSettingChoice)
                    except:
                        tmpSettingChoice = 0
                    finally:
                        settingChoice = tmpSettingChoice

                if settingChoice == 1:
                    lastName = ""

                    lastName = input('Entrer le nouveau nom de famille: ')
                    homeAutomationSystem.set_home_inhabitant_last_name(selectedInhabitant.id,
                                                                       lastName)

                elif settingChoice == 2:
                    firstName = ""

                    firstName = input('Entrer le nouveau prénom: ')
                    homeAutomationSystem.set_home_inhabitant_first_name(selectedInhabitant.id,
                                                                        firstName)
            elif optionsChoice == 8:
                print("Listing des habitants\n")
                for inhabitant in homeAutomationSystem.get_home_inhabitants():
                    print("id: {}\tnom: {}\tprenom: {}".format(inhabitant.id,
                                                            inhabitant.profil.lastName,
                                                            inhabitant.profil.firstName))

            elif optionsChoice == 9:
                firstName = lastName = ""
                profil = False
                print("ajout d'un nouvel invité")

                firstName = input("Entrer le prénom de l'invité: ")
                lastName = input("Entrer le nom de famille de l'invité: ")

                profil = Profil(0, firstName, lastName)

                homeAutomationSystem.add_home_guest(profil)

            elif optionsChoice == 10:
                guestChoice = tmpGuestChoice = 0
                selectedGuest = False
                x = 1
                print("suppression d'un invité\n\n")

                while guestChoice < 1 or guestChoice > len(homeAutomationSystem.get_home_guests()):
                    print('selectionner un invité\n')

                    for guest in homeAutomationSystem.get_home_guests():
                        print("{}: {} {}".format(x, guest.profil.lastName, guest.profil.firstName))
                        x += 1

                    tmpGuestChoice = input("entrer votre choix")
                    try:
                        tmpGuestChoice = int(tmpGuestChoice)
                    except:
                        tmpGuestChoice = 0
                    finally:
                        guestChoice = tmpGuestChoice

                selectedGuest = homeAutomationSystem.get_home_guests()[guestChoice - 1]

                homeAutomationSystem.del_home_guest(selectedGuest.id)

            elif optionsChoice == 11:
                guestChoice = tmpGuestChoice = 0
                x = 1
                selectedGuest = False

                print("Modification d'un invité\n\n")

                while guestChoice < 1 or guestChoice > len(homeAutomationSystem.get_home_guests()):
                    print('selectionner un invité')

                    for guest in homeAutomationSystem.get_home_guests():
                        print("{}: {} {}".format(x, guest.profil.lastName, guest.profil.firstName))
                        x += 1

                    tmpGuestChoice = input("entrer votre choix")
                    try:
                        tmpGuestChoice = int(tmpGuestChoice)
                    except:
                        tmpGuestChoice = 0
                    finally:
                        guestChoice = tmpGuestChoice

                selectedGuest = homeAutomationSystem.get_home_guests()[guestChoice - 1]

                settingChoice = tmpSettingChoice = 0
                x = 1

                while settingChoice < 1 or settingChoice > 2:
                    print('1.changer nom')
                    print('2.changer prenom')

                    tmpSettingChoice = input("Entrer votre choix: ")
                    try:
                        tmpSettingChoice = int(tmpSettingChoice)
                    except:
                        tmpSettingChoice = 0
                    finally:
                        settingChoice = tmpSettingChoice

                if settingChoice == 1:
                    lastName = ""

                    lastName = input('Entrer le nouveau nom de famille: ')
                    homeAutomationSystem.set_home_guest_last_name(selectedGuest.id,
                                                                       lastName)

                elif settingChoice == 2:
                    firstName = ""

                    firstName = input('Entrer le nouveau prénom: ')
                    homeAutomationSystem.set_home_guest_first_name(selectedGuest.id,
                                                                        firstName)

            elif optionsChoice == 12:
                print("Listing des invités\n")
                for guest in homeAutomationSystem.get_home_guests():
                    print("id: {}\tnom: {}\tprenom: {}".format(guest.id,
                                                               guest.profil.lastName,
                                                               guest.profil.firstName))

            elif optionsChoice == 13:
                print("listing des événement")
                for event in homeAutomationSystem.get_event():
                    print("type: {}\templacement: {}\t datetime: {}".format(event.type,
                                                                            event.location,
                                                                            event.dateTime))

            elif optionsChoice == 0:
                pass
            else:
                pass

        elif choice == 3:
            optionsChoice = tmpOptionsChoice = -1

            while optionsChoice < 0 or optionsChoice > 9   :
                print("\n\nOptions réseau\n\n")
                if homeAutomationSystem.home.homeAutomationNetwork.isReady:
                    print("1.arreter")
                else:
                    print("1.démarrer")

                print("2.ajouter un module")
                print("3.supprimer un module")
                print("4.modifier un module domotique")
                print("5.manipuler un module")
                print("6.lister les modules domotique")
                print("7.soigner réseau")
                print("8.detruire réseau")
                print("9.lister les événement")

                tmpOptionsChoice = input("\nentrer votre choix (0: retour): ")
                try:
                    tmpOptionsChoice = int(tmpOptionsChoice)
                except TypeError:
                    tmpOptionsChoice = -1
                finally:
                    optionsChoice = tmpOptionsChoice

                if optionsChoice == 1:
                    if homeAutomationSystem.home.homeAutomationNetwork.isReady:
                        homeAutomationSystem.home.stop_automation_network()
                    else:
                        homeAutomationSystem.home.start_automation_network()

                elif optionsChoice == 2:
                    location = moduleName = ""
                    roomChoice = tmpRoomChoice = 0
                    x=1

                    print("ajout d'un module\n\n")

                    while roomChoice < 1 or roomChoice > len(homeAutomationSystem.get_home_rooms()):
                        print("selectionner un emplacement\n")
                        for room in homeAutomationSystem.get_home_rooms():
                            print("{}: {}".format(x, room.name))

                        tmpRoomChoice = input('Entrer votre choix: ')
                        try:
                            tmpRoomChoice = int(tmpRoomChoice)
                        except:
                            tmpRoomChoice = 0
                        finally:
                            roomChoice = tmpRoomChoice

                    moduleName = input("\nEnter un nom pour le module: ")

                    location = str(homeAutomationSystem.get_home_rooms()[roomChoice - 1].id)

                    homeAutomationSystem.add_home_automation_module(moduleName,location)

                elif optionsChoice == 3:
                    print("supression d'un module")
                    homeAutomationSystem.del_home_automation_module()

                elif optionsChoice == 4:
                    moduleChoice = tmpModuleChoice = settingChoice = tmpSettingChoice = 0
                    x = 1
                    selectedModule = False

                    print("modification de module\n\n")

                    while moduleChoice < 1 or moduleChoice > len(homeAutomationSystem.get_home_automation_modules()):
                        print("selectionner un module\n")
                        for module in homeAutomationSystem.get_home_automation_modules():
                            print("{}: {}".format(x, module.name))
                            x += 1

                        tmpModuleChoice = input('Entrer votre choix: ')
                        try:
                            tmpModuleChoice = int(tmpModuleChoice)
                        except:
                            tmpModuleChoice = 0
                        finally:
                            moduleChoice = tmpModuleChoice

                    selectedModule = homeAutomationSystem.get_home_automation_modules()[moduleChoice - 1]

                    while settingChoice < 1 or settingChoice > 2:
                        print("1.modifier le nom")
                        print("2.modifier l'emplacement")

                        tmpSettingChoice = input('Entrer votre choix: ')
                        try:
                            tmpSettingChoice = int(tmpSettingChoice)
                        except:
                            tmpSettingChoice = 0
                        finally:
                            settingChoice = tmpSettingChoice

                    if tmpSettingChoice == 1:
                        newName = ""
                        newName = input("Entrer le nouveau nom du module")

                        selectedModule.set_name(newName)
                        homeAutomationSystem.save_home_automation_network_modification()

                    if tmpSettingChoice == 2:
                        location = ""
                        roomChoice = tmpRoomChoice = 0
                        x = 1

                        while roomChoice < 1 or roomChoice > len(homeAutomationSystem.get_home_rooms()):
                            print("selectionner un emplacement\n")
                            for room in homeAutomationSystem.get_home_rooms():
                                print("{}: {}".format(x, room.name))

                            tmpRoomChoice = input('Entrer votre choix: ')
                            try:
                                tmpRoomChoice = int(tmpRoomChoice)
                            except:
                                tmpRoomChoice = 0
                            finally:
                                roomChoice = tmpRoomChoice

                        location = str(homeAutomationSystem.get_home_rooms()[roomChoice - 1].id)

                        selectedModule.set_location(location)
                        homeAutomationSystem.save_home_automation_network_modification()

                elif optionsChoice == 5:
                    moduleChoice = tmpModuleChoice = settingChoice = tmpSettingChoice = 0
                    x = 1
                    selectedModule = False

                    print("manipulation de module\n\n")

                    while moduleChoice < 1 or moduleChoice > len(homeAutomationSystem.get_home_automation_modules()):
                        print("selectionner un module\n")
                        for module in homeAutomationSystem.get_home_automation_modules():
                            print("{}: {}".format(x, module.name))
                            x+1

                        tmpModuleChoice = input('Entrer votre choix: ')
                        try:
                            tmpModuleChoice = int(tmpModuleChoice)
                        except:
                            tmpModuleChoice = 0
                        finally:
                            moduleChoice = tmpModuleChoice

                    selectedModule = homeAutomationSystem.get_home_automation_modules()[moduleChoice - 1]

                    print('\n')
                    print('####################')
                    for value in selectedModule.moduleNode.get_values():
                        print("{}: {}".format(selectedModule.moduleNode.get_values()[values].label, selectedModule.moduleNode.get_values()[values].data))

                    if isinstance(selectedModule, Bulb):
                        optionsChoice = tmpOptionsChoice = 0
                        x = 1
                        xMax = 1
                        while optionsChoice < 1 or optionsChoice > xMax:
                            if selectedModule.lightUp:
                                print("1.eteindre")
                            else:
                                print("1.allumer")

                            if isinstance(selectedModule ,RgbBulb):
                                xMax = 2
                                print("2.changer la couleur")

                            tmpOptionsChoice = input("\nentrer votre choix: ")

                            try:
                                tmpOptionsChoice = int(tmpOptionsChoice)
                            except TypeError:
                                tmpOptionsChoice = -1
                            finally:
                                optionsChoice = tmpOptionsChoice

                        if optionsChoice == 1:
                            if selectedModule.lightUp:
                                selectedModule.off()
                            else:
                                selectedModule.on()
                        elif optionsChoice ==2:
                            colorChoice = tmpColorChoice = 0
                            selectedColor = False
                            x = 1

                            for color in selectedModule.colorPalette:
                                print("{}: {}".format(x, color))
                                x += 1

                            tmpColorChoice = input("Entrer votre choix: ")
                            try:
                                tmpColorChoice = int(tmpColorChoice)
                            except:
                                tmpColorChoice = 0
                            finally:
                                colorChoice = tmpColorChoice

                            selectedColor = selectedModule.colorPalette[colorChoice - 1]

                            selectedModule.set_color(selectedColor)

                    elif isinstance(selectedModule, MultiSensor):
                        optionsChoice = tmpOptionsChoice = 0
                        x = 1
                        xMax = 1
                        while optionsChoice < 1 or optionsChoice > xMax:
                            if 'temperature' in selectedModule.sensors.keys():
                                print("1.recuperer la temperature")
                            if 'luminosity' in selectedModule.sensors.keys():
                                xMax = 2
                                print("2.recuperer niveau de luminosité")

                            tmpOptionsChoice = input("entrer votre choix: ")

                            try:
                                tmpOptionsChoice = int(tmpOptionsChoice)
                            except TypeError:
                                tmpOptionsChoice = 0
                            finally:
                                optionsChoice = tmpOptionsChoice

                        if optionsChoice == 1:
                            print("temperature: {}°c".format(selectedModule.sensors['temperature'].temperature))
                        elif optionsChoice == 2:
                            print("luminosité: {}lux".format(selectedModule.sensors['luminosity'].luminosity))

                elif optionsChoice == 6:
                    print('listing des modules\n')
                    for element in homeAutomationSystem.get_home_automation_modules():
                        print("-**-----------------")
                        for val in element.moduleNode.get_values():
                            print(element.moduleNode.get_values()[val].label)
                            print(element.moduleNode.get_values()[val].data)
                        print(element)

                elif optionsChoice == 7:
                    print("soin du réseau")
                    homeAutomationSystem.heal_automation_network()

                elif optionsChoice == 8:
                    print("destruction du réseau")
                    homeAutomationSystem.destroy_automation_network()

                elif optionsChoice == 9:
                    print("listing des événement")
                    for event in homeAutomationSystem.get_event():
                        print(event)

        elif choice == 0:
            homeAutomationSystem.stop()

        else:
            pass



if __name__ == '__main__':
    main()