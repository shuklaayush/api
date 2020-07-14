import pandas as pd
import re
from pathlib import Path
import logging
import sys
import os
# Set logging level
logging.basicConfig(stream=sys.stdout,
                    format="%(message)s",
                    level=logging.INFO)

def fetch_raw_data_from_api(current_ver=8):
    '''
    Read all raw data and death and recovery files
    Pass the latest version of raw data
    '''
    raw_d = []
    l = []
    [l.append(str(i)) for i in range(1,current_ver+1)];
    for i in l:
        logging.info(f"Fetching raw_data{i} ")
        url = f"https://api.covid19india.org/csv/latest/raw_data{i}.csv"
        df = pd.read_csv(url)
        df.to_csv(f'./Data/tmp/csv/latest/raw_data{i}.csv',index=False)
        raw_d.append(df)

    death_rec = []
    logging.info(f"Fetching deaths_and_recoveries")
    url = f"https://api.covid19india.org/csv/latest/death_and_recovered"
    df = pd.read_csv(f"{url}1.csv")
    death_rec.append(df)
    df.to_csv('./Data/tmp/csv/latest/death_and_recovered1.csv',index=False)
    df = pd.read_csv(f"{url}2.csv")
    death_rec.append(df)
    df.to_csv('./Data/tmp/csv/latest/death_and_recovered2.csv',index=False)

    
    return raw_d,death_rec

def fetch_raw_data():
    '''
    Read all raw data and death and recovery files
    Return the latest number of raw data files
    '''
    current_ver = 0
    raw_d = []
    death_rec = []
    fpath = Path('tmp/csv/latest')
    
    for filename in os.listdir(fpath):
        if re.match(string=filename,pattern=r'raw_data'):
            current_ver = current_ver + 1
            df = pd.read_csv(fpath / filename)
            raw_d.append(df)
        if re.match(string=filename,pattern=r'death_and_recovered'):
            df = pd.read_csv(fpath / filename)
            death_rec.append(df)

    logging.info(f"Data read complete")

    return raw_d,death_rec,current_ver

def fix_rawdata1and2(raw,rec):
    '''
    Raw Data 1 and 2 had different format
    Select necessary columns and change data types
    Add death and recovery data to raw_data
    '''
    
    collist = ['Entry_ID', 'State Patient Number', 'Date Announced', 'Age Bracket',
       'Gender', 'Detected City', 'Detected District', 'Detected State',
       'State code', 'Num Cases', 'Current Status',
       'Contracted from which Patient (Suspected)', 'Notes', 'Source_1',
       'Source_2', 'Source_3', 'Nationality', 'Type of transmission',
       'Status Change Date', 'Patient Number']
    
    raw['Num Cases'] = 1
    raw['Entry_ID'] = 0
    raw['Current Status'] = "Hospitalized"
    raw = raw.fillna('')
    raw = raw[collist]

    
    rec['Num Cases'] = 1
    rec['Entry_ID'] = 0
    rec['Current Status'] = rec['Patient_Status']
    rec['Date Announced'] = rec['Date']
    rec['State code'] = rec['Statecode']
    rec['Detected City'] = rec['City']
    rec['Status Change Date'] = ''
    rec['Contracted from which Patient (Suspected)'] = ''
    rec['Detected State'] = rec['State']
    rec['Detected District'] = rec['District']
    rec['Patient Number'] = rec['Patient_Number (Could be mapped later)']
    rec['State Patient Number'] = ''
    rec['Type of transmission'] = ''
    rec = rec.fillna('')
    rec = rec[collist]
    
    raw = raw.append(rec)
    
    return raw
    

def merge_alldata(current_ver):
    '''
    Merge it all together
    '''
    allraw = fix_rawdata1and2(raw_d[0],death_rec[0])
    tmp = fix_rawdata1and2(raw_d[1],death_rec[1])
    allraw = allraw.append(tmp)

    for i in range(2,current_ver):
        tmp = raw_d[i]
        tmp = tmp.fillna('')
        allraw = allraw.append(tmp)
    
    # Remove unnecessary columns
    allraw.drop(columns=['Estimated Onset Date','Backup Notes','Status Change Date'],inplace=True)
    return allraw


if __name__ == "__main__":
    logging.info('''----------------------------------------------------------------------''')
    logging.info('''Build one true raw data''')
    try:
        raw_d,death_rec,current_ver = fetch_raw_data()
    except Exception as e:
        logging.error(f"Error while reading the files")
        raise

    allraw = merge_alldata(current_ver)
    allraw.to_csv('tmp/csv/latest/raw_data.csv',index=False)
    logging.info('''Raw Data saved''')
    logging.info('''----------------------------------------------------------------------''')
