from pymongo import MongoClient
from dotenv import load_dotenv
from selenium import webdriver
import os
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
import json

executable_path = ChromeDriverManager().install()


load_dotenv()
mongoPass = os.getenv('MONGOPASS')
dbName = os.getenv('DBNAME')
client = MongoClient('mongodb+srv://' + mongoPass + '@cluster0.eeewg.mongodb.net/' + dbName)


db = client['swimdotme']
swimmerCollection = db['swimmer-info']

caps = DesiredCapabilities.CHROME
caps['goog:loggingPrefs'] = {'performance': 'ALL'}


options = webdriver.ChromeOptions()
options.add_argument("--window-size=1920,1080")

driver = webdriver.Chrome(executable_path, desired_capabilities=caps,options=options)

# roster_url = 'https://rpiathletics.com/sports/mens-swimming-and-diving/roster'
roster_url = 'https://rpiathletics.com/sports/womens-swimming-and-diving/roster'

driver.get(roster_url)

html = driver.page_source


start = html.find('script type="application/ld+json"')
end = html.find('</script>', start)

text = html[start:end].strip('script type="application/ld+json">')

imgs = json.loads(text)
print(imgs['item'])

for person in imgs['item']:
    first, last = tuple(person['name'].split(" ", 1))
    nameQuery = { "firstName": first, "lastName": last }
    print(nameQuery)
    swimmer = swimmerCollection.find_one(nameQuery)
    if swimmer == None:
        nameQuery = { "lastName": last }
        swimmer = swimmerCollection.find_one(nameQuery)
        if swimmer == None:
            continue

    newvalues = { "$set": {'picture': person['image']['url']}}
    swimmerCollection.update_one(swimmer, newvalues)



driver.quit()
