#!/usr/bin/python3


from classes.homeAutomationEngine import *
from classes.modules.bulb import *
from classes.modules.rgbBulb import *

from classes.modules.sensors.sensor import *
from classes.modules.sensors.multiSensor import *

def main():
    operating = False
    x = userChoice = selection = 0
    selectedItem = False


    engine = HomeAutomationEngine("/dev/ttyACM0",
                    "env/lib/python3.7/site-packages/python_openzwave/ozw_config",
                    "log.log")


    if engine.start():
        operating = True
    else:
        operating = False
        print('erreur de démarrage de systeme de gestion de domicile')


    while operating:
        x = userChoice = selection = 0

        while userChoice < 1 or userChoice > 6:
            selection = 0

            print("\n\nMenu Principal\n\n")
            print("1.afficher le home id")
            print("2.soigner réseau")
            print("3.ajouter un module")
            print("4.exclure un module")
            print("5.lister les modules ")
            print('6.lister les modules endormis')
            print("7.gerer les modules")
            print("8.voir les évenement")
            print("9.quitter")

            selection = input("\nEntrer votre choix: ")
            try:
                selection = int(selection)
            except:
                selection = 0

            userChoice = selection

            if userChoice == 1:
                print("home id: {}".format(engine.network.homeId))
            elif userChoice == 2:
                engine.network.heal()
            elif userChoice == 3:
                engine.network.mainController.add_node()
            elif userChoice == 4:
                engine.network.mainController.remove_node()
            elif userChoice == 5:
                for module in engine.modulesList:
                    print(module.productName)
            elif userChoice == 6:
                for module in engine.sleepingModulesList:
                    print(module.productName)
            elif userChoice == 7:
                choice = True

                while choice:
                    selection = -1
                    print('Menu de selection\n\n')
                    while selection < 0 or selection > engine.moduleCounter:
                        tmpSelection = -1
                        x = 0

                        for module in engine.modulesList:
                            print("{}: {}\n".format(x+1, module.name))
                            x += 1

                        tmpSelection = input("\nentrer votre choix (0: quitter): ")

                        try:
                            tmpSelection = int(tmpSelection)
                        except:
                            tmpSelection = -1

                        selection = tmpSelection

                    selection = selection

                    if selection == 0:
                        choice = False
                        break
                    else:
                        selectedEngine = engine.modulesList[selection - 1]
                        print(selectedEngine)

                        print("\n\n")
                        r = selectedEngine.moduleNode.get_sensors()
                        for v in r:
                            print("{}: {}".format(selectedEngine.moduleNode.get_sensors()[v].label,
                                                  selectedEngine.moduleNode.get_sensors()[v].data))
                        print("\n\n")

                        print("Menu:\n\n")

                        userSelection = -1
                        xMax = 6

                        while userSelection < 0 or userSelection > xMax:
                            tmpUserSelection = -1

                            print("1.modifier le nom")
                            print("2.modifier emplacement")
                            print("3.voir config")
                            print("4.voir les dimmers")
                            print("5.voir les valeurs")
                            print("6.voir classe de commande")

                            if isinstance(selectedEngine, Bulb):
                                xMax = 8
                                print("7.allumer")
                                print("8.éteindre")

                                if isinstance(selectedEngine, RgbBulb):
                                    xMax = 9
                                    print('9.changer couleur')

                            elif isinstance(selectedEngine, MultiSensor):
                                xMax = 11
                                print(selectedEngine.sensors.keys())

                                if 'temperature' in selectedEngine.sensors.keys():
                                    print("10.recuperer temperature")
                                if 'luminosity' in selectedEngine.sensors.keys():
                                    print("11.recuperer niveau de luminosité")

                            tmpUserSelection = input("entrer votre choix (0: quitter): ")

                            try:
                                tmpUserSelection = int(tmpUserSelection)
                            except:
                                tmpUserSelection = -1

                            userSelection = tmpUserSelection

                        if userSelection == 0:
                            pass
                        elif userSelection == 1:
                            name = ""

                            name = input("entrer un nom")

                            selectedEngine.set_name(name)

                        elif userSelection == 2:
                            location = ""

                            location = input("entrer une localisation(pièce)")

                            selectedEngine.set_location(location)

                        elif userSelection == 3:
                            for value in selectedEngine.moduleNode.get_configs():
                                print("{}: {}".format(selectedEngine.moduleNode.get_configs()[value].label , selectedEngine.moduleNode.get_configs()[value].data))

                        elif userSelection == 4:
                            for value in selectedEngine.moduleNode.get_dimmers():
                                print("{}: {}".format(selectedEngine.moduleNode.get_dimmers()[value].label , selectedEngine.moduleNode.get_dimmers()[value].data))

                        elif userSelection == 5:
                            for value in selectedEngine.moduleNode.get_values():
                                print("{}: {}".format(selectedEngine.moduleNode.get_values()[value].label , selectedEngine.moduleNode.get_values()[value].data))

                        elif userSelection == 6:
                            print(selectedEngine.moduleNode.command_classes_as_string)
                        
                        elif userSelection == 7:
                            selectedEngine.on()

                        elif userSelection == 8:
                            selectedEngine.off()

                        elif userSelection == 9:
                            colorSelection = -1
                            selectedColor = False

                            while colorSelection < 0 or colorSelection > len(selectedEngine.colorPalette):
                                x = 1
                                tmpColor = -1

                                print("Menu de sélection de couleur\n\n")
                                for color in selectedEngine.colorPalette:
                                    print("{}: {}".format(x, color.name))
                                    x += 1

                                tmpColor = input("entrer votre choix(0:quitter): ")

                                try:
                                    tmpColor = int(tmpColor)
                                except:
                                    colorSelection = -1

                                colorSelection = tmpColor

                            if colorSelection == 0:
                                pass
                            else:
                                selectedColor = selectedEngine.colorPalette[colorSelection -1]

                                selectedEngine.set_color(selectedColor)

            elif userChoice == 8:
                for event in engine.network.eventList:
                    print(event)

            elif userChoice == 9:
                engine.stop()
                operating = False
                break


if __name__ == '__main__':
    main()