// server/index.js
require('dotenv').config();
const express = require("express");
const bcrypt = require("bcryptjs");
const socketIo = require("socket.io");
const http = require("http");
const { info } = require("console");
const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  salt_factor = 10;
const PORT = process.env.PORT || 3001;

// var context = require('rabbit.js').createContext('amqps://' + String(process.env.RABBITMQUSER) + ':' + String(process.env.RABBITMQPASS) + '@woodpecker.rmq.cloudamqp.com/' + String(process.env.RABBITMQUSER));
// var context = require('rabbit.js').createContext('amqps://dyifajdi:dY01hBir0J82rhSbYjBC0TwMH0BxjHSt@woodpecker.rmq.cloudamqp.com/dyifajdi');
// context.on('ready', function() {
//   var pub = context.socket('PUB'), sub = context.socket('SUB');
//   sub.pipe(process.stdout);
//   sub.connect('events', function() {
//     pub.connect('events', function() {
//       pub.write(JSON.stringify({welcome: 'rabbit.js'}), 'utf8');
//     });
//   });
// });


const app = express();

app.use(express.json());



// const index = require("./routes/index");
// app.use(index);


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const uri = "mongodb+srv://" + String(process.env.MONGOPASS) + "@cluster0.eeewg.mongodb.net/" + String(process.env.DBNAME);
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });
const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.set('useFindAndModify', false);
connection.once('open', () => {
  console.log('MongoDB database connection established successfully!');

  // connection.db.collection("meet-info", function (err, collection) {
  //   collection.find({}).toArray(function (err, data) {
  //     console.log(data); // it will print your collection data
  //   })
  // });

  // mongoose.connection.db.listCollections().toArray(function (err, names) {
  //   console.log(names); // [{ name: 'dbname.myCollection' }]
  //   module.exports.Collection = names;
  // });
});

connection.catch(err => console.log(err));

//---------------------------------------------------MongoDB SCHEMAS---------------------------------------------------

//Meet Info
var meet_info_schema = new Schema({
  meet_name: { type: String },
  meet_start_date: { type: Date },
  meet_end_date: { type: Date },
  meet_location: { type: String },
  meet_events: [ String ]
}, { versionKey: false });
const meet_info = mongoose.model('meet-info', meet_info_schema);

//Swimmer Info
var swimmer_info_schema = new Schema ({
  first_name: { type: String },
  last_name: { type: String },
  events_swam: [ String ],
  best_times: [ String ],
  meets_swam: [ String ],
  season_swam:[ String ],
  hometown: { type: String },
  primary_stroke: { type: String },
  high_school: { type: String }
}, { versionKey: false });
const swimmer_info = mongoose.model('swimmer-info', swimmer_info_schema);

//Top 10
var top_10_schema = new Schema({
  event: [String]
}, { versionKey: false });
const top_10 = mongoose.model('top-10', top_10_schema);

// Chats
var chats_schema = new Schema({
  chatID: Number,
  messages: [Object],
  users:[Number],
  chatName: String
}, { versionKey: false }, {collection: 'chats'});
const chats = mongoose.model('chats', chats_schema, 'chats');

//User Info
var user_info_schema = new Schema({
  username: { type: String },
  password: { type: String },
  admin: { type: Boolean },
  picture: {type: String},
  userID: {type: Number},
  firstName: {type: String},
  lastName: {type: String}
}, { versionKey: false }, {collection: 'credentials'});
const user_info = mongoose.model('credentials', user_info_schema, 'credentials');

//---------------------------------------------------WEB APP FUNCTIONS---------------------------------------------------

//GET All Meet Info
app.get("/meet_info", async (req, res) => {
  try {
    connection.db.collection("meet-info", function (err, collection) {
      var mysort = { "meetStartDate": -1 };
      collection.find({}).sort(mysort).toArray(function (err, data) {
        //console.log(data); // it will print your collection data
        res.send(data);
      })
    });
  } catch (error) {
      return console.log(error);
  }
});

// GET times for a meet for a specific swimmer
app.get("/meet_info/:searchterm", async (req, res) => {
  var info = req.params.searchterm.split("~"); // get search term from URL === first~last~meetname~startdate
  console.log(info);
  var full = info[0] + " " + info[1];
  var meetname = info[2];
  console.log(meetname);
  var startdate = new Date(info[3]);
  var results = [];
  try {
    connection.db.collection("meet-info", function (err, collection) {
      collection.find({ meetName: meetname, meetStartDate: startdate }).toArray(function (err, data) {
        // entire meet:
        for (i = 0; i < data.length; i++) {
          // meetEvents:
          for (j = 0; j < data[i].meetEvents.length; j++) {
            for (k = 0; k < data[i].meetEvents[j][1].length; k++) {     // j === event[0][1] array (meet results array)
              if (data[i].meetEvents[j][1][k][0] == full) {             // k === event participant
                // meetEvents[j][0] === event name
                // meetEvents[j][1][k][1] === time swam
                // k + 1 === place
                results.push([ data[i].meetEvents[j][0], data[i].meetEvents[j][1][k][1], (k + 1) ]);
              }
            }
          }
        }
        console.log(results);
        console.log('hello');
        res.send(results);
      })
    });
  } catch (error) {
      return console.log(error);
  }
});

// GET meet times for a specific swimmer


//GET Specific Meet Info
app.get("/meet_info_specific", async (req, res) => {
  try {
    connection.db.collection("meet-info", function (err, collection) {
      console.log(req.body.name);
      console.log(req.body.date);
      collection.find({ meet_name: req.body.name, meet_start_date: req.body.date }).toArray(function (err, data) {
        //console.log(data); // it will print your collection data
        res.send(data);
      })
    });
  } catch (error) {
      return console.log(error);
  }
});

//GET Swimmer Info
app.get("/swimmers", async (req, res) => {
  try {
    var mysort = { "lastName": 1 };
    connection.db.collection("swimmer-info", function (err, collection) {
      collection.find({}).sort(mysort).toArray(function (err, data) {
        // console.log(data); // it will print your collection data
        res.send(data);
      })
    });
  } catch (error) {
      return console.log(error);
  }
});






function getEvents(meetsswam, eventsswam, full) {
  var results = [];
  console.log("getevents");
  // console.log(eventsswam);
  //console.log(meetsswam);
   //looping through events
  connection.db.collection("meet-info", function (err, collection) {
  var i;
  //console.log(meetsswam);
  for (i = 0; i < meetsswam.length; i++) {
    // console.log(meetsswam[i][0]);
    collection.find({ meetName: meetsswam[i][0] }).toArray(function (err, data) {
      for (h = 0; h < eventsswam.length; h++) {
        // console.log(eventsswam[h]);
        // console.log(data);
        // console.log('checkpoint');
        for (i = 0; i < data.length; i++) { // found meets
          for (j = 0; j < data[i].meetEvents.length; j++) { // looping through meetEvents
            // console.log(data[i].meetEvents[j][0] + " " + eventsswam[h]);
            if (data[i].meetEvents[j][0].includes(eventsswam[h])) {
              for (k = 0; k < data[i].meetEvents[j][1].length; k++) {     // looping through event results array
                if (data[i].meetEvents[j][1][k][0] === full) {             // k === event participant
                console.log(data[i].meetEvents[j][1][k][0] + " " + full);
                // meetEvents[j][0] === event name
                // meetEvents[j][1] === meet date
                // meetEvents[j][1][k][1] === time swam
                // console.log(data[i].meetEvents[j][0] + " " + data[i].meetEvents[j][1] + " " + data[i].meetEvents[j][1][k][1]);
                results.push([ data[i].meetEvents[j][0], data[i].meetEvents[j][1], data[i].meetEvents[j][1][k][1]]);
                // console.log(results);
                }
              }
            }
          }
        }
      }
    });
  }
  console.log(results);
  return results;
  });
}

app.get("/specific_swimmer/:name", async (req, res) => {
  try {
    var split = req.params.name.split(" ");
    var full = split[0] + " " + split[1];
    // console.log('hello');
    var eventsswam = [];
    var meetsswam = [];
    // var results = [];
    connection.db.collection("swimmer-info", function (err, collection) {
      collection.find({ firstName: split[0], lastName: split[1] }).toArray(function (err, data) {
        eventsswam = data[0].eventsSwam;
        meetsswam = data[0].meetsSwam;
        var results = [];
        // result = getEvents(meetsswam, eventsswam, full);
        connection.db.collection("meet-info", function (err, collection) {
          var h = 0, i = 0, j = 0, k = 0, l = 0;
          //console.log(meetsswam);
          //console.log(meetsswam);
          for (l = 0; l < meetsswam.length - 1; l++) {
            // console.log(meetsswam[i][0]);
            collection.find({ meetName: meetsswam[l][0] }).toArray(function (err, data) {
              for (h = 0; h < eventsswam.length - 1; h++) {
                // console.log(eventsswam[h]);
                // console.log(data);
                console.log('checkpoint');
                for (i = 0; i < data.length - 1; i++) { // found meets
                  for (j = 0; j < data[i].meetEvents.length - 1; j++) { // looping through meetEvents
                    // console.log(data[i].meetEvents[j][0] + " " + eventsswam[h]);
                    // console.log('found event');
                    for (k = 0; k < data[i].meetEvents[j][1].length - 1; k++) {     // looping through event results array
                      if (data[i].meetEvents[j][0].includes(eventsswam[h]) && data[i].meetEvents[j][1][k][0] === full) {             // k === event participant
                      console.log('found name');
                      // console.log(data[i].meetEvents[j][1][k][0] + " " + full);
                      // meetEvents[j][0] === event name
                      // meetEvents[j][1] === meet date
                      // meetEvents[j][1][k][1] === time swam
                      // console.log(data[i].meetEvents[j][0] + " " + data[i].meetStartDate + " " + data[i].meetEvents[j][1][k][1]);
                      results.push([data[i].meetEvents[j][0], data[i].meetName, data[i].meetStartDate, data[i].meetEvents[j][1][k][1]]);
                      // console.log(results);

                        if (l == meetsswam.length - 1 && h == eventsswam.length - 1 && i == data.length - 1 && j == data[i].meetEvents.length && k == data[i].meetEvents[j][1].length - 1) {
                          console.log(results);
                          console.log('success');
                          // res.send(results);
                        }
                        else {
                          console.log('fail');
                          console.log(l);
                          console.log(meetsswam.length - 1);
                          console.log(h);
                          console.log(eventsswam.length - 1);
                          console.log(i);
                          console.log(data.length - 1);
                          console.log(j);
                          console.log(data[i].meetEvents.length - 1);
                          console.log(k);
                          console.log(data[i].meetEvents[j][1].length - 1);
                        }
                      }
                    }
                  }
                }
              }
            });
          }
          console.log(results);
          res.send(results);
        });
      })
    });

  } catch (error) {
    return console.log(error);
  }
});






//GET Top 10
app.get("/top_10", async (req, res) => {
  try {
    connection.db.collection("top-10", function (err, collection) {
      collection.find({}).toArray(function (err, data) {
        console.log(data); // it will print your collection data
        res.send(data);
      })
    });
  } catch (error) {
      return console.log(error);
  }
});


//GET Credentials

//Admin Login
app.post("/verify_credentials", async (req, res) => {
  console.log(req.body.user);
  connection.db.collection("credentials", function (err, collection) {
    // coll.collection("credentials", function (err, collection) {
    collection.countDocuments({ "username": req.body.user }, function (err, count) {
      // console.log(collection.find({}).toArray());
      try {
        if (count > 0) {
          collection.find({ "username": req.body.user }).toArray(function (err, data) {
            // console.log(data);
            bcrypt.compare(req.body.pass, data[0].password, function (error, isMatch) {
              if (error) {
                // console.log(error);
                return res.send({ "Result": false });
              } else if (!isMatch) { //|| !data[0].admin
                console.log("Invalid Login Attempt");
                return res.send({ "Result": false });
              } else {
                return res.send({ "Result": true, "Admin": data[0].admin, "User": data[0].userID });
              }
            });
          })
        }
        else {
          // console.log(count);
          return res.send({ "Result": false });
        }
      }
      catch (err) {
        console.log(err);
      }
    });
  });
  // });
});


app.post("/add_user", async (req, res) => {
  console.log(req.body.user);
  connection.db.collection("credentials", function (err, collection) {
    collection.countDocuments({ "username": req.body.user }, function (err, count) {
      try {
        if (count > 0) {
          return res.send({ "Result": false });
        }
        else {
          const saltRounds = 10; // data processing time

          var username = req.body.user;
          var password = req.body.pass;

          // salt, hash, and store
          bcrypt.hash(password, saltRounds, function(err, hash) {

            var UserSchema = mongoose.Schema({
              username: String,
              password: String,
              admin: Boolean
              // admin: req.body.admin
            });

            // compile schema to model
            var User = mongoose.model('User', UserSchema, 'credentials');

            // a document instance
            var user = new User({ username: username, password: hash, admin: false });

            // save model to database
            user.save(function (err, book) {
              if (err) return console.error(err);
              console.log("Created new user");
            });
          });
          // console.log(count);
          return res.send({ "Result": true });
        }
      }
      catch (err) {
        console.log(err);
      }
    });
  });
});

//---------------------------------------------------MESSAGING FUNCTIONS---------------------------------------------------
app.post("/chats", async (req, res) => {
  // var chat = await chats.findOne({ "chatID": req.body.chatID });
  // var message = Promise.all(chat.messages.map(async (mess) => {
  //
  //   console.log({sender: user.firstName + " " + user.lastName, senderIMG: user.picture, messageBody: mess[1], timestamp: mess[2]});
  //   return({sender: user.firstName + " " + user.lastName, senderIMG: user.picture, messageBody: mess[1], timestamp: mess[2]});
  // }));
  // message.then((result) => {
  //   console.log(result);
  //   res.send(result);
  // });
  console.log(req.body.user);
  connection.db.collection("chats", function (err, collection) {
    collection.countDocuments({ "users": req.body.user }, function (err, count) {
      try {
        if (count > 0) {
          collection.find({ "users": req.body.user }).toArray(function (err, data) {
            var message = Promise.all(data.map(async (lister) => {
              var image = lister.groupPicture;
              if (!image) {
                var user = await user_info.findOne({"userID": lister.messages[lister.messages.length - 1][0]});
                image = user.picture;
              }
              return {chatName: lister.chatName, chatID: lister.chatID, chatIMG: image, lastMessage: lister.messages[lister.messages.length - 1][1]}
            }));
            message.then((result) => {
              return res.send(result);
            })
          })
        }
        else {
          return res.send({ "Result": false });
        }
      }
      catch (err) {
        console.log(err);
      }
    });
  });
});

app.post("/get_messages", async (req, res) => {
  var chat = await chats.findOne({ "chatID": req.body.chatID });
  var message = Promise.all(chat.messages.map(async (mess) => {
    var user = await user_info.findOne({"userID": mess[0]});
    console.log({sender: user.firstName + " " + user.lastName, senderIMG: user.picture, messageBody: mess[1], timestamp: mess[2]});
    return({sender: user.firstName + " " + user.lastName, senderIMG: user.picture, messageBody: mess[1], timestamp: mess[2]});
  }));
  message.then((result) => {
    console.log(result);
    res.send(result);
  });
});

//---------------------------------------------------MISC FUNCTIONS---------------------------------------------------

// const app2 = express();
const httpServer = http.createServer(app);
// const io = socketIo(server);

let interval;

const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// io.on("connection", (socket) => {
//   console.log("New client connected");
//   if (interval) {
//     clearInterval(interval);
//   }
//   interval = setInterval(() => getApiAndEmit(socket), 1000);
//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//     clearInterval(interval);
//   });
// });

// const getApiAndEmit = socket => {
//   // const response = new Date();
//   const response = {sender: "Gwyneth", senderIMG: "https://rpiathletics.com/images/2021/10/5/Yuen_Gwyneth.jpg", messageBody: "wyd?", timestamp: "1:02 PM"}
//   // Emitting a new message. Will be consumed by the client
//   socket.emit("3", response);
// };

app.post("/send_message", async (req, res) => {
  var chat = await chats.findOne({ "chatID": req.body.chatID });
  var user = await user_info.findOne({"userID": req.body.user});
  const newMessage = [req.body.user, req.body.message, new Date()];
  chat.messages = [...chat.messages, newMessage];
  console.log(chat);
  await chat.save();
  for (let i = 0; i < chat.users.length; i++) {
    console.log(chat.users[i]);
    // io.on("Connection", (socket) => {
      const response = {chatID: req.body.chatID, sender: user.firstName + " " + user.lastName, senderIMG: user.picture, messageBody: req.body.message, timestamp: new Date()};
      io.emit(chat.users[i], response);
    // });
  }
  res.send({"result": true});
  // message.then((result) => {
  //   console.log(result);
  //   res.send(result);
  // });
});

// app.post("/send_message", async (req, res) => {
//   // console.log(req.body.user);
//   connection.db.collection("chats", function (err, collection) {
//     collection.countDocuments({ "chatID": req.body.chatID }, function (err, count) {
//       try {
//         if (count > 0) {
//           collection.find({ "chatID": req.body.chatID }).toArray(function (err, data) {
//             connection.db.collection("credentials", function (err, collection2) {
//             collection2.find({ "userID": req.body.chatID }).toArray(function (err, data2) {
//               const message = {sender: data2[0].firstName + " " + data2[0].lastName, senderIMG: data2[0].picture, messageBody: req.body.message, timestamp: Date()}
//                 for (let i = 0; i < data2[0].users.length; i++) {

//                   socket.emit(data2[0].users[i], message);
//                 }})

//               }
//             }
//           }
//             else {
//               return res.send({ "Result": false });
//             }
//           }
//         catch (err) {
//           console.log(err);
//         }});
//       }
//     });
  // });

httpServer.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// server.listen(PORT2, () => {
//   console.log(`Server listening on ${PORT2}`);
// });


//---------------------------------------------------TEST CODE---------------------------------------------------
