import nltk
import pandas as pd
import re


def add_nltk_pos(df):
    a = dict(nltk.pos_tag(df["word"]))
    b = []

    for i in df["word"]:
        i = str(i)
        if i.isspace():
            b.append(" ")
        elif i in a:
            b.append(a[i])
        else:
            b.append("nan")

    df["ps"] = b

    return df


def add_nltk_majus(df):
    r = re.compile("[A-Z][a-z]*")

    b = []
    for i in df["word"]:
        i = str(i)
        if i.isspace():
            b.append(" ")
        elif r.match(i):
            b.append(1)
        else:
            b.append(0)

    df["maj"] = b
    return df


df_train = pd.read_csv('corpusEN/eng.train', sep=" ",
                       encoding='utf-8', nrows=100000,
                       names=["word", "pos_i", "chunck", "target"],	 header=0)

df_train = add_nltk_majus(df_train)
df_train = add_nltk_pos(df_train)
df_train = df_train[['word', 'pos_i', 'chunck',  'maj', 'ps', 'target']]
df_train.to_csv('eng_train_more_fea.csv',
                encoding='utf-8', index=False, sep=" ")

df_test = pd.read_csv('corpusEN/eng.test', sep=" ",
                      encoding='utf-8', nrows=100000,
                      names=["word", "pos_i", "chunck", "target"],	 header=0)

df_test = add_nltk_majus(df_test)
df_test = add_nltk_pos(df_test)
df_test = df_test[['word', 'pos_i', 'chunck',  'maj', 'ps', 'target']]

df_test.to_csv('eng_test_more_fea.csv', encoding='utf-8', index=False, sep=" ")
