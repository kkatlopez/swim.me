// server/index.js

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
  next();
});

const uri = "mongodb+srv://root:hKTl1sOyZzIZWqlY@cluster0.eeewg.mongodb.net/swimdotme";
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
var swimmer_info = new Schema ({
  first_name: { type: String },
  last_name: { type: String },
  events_swam: [ String ],
  best_times: [ String ],
  meets_swam: [ String ],
  season_swam:[ String ],
  hometown: { type: String },
  primary_stroke: { type: String },
  high_school: { type: String }
})

//Top 10


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

// app.get("/meet_info/:meet", async (req, res) => {
//   var first = "Kat";
//   var last = "Lopez";
//   var meet = "Rensselaer vs. Skidmore";
// )};

app.get("/meet_info/:meet", async (req, res, db) => {
  // var name = "Kat Lopez";
  var first = req.body.firstName;
  var last = req.body.lastName;
  var full = first + " " + last;
  // var meet = "Rensselaer vs. Skidmore";
  // var start = new Date("2019-01-26T00:00:00.000Z");
  var results = [];
  try {
    connection.db.collection("meet-info", function (err, collection) {
      collection.find({ meetName: req.body.meet, meetStartDate: req.body.date }).toArray(function (err, data) {
        for (i = 0; i < data.length; i++) { // entire meet
          for (j = 0; j < data[i].meetEvents.length; j++) { // meetEvents
            for (k = 0; k < data[i].meetEvents[j][1].length; k++) { // j === event[0][1] array (meet results array)
              console.log(data[i].meetEvents[j][1][k][0] == full);
              if (data[i].meetEvents[j][1][k][0] == full) { // k === event participant
                // meetEvents[j][0] === event name
                // meetEvents[j][1][k][1] === time swam
                // k + 1 === place
                results.push([ data[i].meetEvents[j][0], data[i].meetEvents[j][1][k][1], (k + 1) ]);
                // console.log(results);
              }
            }
          }
        }
        res.send(results);
      })
    });
  } catch (error) {
      return console.log(error);
  }
})

//GET Specific Meet Info
app.get("/meet_info_specific", async (req, res) => {
  try {
    connection.db.collection("meet-info", function (err, collection) {
      console.log(req.body.name);
      console.log(req.body.date);
      collection.find({ meet_name: req.body.name, meet_start_date: req.body.date }).toArray(function (err, data) {
        console.log(data); // it will print your collection data
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
        console.log(data); // it will print your collection data
        res.send(data);
      })
    });
  } catch (error) {
      return console.log(error);
  }
});

app.get("/specific_swimmer", async (req, res) => {
  try {
    connection.db.collection("swimmer-info", function (err, collection) {
      // var split = req.body.name.split(" ");
      var split = ['Kat', 'Lopez'];
      collection.find({ firstName: split[0], lastName: split[1] }).toArray(function (err, data) {
        console.log(data); // it will print your collection data
        res.send(data);
      })
    });
  } catch (error) {
      return console.log(error);
  }
});

//GET Top 10

//GET Credentials


//---------------------------------------------------ADMIN FUNCTIONS---------------------------------------------------

//


//---------------------------------------------------MISC FUNCTIONS---------------------------------------------------

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


//---------------------------------------------------TEST CODE---------------------------------------------------



