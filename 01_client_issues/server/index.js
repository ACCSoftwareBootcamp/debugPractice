// import all the modules needed
const express = require('express');
const logger = require('morgan');
// Allow requests from different domains or aka origins - 
// cross origin resource sharing
const cors = require('cors');

// Create an instance (object) based on express
const app = express();
// define a variable PORT that keeps the port we run the api on
const PORT = process.env.PORT || 3000;

// MIDDLEWARE - anything that runs after a request but before sending a response
//  e.g. authenticate and authorize
//  e.g. log the requests
//  e.g. transform the data
app.use(express.static(path.join(__dirname, '..', 'client')));

// opens up the server to accept incoming requests from non-same origins
// opening up
app.use(cors());
// logs incoming requests to the console
app.use(logger('dev'));
// parses incoming requests with urlencoded body payloads, using qs library
app.use(express.urlencoded({ extended: false }));
// parses incoming requests with JSON body payloads
app.use(express.json());

// mock data 
const bucketListArray = require('./data/bucketlist')

// ROUTE HANDLERS
app.get('/', (req, res) => {
  res.send("I am the root route.")
})

// Create - POST
app.post('/bucket', (req, res) => {
  //call of to the db - N/A
  //wait for the db to respond - N/A
  let { description } = req.body
  // create an object for the databo received
  let obj = {
    id: Date.now(),
    description: description.substr(0, 30),
    isComplete: false
  }
  // save it to the array
  bucketListArray.push(obj)
  // send that data back
  res.send(obj)
})

// Read - GET
app.get('/bucket', (req, res) => {
  res.send(bucketListArray)
})

// Update - PUT - 
app.put('/bucket/:id', (req, res) => {
  let requestedId = req.params.id;
  // find a reference (pointer) to the object
  // in the bucketListArray that has the id: 1
  let foundObj = bucketListArray.find(function(element){
    return element.id == requestedId
  })
  // check if an object was actually found
  if(foundObj) {
    // update/toggle the foundObj.isComplete in the array
    foundObj.isComplete = !foundObj.isComplete;
    // return the changed value back to the client
    res.json(foundObj)
  } else {
    // id is not found
    res.json({status: 404, message: `The id ${requestedId} does not exist`})
  }
})

// Delete - DELETE
app.delete('/bucket/:id', (req, res) => {
  // find the requested id
  const {id} = req.params;

  // find it in the array
  const requestedItemIndex = bucketListArray.findIndex(
    function(element){ 
      return element.id == id
    }
  )

  // not found?
  if(requestedItemIndex === -1) {
    res.status(404).json({status:404, message: 'requested id not found in db'})
    return false;
  }

  // needs to be deleted object
  const deletedItem = bucketListArray.splice(requestedItemIndex, 1)

  // send it back
  res.json({ok: true, deletedItem})
})

// Listening for incoming requests
app.listen(PORT, () => console.log(`App listening on PORT: ${PORT}`))

