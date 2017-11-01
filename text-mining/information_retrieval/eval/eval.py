import glob, re, pprint, csv
import xml.etree.ElementTree as ET
from collections import defaultdict
"""
if given result files in the form
score    rd_xx_psq_yy.*

and the annotated question file,
returns the MRR score 
"""

QUESTION_FILE='eval/QA4MRE-2012-EN_GS_annote.xml'

def calculate_mrr(dir, ext):
    ref = get_refs()

    mrr=0
    nb_q=0
    
    #get all files with a given extension. must be called rd_xxx_q_yyy though
    for sim_file in glob.glob(dir+"/*."+ext):
        r = get_first_correct_answer(ref, sim_file)
        if r != -1:
            mrr += 1/r
        nb_q+=1
    return (mrr/nb_q)

def get_refs():
    refs=defaultdict(dict)
    #qcm=open("QA4MRE-2012-EN_GS_annote.xml", "r", encoding="utf-8")
    qcm_tree = ET.parse(QUESTION_FILE)
    root=qcm_tree.getroot()

    for reading_test in root.findall('.//reading-test'):
        for question in reading_test.findall('.//q'):
            for rep in question.findall('.//position'):
                refs[reading_test.attrib['r_id']][question.attrib['q_id']]=rep.attrib['rep']
                #print("rt "+reading_test.attrib['r_id']+" q "+question.attrib['q_id']+" rep "+rep.attrib['rep'])
    return refs
    
def get_first_correct_answer(ref, res_file):

    n=re.match(r".*rd_([0-9]+)_q_([0-9]+)\..*", res_file)
    rank=1
    if n:
        rd_res, q_res=n.group(1), n.group(2)
        # the result file is for a given reading doc and a given question
        # the answer is in the sentence whose id is ref[rd_res][q_res]
        with open(res_file, newline='') as csvfile:
            f = csv.reader(csvfile, delimiter='\t', quotechar='|')
            for row in f:
                score=row[0]
                doc=row[1]
                #m=re.match(r"rd_([0-9]+)_psg_([0-9]+)_([0-9]+)\.", doc)
                m=re.match(r"rd_([0-9]+)_psg_([0-9]+)_([0-9]+)\.", doc)
                #print("nokn"+q_res)
                
                if m:
                    rd, p_deb, p_fin = m.group(1), m.group(2), m.group(3)
                    if(rd == rd_res) and (ref[rd_res][q_res] >= p_deb) and (ref[rd_res][q_res]<=p_fin):
                        print("first correct answer for rd "+rd+ " q "+q_res+" at rank "+str(rank))
                        return rank
                rank+=1
                        
    else:
        print("problem with filename :-(")
    return -1
        
if __name__ == '__main__':
    print("MRR: "+str(calculate_mrr("TPRI_qa4mre/QUESTIONS", "sim.ranked")))
