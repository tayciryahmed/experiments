"""
@author: Taycir Yahmed
@description: read configuration parameters
"""

import json


class read_config():
    def __init__(self):
        pass

    def read_configuration_file(self, configuration_file_name):
        """
        @description: read a json configuration file
        @param configuration_file_name : configuration file name
        @return : the configuration object
        """
        with open(configuration_file_name, "r") as config_file:
            configuration_info = json.load(config_file)

        return configuration_info

    def load_config(self, arg):
        """
        @description : load configuration from config json files
        @return : configuration parameters
        """

        app_configuration_file = arg

        app_configs = self.read_configuration_file(app_configuration_file)

        return app_configs
