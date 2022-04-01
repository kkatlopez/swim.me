from pymongo import MongoClient
from SwimScraper import SwimScraper as ss
from datetime import date, datetime
import os
from dotenv import load_dotenv

load_dotenv()
mongoPass = os.getenv('MONGOPASS')
dbName = os.getenv('DBNAME')
client = MongoClient('mongodb+srv://' + mongoPass + '@cluster0.eeewg.mongodb.net/' + dbName)

db = client['swimdotme']
meetCollection = db['meet-info']
swimmerCollection = db['swimmer-info']

meet_list = []

for y in range(date.today().year - 5, date.today().year+1):
    try:
        meet_year = ss.getTeamMeetList(team_name = 'Rensselaer Polytechnic Institute', year = y)
    except:
        print("Meets not found for year", y)
    else:
        for meet in meet_year:
            meet.update({"season":str(y)+"-"+str(y+1)})
        meet_list += meet_year

for meet in meet_list:
    if '–' not in meet['meet_date']:
        print(meet['meet_date'].find('-'))
        print(meet['meet_date'])
        meetDate = datetime.strptime(meet['meet_date'], '%b %d, %Y')
        endDate = meetDate
    else:
        d = meet['meet_date']

        endDay = d[d.find('–')+1:d.find(',')]

        d = d[:d.find('–')] + d[d.find(','):]
        meetDate = datetime.strptime(d, '%b %d, %Y')
        if endDay.isnumeric():
            endDate = datetime(meetDate.year, meetDate.month, int(endDay))
        else:
            endDate = datetime.strptime(d[d.find('–')+1:], '%b %d, %Y')
    myquery = { "meetStartDate": meetDate, "meetName": meet['meet_name'] }

    matchingMeets = meetCollection.find_one(myquery)

    if matchingMeets == None:
        newMeet = dict()
        newMeet["meetName"] = meet['meet_name']
        newMeet["meetStartDate"] = meetDate
        newMeet["meetEndDate"] = endDate
        newMeet["meetLocation"] = meet['meet_location']
        events = []
        teams = set()
        for event in ss.getMeetEventList(meet['meet_ID']):
            print(event)
            # the 'F' parameter is ignored:
            event_times = []
            try:
                for time in ss.getCollegeMeetResults(meet['meet_ID'], '', 'F', event_ID = event['event_ID'], event_href = event['event_href']):
                    teams.add(time['team_name'])

                    if 'Relay' in event['event_name']:
                        event_times.append([time['team_name'], time['time']])
                    else:
                        event_times.append([time['swimmer_name'], time['time']])
                        first, last = time['swimmer_name'].split(' ', 1)
                        nameQuery = { "firstName": first, "lastName": last }

                        if time['team_ID'] == '45': # hard coded for RPI
                            swimmer = swimmerCollection.find_one(nameQuery)
                            eventName = event['event_name'].lower().strip("men").strip("women").strip().title()
                            if swimmer == None:
                                nameQuery.update({ 'eventsSwam': [eventName], 'bestTimes': [[eventName, time['time'], meet['meet_name'], meetDate]], 'meetsSwam': [[meet['meet_name'], meetDate]],'seasonsSwam':[meet['season']]})
                                swimmerCollection.insert_one(nameQuery)
                            else:
                                if meet['season'] not in swimmer['seasonsSwam']:
                                    newvalues = { "$set": { 'seasonsSwam': swimmer['seasonsSwam'] + [meet['season']] }}
                                    swimmerCollection.update_one(swimmer, newvalues)
                                if [meet['meet_name'], meetDate] not in swimmer['meetsSwam']:
                                    newvalues = { "$set": {'meetsSwam': swimmer['meetsSwam'] + [[meet['meet_name'], meetDate]]}}
                                    swimmerCollection.update_one(swimmer,newvalues)

                                if time['time'] != 'DQ' and time['time'] != 'NS' and time['time'] != 'DFS':
                                    if eventName not in swimmer['eventsSwam']:
                                        newvalues = { "$set": { 'eventsSwam': swimmer['eventsSwam'] + [eventName], 'bestTimes': swimmer['bestTimes'] + [[eventName, time['time'], meet['meet_name'], meetDate]]} }
                                        swimmerCollection.update_one(swimmer, newvalues)
                                    else:
                                        for i in range(len(swimmer['bestTimes'])):
                                            e, t, m, d = swimmer['bestTimes'][i]
                                            if e == eventName:
                                                update = False
                                                if "Diving" in eventName:
                                                    if float(time['time']) > float(t):
                                                        update = True
                                                else:
                                                    if ':' in t:
                                                        time1 = datetime.strptime(t, '%M:%S.%f')
                                                    else:
                                                        time1 = datetime.strptime(t,'%S.%f')
                                                    if ':' in time['time']:
                                                        time2 = datetime.strptime(time['time'], '%M:%S.%f')
                                                    else:
                                                        time2 = datetime.strptime(time['time'], '%S.%f')
                                                    if time2 < time1:
                                                        update = True
                                                if update:
                                                    newBestTimes = swimmer['bestTimes']
                                                    newBestTimes[i] = [eventName, time['time'], meet['meet_name'], meetDate]
                                                    newvalues = { "$set": {'bestTimes': newBestTimes}}
                                                    swimmerCollection.update_one(nameQuery, newvalues)
                                                break


            except:
                print("Error in event", event['event_name'])


            events.append([event['event_name'], event_times])
        newMeet['meetEvents'] = events
        newMeet['meetTeams'] = list(teams)
        print(newMeet)

        meetCollection.insert_one(newMeet)
