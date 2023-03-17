const server = require('../index')
const test = require('supertest')
const e = require('express')

describe('3. PUT & DELETE request of /bucket route', function () {
    it(' should create a new bucket item and flip its isComplete status', function (done) {
        let newTodo = { description: 'Learn mocha testing' }
        test(server)
            .post('/bucket')
            .set('Accept', 'application/json')
            .send(newTodo)
            .expect('Content-Type', /json/i)
            .expect(/learn mocha/i)
            .expect(/isComplete/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err)
                test(server)
                .put(`/bucket/${res.body.id}`)
                .expect(200)
                .expect('Content-Type', /json/i)
                .expect('{"id":4,"description":"Learn mocha testing","isComplete":true}', done)
            })
    })

    // confirming negative test
    it(' should give 404 error for a non-existent item id', function (done) {
        test(server)
            .put(`/bucket/9999999`)
            .expect(404)
            .expect(
                '{"error":"Unable to find id for put backend method"}',
                done
            )
    })

})

