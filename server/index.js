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

const uri = "mongodb+srv://root:swim.me@cluster0.eeewg.mongodb.net/Cluster0";
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });
const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.set('useFindAndModify', false);
connection.once('open', () => {
  console.log('MongoDB database connection established successfully!');
});

connection.catch(err => console.log(err));

//---------------------------------------------------MongoDB SCHEMAS---------------------------------------------------




//---------------------------------------------------WEB APP FUNCTIONS---------------------------------------------------




//---------------------------------------------------ADMIN FUNCTIONS---------------------------------------------------




//---------------------------------------------------MISC FUNCTIONS---------------------------------------------------

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


//---------------------------------------------------TEST CODE---------------------------------------------------



