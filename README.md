# Software Development
ITWS 6700, Spring 2022

Kat Lopez, Lanya Xiang, Matthew Youngbar, Gwyneth Yuen


npm config set python

python -m pip install -r requirements.txt

Figma link for high fidelity mockups: https://www.figma.com/proto/rpXX7rce6HMEcruOagAwVE/Prototypes?page-id=0%3A1&node-id=2%3A2&viewport=330%2C48%2C0.14&scaling=scale-down&starting-point-node-id=2%3A2

Current flow for meet pages: MeetResults.js (with MeetCard.js) > SpecificMeet.js (with SpecificMeetCard.js) > Event.js

Current flow for swimmer time search: TimesSearch.js > Times.js

THINGS WE NEED TO DO:
- Implement search on Roster.js, Times.js (Lanya's code)
- Matthew: Import data (hometown, best strokes, class year, etc.) to database for Roster.js and RosterCard.js
- Matthew: Get scores for each meet and display on SpecificMeet.js
- Matthew and Gwyneth: Admin + coach pages
    • Create alerts
    • Create, edit, delete users
    • Edit swimmer info
- Login system
- Firebase messaging