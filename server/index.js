// server/index.js

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
  meet_events: [ String]
}, { versionKey: false });
const meet_info = mongoose.model('meet-info', meet_info_schema);

//Swimmer Info

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

//GET Top 10

//GET Credentials


//---------------------------------------------------ADMIN FUNCTIONS---------------------------------------------------

//


//---------------------------------------------------MISC FUNCTIONS---------------------------------------------------

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


//---------------------------------------------------TEST CODE---------------------------------------------------



