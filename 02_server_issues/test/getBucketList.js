const server = require('../index')
const test = require('supertest')

// TEST CASES
// 1. see if it works - doesn't error code - returns something
// 2. see if it returns a 200 status code
// 3. check to see it returns JSON

describe('2. Test the GET /bucket route', function(){
    it('a. /bucket - happy case', function(done){
        test(server)
        .get('/bucket')
        .expect('Content-Type', /json/i)
        .expect(200, done)
    })
})