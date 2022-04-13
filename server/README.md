# Software Development - swim.me
ITWS 6700, Spring 2022

Kat Lopez, Lanya Xiang, Matthew Youngbar, Gwyneth Yuen

## API Documentation

### GET Requests

/meet_info: get meet information
/alerts: get alerts
/meet_info/:searchterm: get specific meet information
searchterm = firstname~lastname~meetname~startdate
/swimmer_info: get all swimmers’ records
/swimmers: get all swimmers
/swimmers/:fullName/event/:eventName: get events swam by a specific swimmer
/top_10: get All Time Top 10 data
/user_info: get credentials from the database

## POST Requests

/verify_credentials: checks username and password upon logging in
/edit_swimmer_info: edit swimmer information like hometown or strokes
/add_user: add a new user
/edit_user: edit an existing user
/delete_user: delete an existing user
/create_alert: creates alert
/chats: returns chat name, ID, last message, and images
/get_messages: returns message history of a chat
/send_messages: sends messages and tells server to emit the message to user(s) in the chat
/create_chat: creates a new chat
/modify_chat: modifies an existing chat
