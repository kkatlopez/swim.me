# Software Development - swim.me
ITWS 6700, Spring 2022

Kat Lopez, Lanya Xiang, Matthew Youngbar, Gwyneth Yuen

## Project Description
**swim.me** is a progressive web application built with the MERN stack: MongoDB as the database, Express and React as the client-side, and Node to run the server. Our application consolidates data from [swimcloud.com](https://www.swimcloud.com), a website that displays swimming-related information such as swim meet results, swimmer times, and teams, into a one-stop shop for the Rensselaer Polytechnic Institute (RPI) Swim & Dive, an NCAA Division III team. To scrape swimcloud, a Python scraper was used to obtain all relevant data such as results for meets that RPI has participated in. The application was built upon this data and developed to be a user- and mobile-friendly application.

## Installation
**To setup the dependencies for the Python scraper:**
1. Open your terminal and change the directory to the project
2. Run `cd server` to change the directory to the server folder
3. Run `python -m pip install -r requirements.txt`

**To run the server:**
1. Run `npm install --legacy-peer-deps` in the same directory as the one listed above
2. Run `npm start`

**To start the client:**
1. Open another terminal window and change the directory to the project
2. Run `cd client` to change the directory to our client folder
3. Run `npm install --legacy-peer-deps`
4. Run `npm start`

## Other Links
Figma link for high fidelity mockups: https://www.figma.com/proto/rpXX7rce6HMEcruOagAwVE/Prototypes?page-id=0%3A1&node-id=2%3A2&viewport=330%2C48%2C0.14&scaling=scale-down&starting-point-node-id=2%3A2
