class Module:
    '''
         class representing an module

            attributes:
                moduleNode; network node of the module

            property:
                id; id of the module
                name: name of the element
                location: location of the element

                is awake
                is failed
                is ready
                is sleeping

                manufacturer name
                product name
                product type

                device type

            methods:
                set name: allows to modify the name of the element
                set location: allows to modify the location of the element

                get battery level

                heal
    '''


    def __init__(self, moduleNode):
        """
            constructor of the class

                parameter:
                    module node
        """

        self.moduleNode = moduleNode


    @property
    def id(self):
        return self.moduleNode.node_id


    @property
    def name(self):
        return self.moduleNode.name


    @property
    def location(self):
        return self.moduleNode.location


    @property
    def isAwake(self):
        return self.moduleNode.is_awake


    @property
    def isSleeping(self):
        return self.moduleNode.is_sleeping


    @property
    def isReady(self):
        return self.moduleNode.is_ready


    @property
    def isFailed(self):
        return self.moduleNode.is_failed


    @property
    def manufacturerName(self):
        return self.moduleNode.manufacturer_name


    @property
    def productName(self):
        return self.moduleNode.product_name


    @property
    def productType(self):
        return self.moduleNode.product_type


    @property
    def deviceType(self):
        return self.moduleNode.device_type

    @property
    def batteryLevel(self):
        self.moduleNode.get_battery_levels()


    def set_name(self, name):
        self.moduleNode.set_field('name', name)


    def set_location(self, location):
        self.moduleNode.set_field('location', location)


    def __str__(self):
        return '{}: {}\n{}: {}\n{}: {}\n{}: {}\n{}: {}\n{}: {}\n{}: {}\n{}: {}\n{}: {}\n{}: {}\n{}: {}\n {}: {}'.format(
            'id', self.id, 'name', self.name, 'location', self.location, "reveiller", self.isAwake,
            "malfonctionnement", self.isFailed, "pret", self.isReady, "dort", self.isSleeping,
            "nom du fabriquant", self.manufacturerName, "nom de produit", self.productName,
            "type de produit", self.productType, "type de systeme", self.deviceType,
            "nieau de batterie", self.batteryLevel )
