var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Pet = require('./models/petModel');
 mongoose.Promise = require('bluebird');
// const multer = require('multer');
// const ejs = require('ejs');
// const path = require('path');

const SERVER_PORT = process.env.PORT || '8080' ;

mongoose.connect( process.env.CONNECTION_STRING || 'mongodb://localhost/petsDB', function() {
  console.log("DB connection established!!!");
})
// Init app
const app = express();
// Public Folder
app.use(express.static('./public'));
//app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// You will need to create 5 server routes
// These will define your API:





// 1) to handle getting all pets and their comments
app.get('/pet', function (req, res) {
  Pet.find().exec(function(err, pets){
    if (err){
      console.log(err);
      res.sendStatus(500).send("err");
    } else{
      // console.log(pets);
      res.send(pets);
    } 
  });
});
// 2) to handle adding a pet -merge with uploading
app.post('/pets', (req, res) => {
  //get the data the client sent
  // console.log(req.body) //{text: "whaterver"}
  //save a new pet
  var newPet = new Pet(req.body);
  newPet.save((err, pet) => {
      //after it saved return the saved pet to the client, he'll get in the success function
      if (err) {
          console.log(err);
      } else {
          console.log('pet ADDED')
          res.send(pet);
      }
  })
});


// 3) to handle deleting a pet
app.get('/likes/:id', (req, res) => {
  console.log("working!");
  var id = req.params.id;
  console.log(id)
  Pet.findOne({_id: id}).exec((err, pet) => {
      if (err) {
          console.log(err)
      } else {
        console.log(pet)
        res.send(pet);
        console.log("we got here")
      }
  })
});


app.listen(SERVER_PORT, "0.0.0.0" ,  () => {
  console.log("Server started on port " + SERVER_PORT);
});

