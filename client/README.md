# Software Development - swim.me

ITWS 6700, Spring 2022

Kat Lopez, Lanya Xiang, Matthew Youngbar, Gwyneth Yuen

## Component Structure
swim.me includes many components. It is easier to understand each one when considering a hierarchical strucutre.

---

#### Log in (`UserLogin.js`)
Upon accessing the application, users are prompted to log in. All passwords are hashed and salted.

---

#### Meet Results (`MeetResults.js`)
This is the default landing page for all users, regardless of status. This page lists all 48 meets RPI has competed in since October 2017 in descending order by date.

- **`MeetCard.js`:** meet card component that populates **MeetResults.js**
- **`SpecificMeet.js`:** full results of a specific meet (i.e., "Liberty League Championships 2022")
- **`SpecificMeetCard.js`:** specific meet card component that populates **SpecificMeet.js**
- **`Event.js`:** full results for an event within a specific meet (i.e., "Men's 500 Yard Freestyle")

---

#### Times Search (`Times.js`)
Users can search through the 113 RPI swimmers and divers since 2017 on this page. You can view times by Meet (selecting a meet from the dropdown), Fastest (best times), or Event (selecting an event from the dropdown).

- **`SwimmerSearch.js`:** dropdown search component included in **`TimesSearch.js`** that lists all 113 athletes
- **`MeetTimes.js`:** displays the meet results for the selected meet for the selected swimmer
- **`FastestTimes.js`:** displays the fastest times for the selected swimmer
- **`EventTimes.js`:** all historical times for an event swam by the selected swimmer
- **`AllTimeTop10.js`:** displays the All-Time Top 10 times for a specific event, by gender (i.e., "Men's 500 Yard Freestyle")
  * **`Top10IndividualEvent.js`:** table that displays the Top 10 times for the specified event
  * Accessed from the link **`SwimmerSearch.js`**

---

#### 2021-2022 Roster (`Roster.js`)
This page displays each athlete in the 2021-2022 RPI Swim & Dive team roster with their name, position/best strokes, hometown, and roster photo. You can also search for swimmers using the search function.

- **`RosterSearch.js`:** dropdown search component included in **Roster.js** that lists 2021-2022 athletes
- **`RosterCard.js`:** roster card component that populates **Roster.js** 
- **`RosterProfile.js`:** specific profile for a swimmer
  * **`RosterProfileLatest.js`:** displays the latest meet results for a specific swimmer
  * **`RosterProfileFastest.js`:** displays the fastest times for a specific swimmer
  * **`RosterProfileEvent.js`:** all historical times for an event swam

---

#### Alerts and Calendar (`AlertsAndCalendar.js`)
Swimmers can view any alerts that are posted by admin users or the team's Google Calendar.

- The calendar is populated used the `FullCalendar` library.

---

#### Chat (`Messages.js`)
Users on the application can also chat with one another, either directly with one person or in a group.

- **`ChatCard.js`:** chat card component that populates **Messages.js**
- **`CreateChat.js`:** create a chat with other user(s)
- **`SpecificChat.js`:** displays the messages for the selected chat
- **`ModifyChat.js`:** allows users to edit existing chats like changing the group photo, adding/removing members to the group, or deleting chats completely

---

#### Navigation Bar (`Navigation.js`)
This is the component that allows users to jump from page to page.

---

#### Admin Dashboard (`Admin.js`)
If a user has the "admin" status, they are able to create alerts and users, edit swimmers, and modify existing accounts. These functions can be accessed on the landing page (Meet Results) by clicking the "Admin" button in the top right.

- **`AdminCreateAlert.js`:** create alerts
- **`AdminCreateUser.js`:** create users
- **`AdminEditForm.js`:** edit swimmers in the 2021-2022 season
- **`AdminModifyUser.js`:** modify or delete existing users
