Consuming APIs (third party)
1) THEY decide on the endpoints
2) THEY determine how the data will sent - XML and JSON
3) THEY determine how much and what the data will look like

Serving (building) APIS - us!!!
1) WE decide on the endpoints
2) WE determine how data will be sent - JSON, XML, or something else
3) WE determine how much and what the data will look like


CRUD functionality - get, post, delete, 
Create - POST
Read - GET
Update - PUT
Delete - DELETE

Dallas our BOSS says:
1) Whatever we send back to client MUST be JSON
2) Only allowed 2 endpoints:
      /bucket
      /bucket/:id

READ
1) endpoint = /bucket
      verb = GET
2) send back JSON
3) data = array of objects!!!

CREATE
1) endpoint = /bucket
      verb = POST
2) send back JSON
3) data = one object = id, description, isComplete

DELETE
1) endpoint = /bucket/:id
      verb = DELETE
2) send back JSON
3) data = send back array without the deleted object
4) if error, send back error json

UPDATE
1) endpoint = /bucket/:id
      verb = PUT
2) send back json
3) data = one updated object
4) if error, send back error json



How to get data from the user?
1) /doggy/cat - route we went to
      /doggy/:animal
      get data from the url using req.params.animal

2) form with button and GET method
      data is sent through the url
      in the url (which is encoded) we saw a question mark
      so we knew to use req.query
      /doggy/horse/home?cat=meow
      req,query.cat => "meow"

3) form with button and POST method
      data will be sent in an object called "body"
            which is part of the request object
      so you will need to use req.body to reference specific key:value paira

