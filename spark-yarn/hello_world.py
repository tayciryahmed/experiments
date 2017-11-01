"""
@author: Taycir Yahmed 
@description: starter code for using pyspark on the cluster. 
"""

from pyspark import SparkConf, SparkContext

# all your import below
# ...

if __name__ == "__main__":
    conf = (SparkConf().setMaster("yarn-cluster").setAppName("hello"))
    sc = SparkContext(conf=conf)

    # beginning of your script
    print ("Hello from pyspark !")

    # ...

    # end of your script

    sc.stop()
