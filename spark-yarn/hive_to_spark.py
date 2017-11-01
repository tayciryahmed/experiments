"""
@author: Taycir Yahmed 
@description: starter code for reading data from hive to spark on the cluster. 
"""

from pyspark import SparkConf, SparkContext
from pyspark.sql import HiveContext

if __name__ == "__main__":

    conf = (SparkConf().setMaster("yarn-cluster").setAppName("hive_to_spark"))
    sc = SparkContext(conf=conf)
    hiveContext = HiveContext(sc)

    # load the data into a dataframe
    df = hiveContext.sql("FROM db_name.table_name SELECT * ")

    # print the dataframe columns
    df.printSchema()

    sc.stop()
