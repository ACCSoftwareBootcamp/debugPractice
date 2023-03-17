const server = require('../index')
const test = require('supertest')

describe('3. POST request of /bucket route', function(){
    it(' should create a new bucket item', function(done){
        let newTodo = {description: 'Learn mocha testing'}
        test(server)
        .post('/bucket')
        .set('Accept', 'application/json')
        .send(newTodo)
        .expect('Content-Type', /json/i)
        .expect(/learn mocha/i)
        .expect(/isComplete/)
        .expect(200)
        .end(function(err, res){
            if(err) return done(err)
            // console.log(res.body)
            return done()
        })
    })
})
