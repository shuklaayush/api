import pandas as pd
import numpy as np
import re
import json
from pathlib import Path
import logging
import sys

# Set logging level
logging.basicConfig(stream=sys.stdout, format="%(message)s", level=logging.INFO)


def make_int_if_possible(c):
    """
    Names and tags are strings. Return as is.
    csv has tested values as strings.
    Convert them to integer if possible
    """
    if isinstance(c, str):
        return c
    try:
        return int(c)
    except ValueError:
        return ""


def parse_testing(x):
    """
    Keep ranking,population,state and district name
    If Testing data is not nan for a date, keep it.
    Returns dictionary for each district.
    """
    rgx = re.compile(r"[0-9]*\/[0-9]*\/[0-9]*")
    date = ""
    per_day = {}
    per_dist = {}

    for k in x.keys():
        if re.match(rgx, k):
            if date != str(k[0:10]):
                date = k
                try:
                    np.isnan(x[k])
                    continue
                except TypeError:
                    
                    per_day = {
                        k[0:10]: {
                            "tested": make_int_if_possible(x[k]),
                            "positive": make_int_if_possible(x[k + ".1"]),
                            "negative": make_int_if_possible(x[k + ".2"]),
                            "source1": make_int_if_possible(x[k + ".3"]),
                            "source2": make_int_if_possible(x[k + ".4"]),
                        }
                    }
                    per_dist.update(per_day)
            else:
                continue
        else:
            per_dist.update({k.lower(): make_int_if_possible(x[k])})
    return per_dist


if __name__ == "__main__":
    dist_testing = []

    logging.info("------------\nLoad district_testing.csv")
    path = Path("tmp", "csv/latest/district_testing.csv")
    df = pd.read_csv(path)
    ind_di = df.to_dict("index")

    for i in range(1, len(ind_di)):
        dist_testing.append(parse_testing(ind_di[i]))
    ddt = {"district_testing": dist_testing}
    logging.info("Save district_testing.json\n------------")
    with open(Path("tmp", "district_testing.json"), "w") as js:
        json.dump(ddt, js)

