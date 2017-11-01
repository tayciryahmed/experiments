"""
@author: Taycir Yahmed
@description: logging to kafka
"""

from time import gmtime, strftime
from kafka import KafkaProducer


class log_to_kafka():

    def __init__(self, app_configs):
        self.app_configs = app_configs

    def write_log_to_kafka(self, spark, message, mode="D"):
        """
        a wrapper function to publish debug messages in kafka
        @param message: a string that is the message to write
        @param mode: the mode in which to yield the message
        @return : none
        """

        bootstrap_servers = self.app_configs["bootstrap_servers"]
        log_topic = self.app_configs["log_topic"]

        # dictionary to hold all possible debug modes
        # 3 modes, names are self expanatory

        debug_modes = {"D": "DEBUG", "P": "PERFORMANCE", "R": "RESULTS"}
        debug_message = {
            "project_name": "test",
            "time": strftime("%Y-%m-%d %H:%M:%S", gmtime()),
            "debug_modes": debug_modes[mode],
            "message": message,
            "app_unique_identifier": spark.sparkContext.applicationId,
            "app_name": spark.sparkContext.appName,
            "spark_version": spark.sparkContext.version

        }

        # publish to kafka           
        producer = KafkaProducer(bootstrap_servers=bootstrap_servers)
        producer.send(log_topic, debug_message)
        producer.flush()

        return
