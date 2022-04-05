// server/index.js
require('dotenv').config();
const express = require("express");
const bcrypt = require("bcryptjs");
const { info } = require("console");
const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  salt_factor = 10;
const PORT = process.env.PORT || 3001;

var context = require('rabbit.js').createContext('amqps://' + String(process.env.RABBITMQUSER) + ':' + String(process.env.RABBITMQPASS) + '@woodpecker.rmq.cloudamqp.com/' + String(process.env.RABBITMQUSER));
// var context = require('rabbit.js').createContext('amqps://dyifajdi:dY01hBir0J82rhSbYjBC0TwMH0BxjHSt@woodpecker.rmq.cloudamqp.com/dyifajdi');
context.on('ready', function() {
  var pub = context.socket('PUB'), sub = context.socket('SUB');
  sub.pipe(process.stdout);
  sub.connect('events', function() {
    pub.connect('events', function() {
      pub.write(JSON.stringify({welcome: 'rabbit.js'}), 'utf8');
    });
  });
});


const app = express();

app.use(express.json());

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
  console.log(req.body.user);
  connection.db.collection("chats", function (err, collection) {
    collection.countDocuments({ "users": req.body.user }, function (err, count) {
      try {
        if (count > 0) {
          collection.find({ "users": req.body.user }).toArray(function (err, data) {
            return res.send(data.map((lister) => {
              return {chatName: lister.chatName, chatID: lister.chatID, chatIMG: "https://rpiathletics.com/images/2021/10/5/Youngbar_Matthew.jpg", lastMessage: lister.messages[0]}
            }));
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
  // console.log(req.body.user);
  connection.db.collection("chats", function (err, collection) {
    collection.countDocuments({ "users": req.body.chatID }, function (err, count) {
      try {
        if (count > 0) {
          collection.find({ "users": req.body.chatID }).toArray(function (err, data) {
            return res.send(data[0]['messages'].map((lister) => {
              connection.db.collection("credentials", function (err, collection2) {
                collection2.countDocuments({"userID": lister[0]}, function (err, count2) {
                  try {
                    if (count > 0) {
                      console.log(lister[0]);
                      collection2.find({"userID": lister[0]}).toArray(function (err, data2) {
                        // console.log(data2);
                        // console.log({sender: data2[0].firstName + " " + data2[0].lastName, senderIMG: data2[0].picture, messageBody: lister[1], timestamp: lister[2]});
                        return {sender: data2[0].firstName + " " + data2[0].lastName, senderIMG: data2[0].picture, messageBody: lister[1], timestamp: lister[2]}
                      })
                    }
                  }
                  catch (err) {
                    console.log(err);
                  }

                })
              })
            }));
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

//---------------------------------------------------MISC FUNCTIONS---------------------------------------------------

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


//---------------------------------------------------TEST CODE---------------------------------------------------
