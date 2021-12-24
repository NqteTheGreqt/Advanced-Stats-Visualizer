import requests
import csv
from bs4 import BeautifulSoup

URL = "https://www.hockey-reference.com/leagues/NHL_2021_skaters-advanced.html"
page = requests.get(URL)

soup = BeautifulSoup(page.content, "html.parser")

table = soup.find(class_="sortable stats_table now_sortable")

data = []

for table in soup.select('.stats_table'):
    for tr in table.tbody.find_all("tr", class_=""):
        player_stats = []
        for td in tr.find_all('td'):
            player_stats.append(td.get_text())
        data.append(player_stats)


with open("C:\\Users\\Nathan\\Advanced-Stats-Visualizer\\AdvancedStats.csv", 'w', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(['Player', 'Age', 'Team', 'Position', 'GP', 'CF', 'CA', 'CF%', 'CF rel', 'FF', 'FA', 
    'FF%', 'FF rel', 'oiSH%', 'oiSV%', 'PDO', 'oZS%', 'dZS%', 'TOI/60', 'TOI(EV)', 'TK', 'GV', 'E+/-', 
    'SAtt.', 'Thru%'])
    writer.writerows(data)

file = open("C:\\Users\\Nathan\\AdvancedStats.csv")

reader = csv.reader(file)

header = []
header = next(reader)

rows = []

total_GP = 0
total_TOI = 0

for row in reader:
    rows.append(row)
    total_GP += float(row[4])
    toi = row[18].split(":")
    total_TOI += float(toi[0]) * 60 + float(toi[1])
    
print("Average GP: ", (total_GP) / len(rows))
print("Average TOI: ", (total_TOI) / len(rows) / 60)


file.close()




#print(results)
"""
job_elements = results.find_all("div", class_="card-content")

for job_element in job_elements:
    title_element = job_element.find("h2", class_="title")
    company_element = job_element.find("h3", class_="company")
    location_element = job_element.find("p", class_="location")
    print(title_element.text.strip())
    print(company_element.text.strip())
    print(location_element.text.strip())
    print()


python_jobs = results.find_all(
    "h2", string=lambda text: "python" in text.lower())

print(len(python_jobs))
"""