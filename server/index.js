// server/index.js
require('dotenv').config();
const express = require("express");
const bcrypt = require("bcryptjs");
const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  salt_factor = 10;
const PORT = process.env.PORT || 3001;

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

  connection.db.collection("meet-info", function (err, collection) {
    collection.find({}).toArray(function (err, data) {
      console.log(data); // it will print your collection data
    })
  });

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
  meet_events: [ String]
}, { versionKey: false });
const meet_info = mongoose.model('meet-info', meet_info_schema);

//Swimmer Info
var swimmer_info_schema = new Schema({
  first_name: { type: String },
  last_name: { type: String },
  events_swam: [String],
  best_times: [[String, String, String, String, Date]],
  meets_swam: [[String, Date]],
  seasons_swam: [String],
  position: String,
  class_year: String,
  hometown: String,
  high_school: String
}, { versionKey: false });
const swimmer_info = mongoose.model('swimmer-info', swimmer_info_schema);

//Top 10

//Alert Info
var alert_schema = new Schema({
  alert_text: { type: String },
  alert_type: { type: String },
  alert_end_date: { type: Date },
}, { versionKey: false });
const alert_info = mongoose.model('alerts', alert_schema);


//---------------------------------------------------WEB APP FUNCTIONS---------------------------------------------------

//GET Meet Info
app.get("/meet_info", async (req, res) => {
  try {
    connection.db.collection("meet-info", function (err, collection) {
      collection.find({}).toArray(function (err, data) {
        console.log(data); // it will print your collection data
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

//GET Top 10

//GET Credentials

//GET Alert Info
app.get("/alert_info", async (req, res) => {
  try {
    connection.db.collection("alerts", function (err, collection) {
      collection.find({}).toArray(function (err, data) {
        console.log(data); // it will print your collection data
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
            console.log(data);
            bcrypt.compare(req.body.pass, data[0].password, function (error, isMatch) {
              if (error) {
                console.log(error);
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
          console.log(count);
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

//Edit Swimmer
app.post("/edit_swimmer_info", async (req, res) => {
  connection.db.collection("swimmer-info", function (err, collection) {
    collection.countDocuments({ "first_name": req.body.first }, function (err, count) {
      try{
        return res.send({ "Result": true });
      }
      catch (err) {
        console.log(err);
      }
    });
  });
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

//


//---------------------------------------------------MISC FUNCTIONS---------------------------------------------------

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


//---------------------------------------------------TEST CODE---------------------------------------------------
