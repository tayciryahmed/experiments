"""
@author: Taycir Yahmed 
@description: starter code for reading data from hdfs to spark streaming on the cluster. 
"""

from __future__ import print_function
from pyspark import SparkContext, SparkConf
from pyspark.streaming import StreamingContext
import sys

if __name__ == "__main__":

    conf = (SparkConf().setMaster(
        "yarn-cluster").setAppName("StreamingFromHDFS"))
    sc = SparkContext(conf=conf)

    ssc = StreamingContext(sc, 1)

    lines = ssc.textFileStream("hdfs://<cluster>/user/<ipn>/<directory_name>")

    counts = lines.flatMap(lambda line: line.split(" "))\
        .map(lambda x: (x, 1))\
        .reduceByKey(lambda a, b: a + b)

    counts.pprint()

    ssc.start()
    ssc.awaitTermination()

    sc.stop()
