#!/usr/bin/env python3

import requests
import lxml.html as lh
import pandas as pd
import numpy as np

scripsArr = [538939, 536848, 533278, 532155, 500294, 505537, 500425, 517354, 532540, 500228, 532478, 539874, 500182, 534309, 500112, 531344, 500010, 500696, 500875, 532523, 532488, 500104, 524804, 532617, 500209, 500247, 532733, 500410, 500770, 532898, 500510, 533519, 500086, 500180, 500257, 539844, 532977, 532814, 500043, 532652, 500300, 533155, 532720, 532689, 532281, 500400, 532215, 532978, 500034, 532454, 532538, 512070, 507685, 540005, 500040, 532953, 500093, 532555, 500575, 500114, 540065, 500164, 500253, 532483, 500260, 532827, 500331, 500547, 532648, 500877, 505200, 500820, 500800, 517334, 530965, 500325, 532174, 540133, 539448, 532187, 500470, 532500, 531642, 500520, 500440, 530019, 500312, 511072, 532921, 532819, 500124, 500477, 500570, 570001, 500096, 524715, 500330, 500087, 535789, 534816, 532755, 540376, 500295, 500469, 532424, 532461, 532134, 532149, 500830, 532343, 532541, 500408, 532899, 500878, 532129, 500302, 511218, 532947, 500103, 500495, 500049, 539957, 500690, 500870, 532868, 539876, 502355, 500271, 532777, 500660, 533228, 500084, 534091, 500110, 500790, 511243, 531213, 500550, 541153, 526299, 500493, 500290, 532321, 500188, 500825, 508869, 526371, 500390, 532296, 500101]

#538939, 536848
qtrid = 102
quarter = "June 2019"
scripDF = pd.DataFrame()
noData = []

for scrip in range(0, len(scripsArr)):

    url = "https://www.bseindia.com/corporates/shpPublicShareholder.aspx?scripcd={scrip}&qtrid={qtrid}&QtrName={quarter}".format(
        scrip=scripsArr[scrip], qtrid=qtrid, quarter=quarter
    )

    # Create a handle, page, to handle the contents of the website
    page = requests.get(url)
    # Store the contents of the website under doc
    doc = lh.fromstring(page.content)
    # Parse data that are stored between <tr>..</tr> of HTML
    tr_elements = doc.xpath(
        '//div[@id="tdData"]/table/tr/td[@bgcolor="#d6d6d6"]/table/tr'
    )

    if (len(tr_elements) == 0):
        noData.append(scripsArr[scrip])
    # Create empty list
    else:
        col = []
        i = 0
        # For each row, store each first element (header) and an empty list
        for t in tr_elements[9]:
            i += 1
            name = t.text_content()
            col.append((name, []))

        # Since out first row is the header, data is stored on the second row onwards
        for j in range(8, len(tr_elements)):
            # T is our j'th row
            T = tr_elements[j]

            # If row is not of size 19, the //tr data is not from our table
            if len(T) != 19:
                break

            # i is the index of our column
            i = 0

            # Iterate through each element of the row
            for t in T.iterchildren():
                data = t.text_content()
                # Check if row is empty
                if i > 0:
                    # Convert any numerical value to integers
                    try:
                        data = int(data)
                    except:
                        pass
                # Append the data to the empty list of the i'th column
                col[i][1].append(data)
                # Increment i for the next column
                i += 1

        Dict = {title: column for (title, column) in col}
        tempDF = pd.DataFrame(Dict)
        headerDF = [
            "Category & Name of the Shareholders",
            "No. of shareholder",
            "No. of fully paid up equity shares held",
            "Total no. shares held",
            "Shareholding calculated as per SCRR, 1957 As a of (A+B+C2)",
            "Total as a % of Total Voting right",
            "No. of Voting Rights",
        ]
        if len(tempDF.columns) > 8:
            for i in range(1, len(tempDF.columns) - 7):
                tempDF = tempDF.drop(tempDF.columns[[-i]], axis=1)

        tempDF.to_csv("Financial_data.csv")
        tempDF = pd.read_csv("Financial_data.csv", header=None, skiprows=1, names=headerDF)
        tempDF.insert(0, "Scrip", scripsArr[scrip])
        scripDF = scripDF.append(tempDF, ignore_index=False)

'''new_DF = pd.DataFrame(
    scripDF.loc[
        scripDF["Category & Name of the Shareholders"] == "Foreign Portfolio Investors"
    ]
)
fileName = "FPI.csv"
new_DF.to_csv(fileName)

new_DF = pd.DataFrame(
    scripDF.loc[
        scripDF["Category & Name of the Shareholders"]
        == "LIFE INSURANCE CORPORATION OF INDIA"
    ]
)
fileName = "LIC.csv"
new_DF.to_csv(fileName)

new_DF = pd.DataFrame(
    scripDF.loc[scripDF["Category & Name of the Shareholders"] == "Mutual Funds/"]
)
fileName = "MF.csv"
new_DF.to_csv(fileName)'''

print('Downloading data... Please follow instructions below: ')
print('1) Apply filter to data\n2) Select "Ascending" under "Category & Name of the Shareholders" column in filter\n3) Move data for scrips to align with remaining data\n4) Insert Pivot table for the data\n5) Under Pivot table tab:\n a) Add "Scrips" to Rows \n b) Add "Category & Name of the Shareholders" to Columns\n c) Filter "Category of Shareholders" as required from dropdown\n d) Add "No. of fully paid up equity shares held" to Values\n e) Add "Shareholding % calculated as per SCRR, 1957 As a % of (A+B+C2)" to Values\n f) Change both Values to Sum from the options ("!" mark beside both options)\n')


print('Scrips for which data not available on BSE:')
print(noData)
#pd.DataFrame(noData).to_csv('No_data.csv')
scripDF.to_csv('Financial_data.csv')
