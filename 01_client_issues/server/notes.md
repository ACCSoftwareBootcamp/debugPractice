Building (serving) an API - YOU set the rules
  1) YOU determine the endpoints
    a) endpoint = baseUrl + route
  2) YOU determine how data will be sent back
    a) JSON and XML
  3) YOU  determine what the data is and how much



George - our new boss
2 routes only:
  /bucket
  /bucket/:id

fakeData
  id = unique identifer
  description = string created by client
  isComplete = boolean - tells us if bucket item has been completed

4 verbs as options:
  GET
  POST
  PUT
  DELETE


Needs to be completely CRUD functional:
1) Create data
  a) endpoint = localhost:3000 + /bucket
    i) POST = verb
  b) how to send data back - json
  c) how much and what will data look like we are sending
    i) receipt of one document saved in database
2) Read data
  a) endpoint = localhost:3000 + /bucket
    1) GET
  b) send back as json
  c) send everything in database
4) Delete data
  a) endpoint = localhost:3000 + /bucket/:id
    1) DELETE
  b) send back as json
  c) send back one (deleted) object as receipt
3) Update data
  a) endpoint = localhost:3000 + /bucket/:id
    1) PUT
  b) send back as json
  c) send back updated object as receipt


Build an API
1) Build a basic server
2) Install mongoose, dotenv, express, and morgan