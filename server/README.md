# Software Development - swim.me
ITWS 6700, Spring 2022

Kat Lopez, Lanya Xiang, Matthew Youngbar, Gwyneth Yuen

## API Documentation

### GET Requests

#### Meet Info

`/meet_info` - get meet information

#### Alerts

`/alerts` - get alerts

#### Specific Meet Info

`/meet_info/:searchterm`- get specific meet information

searchterm = `firstname~lastname~meetname~startdate`

#### Swimmer Info (Admin Use)

`/swimmer_info` - get all current swimmers’ records

#### All Swimmer Info

`/swimmers` - get all swimmers

#### Specific Swimmer Info

`/swimmers/:fullName/event/:eventName` - get events swam by a specific swimmer

#### All Time Top 10

`/top_10` - get All Time Top 10 data

#### User Info

`/user_info` - get credentials from the database

---

### POST Requests

#### Verify Credentials

`/verify_credentials` - checks username and password upon logging in

#### Edit Specific Swimmer Info

`/edit_swimmer_info` - edit swimmer information like hometown or strokes

#### Add New User

`/add_user` - add a new user

#### Edit User

`/edit_user` - edit an existing user

#### Delete User

`/delete_user` - delete an existing user

#### Create New Alert

`/create_alert` - creates alert

#### Specific Chat

`/chats` - returns chat name, ID, last message, and images

#### Message History

`/get_messages` - returns message history of a chat

#### Send Messages

`/send_messages` - sends messages and tells server to emit the message to user(s) in the chat

#### Create Chat

`/create_chat` - creates a new chat

#### Modify Chat

`/modify_chat` - modifies an existing chat
