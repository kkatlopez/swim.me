// server/index.js
require('dotenv').config();
const express = require("express");
const bcrypt = require("bcryptjs");
const { info } = require("console");
const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  salt_factor = 10;
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
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
});

  // mongoose.connection.db.listCollections().toArray(function (err, names) {
  //   console.log(names); // [{ name: 'dbname.myCollection' }]
  //   module.exports.Collection = names;
  // });
// });

connection.catch(err => console.log(err));

//---------------------------------------------------MongoDB SCHEMAS---------------------------------------------------

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

//Meet Info
var meet_info_schema = new Schema({
  meetName: { type: String },
  meetStartDate: { type: Date },
  meetEndDate: { type: Date },
  meetLocation: { type: String },
  meetEvents: [ String],
  meetTeam: [String]
}, { versionKey: false }, {collection: 'meet-info'});
const meet_info = mongoose.model('meet-info', meet_info_schema, 'meet-info');

//Swimmer Info
var swimmer_info_schema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  eventsSwam: [String],
  bestTimes: [[String, String, String, String, Date]],
  meetsSwam: [[String, Date]],
  seasonsSwam: [String],
  position: { type: String },
  classYear: { type: String },
  hometown: { type: String },
  highSchool: { type: String }
}, { versionKey: false }, {collection: 'swimmer-info'});
const swimmer_info = mongoose.model('swimmer-info', swimmer_info_schema, 'swimmer-info');

//Top 10

//Alert Info
var alert_schema = new Schema({
  alert_text: { type: String },
  alert_type: { type: String },
  alert_end_date: { type: Date },
}, { versionKey: false }, {collection: 'alerts'});
const alert_info = mongoose.model('alerts', alert_schema, 'alerts');

//Alert Info
var alert_schema = new Schema({
  alert_text: { type: String },
  alert_type: { type: String },
  alert_end_date: { type: Date },
}, { versionKey: false }, {collection: 'alerts'});
const alert_info = mongoose.model('alerts', alert_schema, 'alerts');

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

//GET Alert Info
app.get("/alert_info", async (req, res) => {
  try {
    // alert_info.find({}).toArray(function (err, data) {
    connection.db.collection("alerts", function (err, collection) {
      collection.find({}).toArray(function (err, data) {
        // console.log(data); // it will print your collection data
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
app.get("/swimmer_info", async (req, res) => {
  try {
    connection.db.collection("swimmer-info", function (err, collection) {
      var this_year = new Date().getFullYear();
      var this_month = new Date().getMonth();
      var season = (this_year-1).toString() + "-" + this_year.toString();
      if(this_month >= 9) {
        var season = this_year.toString() + "-" + (this_year+1).toString();
      }
      collection.find({seasonsSwam: season}).toArray(function (err, data) {
        // console.log(data);
        res.send(data);
      })
    });
  } catch (error) {
    return console.log(error);
  }
});

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

// GET events swam (with times and dates) for a specific swimmer
app.get("/swimmers/:fullName/event/:eventName", async (req, res) => {
  var split = req.params.fullName.split(" ");
  var first = split[0];
  var last = split[1];
  var eventname = req.params.eventName;
  try {
    var mysort = { "meetStartDate": -1 };
    connection.db.collection("swimmer-info", function (err, collection) {
      collection.find({ firstName: first, lastName: last }).toArray(function (err, data) {
        var i, j, k, l;
        var allresults = [];
        var eventresults = [];
        for (i = 0; i < data.length; i++) {
          for (j = 0; j < data[i].eventsSwam.length; j++) {
            allresults.push(data[i].eventsSwam[j]);
          }
        }
        for (k = 0; k < allresults.length; k++) {
          for (l = 0; l < allresults[k].length; l++) {
            if (allresults[k][0] === eventname) {
              eventresults.push(allresults[k]);
              break;
            } else {
              continue;
            }
          }
        }
        res.send(eventresults);
      });
    });
  } catch (error) {
    console.log(error);
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
app.get("/user_info", async (req, res) => {
  try {
    connection.db.collection("credentials", function (err, collection) {
      collection.find({}).toArray(function (err, data) {
        // console.log(data);
        res.send(data);
      })
    });
  } catch (error) {
    return console.log(error);
  }
});

//GET Alert Info
app.get("/alert_info", async (req, res) => {
  try {
    connection.db.collection("alerts", function (err, collection) {
      collection.find({}).toArray(function (err, data) {
        // console.log(data); // it will print your collection data
        return data;
      })
    });
  } catch (error) {
    return console.log(error);
  }
});

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
                return res.send({ "Result": true, "Admin": data[0].admin });
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

//Edit Swimmer Information
app.post('/edit_swimmer_info', async (req, res) => {
  var fullname = req.body.name;
  var check_last = fullname.split(',')[0];
  var check_first = fullname.split(',')[1].trim();
  var firstname = req.body.firsttext;
  var lastname = req.body.lasttext;
  var positi = req.body.postext;
  var classyear = req.body.classtext;
  var homet = req.body.hometext;
  var school = req.body.hightext;

  await swimmer_info.findOneAndUpdate({ firstName: check_first, lastName: check_last },
    { "$set": {
      firstName: firstname,
      lastName: lastname,
      position: positi,
      classYear: classyear,
      hometown: homet,
      highSchool: school }
    }).then(function (err) {
    if (err) {
      console.log(err);
      return res.send({ "Result": false });
    }
    else {
      // console.log('info successfully updated');
      return res.send({ "Result": true });
    }
  })
});

//Edit user information
app.post('/edit_user_info', async (req, res) => {
  var user = req.body.username;
  var pass = req.body.password;
  var ad = req.body.type_bool;
  var id = req.body.userid;

  const saltRounds = 10;
  var hashedPassword = await bcrypt.hash(pass, saltRounds);
  // console.log(user + " " + pass + " " + ad + " " + id + " " + hashedPassword);
  await user_info.findOneAndUpdate({ userID: id },
    { "$set": {
      username: user,
      password: hashedPassword,
      admin: ad
    }
    }).then(function (err) {
    if (err) {
      console.log(err);
      return res.send({ "Result": false });
    }
    else {
      // console.log('info successfully updated');
      return res.send({ "Result": true });
    }
  })
});

//Delete user
app.post('/delete_user', async (req, res) => {
  // var user = req.body.username;
  // var pass = req.body.password;
  // var ad = req.body.type_bool;
  var id = req.body.userid;

  // const saltRounds = 10;
  // var hashedPassword = await bcrypt.hash(pass, saltRounds);
  // console.log(user + " " + pass + " " + ad + " " + id + " " + hashedPassword);
  await user_info.deleteOne({ userID: id }).then(function (err) {
    if (err) {
      console.log(err);
      return res.send({ "Result": false });
    }
    else {
      // console.log('info successfully updated');
      return res.send({ "Result": true });
    }
  })
});

//Create Alert
app.post("/create_alert", async (req, res) => {
  connection.db.collection("alerts", function (err, collection) {
    collection.countDocuments({ "alert_text": req.body.text, "alert_type": req.body.type, "alert_end_date": req.body.endDate }, function (err, count) {
      try {
        if (count > 0) {
          return res.send({ "Result": false });
        }
        else {
          var alert_text = req.body.text;
          var alert_type = req.body.type;
          var alert_date = req.body.endDate;
          var today = new Date().toISOString().split('T')[0];
          if(alert_text == "" || alert_type == "Select alert priority" || alert_date < today) {
            return res.send({ "Result": false });
          }

          // compile schema to model
          var Alert = mongoose.model('Alert', alert_schema, 'alerts');

          // a document instance
          var user = new Alert({ alert_end_date: alert_date, alert_text: alert_text, alert_type: alert_type });

          // save model to database
          user.save(function (err, book) {
            if (err) return console.error(err);
            console.log("Created new alert");
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

//Add new user
app.post("/add_user", async (req, res) => {
  try {
    count = await user_info.countDocuments({ username: req.body.username });
    if(count > 0) {
      return res.send({"Result": false});
    }

    else {
      const saltRounds = 10; // data processing time

      var first = req.body.first;
      var last = req.body.last;
      var user = req.body.username;
      var pass = req.body.password;
      var ad = req.body.type_bool;

      var id;
      await user_info.countDocuments({}, function( err, count){
        // console.log( "Number of users:", count );
        id = count;
      })
      // var id = req.body.userid;
      // var id = user_info.length + 1;
      // console.log(user_info.length);
      // console.log(user_info.countDocuments({}));
      // console.log(id);

      var hashedPassword = await bcrypt.hash(pass, saltRounds);

      // a document instance
      user_info.create({ username: user, password: hashedPassword, admin: ad, userID: id+1, firstName: first, lastName: last }, function(err, new_user) {
        if (err) return console.error(err);
        console.log("Created new user");
      });

      return res.send({ "Result": true });
    }
  } catch (err) {
    console.log(err);
  }
});



//---------------------------------------------------MISC FUNCTIONS---------------------------------------------------

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


//---------------------------------------------------TEST CODE---------------------------------------------------
