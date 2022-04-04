from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

mongoPass = os.getenv('MONGOPASS')
dbName = os.getenv('DBNAME')
client = MongoClient('mongodb+srv://' + mongoPass + '@cluster0.eeewg.mongodb.net/' + dbName)

db = client['swimdotme']
swimmerCollection = db['swimmer-info']

for swimmer in swimmerCollection.find({}):
    events = set()
    bests = []
    for best in swimmer['bestTimes']:
        if best[0] not in events:
            bests.append(best)
            events.add(best[0])
    print(bests)
    newvalues = { "$set": { 'bestTimes': bests} }
    swimmerCollection.update_one(swimmer, newvalues)
