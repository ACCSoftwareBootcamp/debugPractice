require('dotenv').config();
const express = require("express");
const app = express();
// needed for third party deployment
const port = process.env.PORT || 3000;
const cors = require('cors');

// open the server to cors
app.use(cors());

app.use(express.static(__dirname + '/client'))  // webroot 

// access body-parser functionality
// NOTE: This is the Body-Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const mongoose = require('mongoose')

const {DB, URI, DB_PASS, DB_USER} = process.env;

// console.log('process.env.DB_PASS is:', process.env.DB_PASS);

let url = `${URI}/${DB}`

let connectionObject = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  authSource: "admin",
  user: DB_USER,
  pass: DB_PASS
};

mongoose.set('strictQuery', false);

mongoose
  .connect(url, connectionObject)
  .then(() => console.log(`Connected to ${DB} database`))
  .catch((err) => console.log(`Error connecting to ${DB} database: `,  err));

// root route
app.get("/", (req, res) => {
  // res.send("API root route");
  res.sendFile('index.html', {root: __dirname + '/client'} );
});

// Blueprints
const { BucketModel } = require("./models/BucketModel");

// Queries
app.post("/bucket", (req, res) => {
  // we need to get description from client
  let desc = req.body.description;
  // send data to database
  BucketModel.create({ description: desc }, (err, result) => {
    if (err) {
      res.status(444).send({ message: "Unable to create data for database" });
    } else {
      res.json(result);
    }
  });
});

app.get("/bucket", (req, res) => {
  BucketModel.find({}, (err, results) => {
    if (err)
      res.status(445).send({ message: "Unable to read data from database" });
    else res.json(results);
  });
});

app.delete("/bucket/:id", (req, res) => {
  let requestedId = req.params.id;
  BucketModel.findByIdAndDelete(requestedId, (err, result) => {
    if (err)
      res.status(446).send({ message: "Unable to delete data from database" });
    else res.json(result);
  });
});

app.put('/bucket/:id', (req, res)=>{
  let requestedId = req.params.id
  //3 step process
      //1) findById() takes 2 arguments (filter) - find the document that matches our ID with - .findById()    ,- this is a mongoose method
  BucketModel.findById(requestedId, (err, result)=>{
      if(err){
          console.log(`Error retrieving document through update: ${err}`)
          res.status(666).send({message: "Error retrieving document through update"});
      } else {
      //2) RESULT need to update the isComplete in the returned document
      //THIS IS TOGGLING
      // if(result.isComplete === true){
      //     result.isComplete = false
      // } else {
      //     result.isComplete = true
      // }
      result.isComplete = !result.isComplete; //This line is a shortened version of lines 73-77
      //3) save the updated document - error not to be confused with err
      result.save((error, updatedResult)=>{
          if(error) res.status(668).send({ message: "Error saving document through update"});
          else res.json(updatedResult)
      })
      }
  })
})

app.listen(
  port, 
  () => console.log(`API app listening on port ${port}`)
);
