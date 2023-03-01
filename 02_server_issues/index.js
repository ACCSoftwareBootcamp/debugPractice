const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const logger = require("morgan");
app.use(logger("dev"));
app.use(express.static("./client"))

// this is our body-parser
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// allows access to fake data file
const { bucketArray } = require("./fakeData");

app.get("/", (req, res) => {
  // res.send("Groot route");
  res.send('index.html')
});

// READ
app.get("/bucket", (req, res) => {
  res.json(bucketArray);
});

let newId = 4;
// CREATE
app.post("/bucket", (req, res) => {
  // build an object from user data
  let data = {
    id: newId++,
    description: req.body.description ? req.body.description : "Tom messed up!!!",
    isComplete: false,
  };
  // send a receipt back to client
  res.json(data);
});

// Delete
app.delete('/bucket/:id', (req, res)=>{
  // access value from parameters
  let requestedId = Number(req.params.id)
  // need to find if element exists matching user's id
  // if there is a match, returns the index of the first match
  let requestedItemIndex = bucketArray.findIndex((bucketItem)=>{
    return bucketItem.id === requestedId
  })
  if(requestedItemIndex !== -1){
    // if we know the index, can we splice?
    // we need to know starting index and 1
    bucketArray.splice(requestedItemIndex, 1)
    // send data back
    res.json(bucketArray)
  } else {
    res.status(404).json({error: "Unable to find id on backend with delete"})
  }
})

// UPDATE = PUT
app.put('/bucket/:id', (req, res)=>{
  let requestedId = Number(req.params.id)
  // iterate through array
  // if found, return the element => object
  // if not found, return undefined
  let item = bucketArray.find(bucketItem =>{
    return requestedId = bucketItem.id
  })
  // test to make sure element is found
  if(item){
    // update isComplete from false to true <=> true to false
    item.isComplete = !item.isComplete
    res.json(item)
  } else {
    res.status(404).json({error: "Unable to find id for put backend method"})
  }
})

app.listen(port, () => console.log(`App listening on port ${port}`));
