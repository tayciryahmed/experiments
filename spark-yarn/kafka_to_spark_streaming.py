"""
@author: Taycir Yahmed 
@description: starter code for reading data from kafka topics to spark streaming on the cluster. 
"""

from __future__ import print_function
from pyspark import SparkContext, SparkConf
from pyspark.streaming import StreamingContext
from pyspark.streaming.kafka import KafkaUtils


class kafka_to_spark():
    def __init__(self):
        pass

    def setConfiguration(self):
        """
        a function to set configuration params
        @return configuration params : zk, topic , app_name , batch_duration , master
        """
        zk = "url:port"
        topic = "topic_name"
        app_name = "kafka_to_spark"
        batch_duration = 10
        master = "yarn-cluster"

        return zk, topic, app_name, batch_duration, master

    def main(self):

        # loading configuration parameters (from a config file when working on a project)
        zk, topic, app_name, batch_duration, master = self.setConfiguration()

        # initiate the spark context / streaming context
        conf = (SparkConf().setMaster(master))
        sc = SparkContext(appName=app_name, conf=conf)
        ssc = StreamingContext(sc, batch_duration)

        # reading data to kafka
        kvs = KafkaUtils.createStream(
            ssc, zk, "spark-streaming-consumer", {topic: 1})
        lines = kvs.map(lambda x: x[1])

        lines.pprint()

        ssc.start()  # Start the computation
        ssc.awaitTermination()  # Wait for the computation to terminate
        sc.close()


if __name__ == '__main__':
    ks = kafka_to_spark()
    ks.main()
