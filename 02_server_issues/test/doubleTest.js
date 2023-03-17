// commonjs form of importing
const doubleFn = require('../double')
const assert = require('assert/strict')

describe('1. Testing the double function', function(){
    it('a. should return 4 - happy case', function(){
        let answer = doubleFn(2)
        assert.equal(answer, 4)
    })
    it('b. should return -4 - happy case', function () {
        let answer = doubleFn(-2)
        assert.equal(answer, -4)
    })
    it('c. should throw a type exception - unhappy case', function () {
        assert.throws(function(){
            return doubleFn(true)
        })
    })
    it('d. should throw a type exception - unhappy case', function () {
        assert.throws(function () {
            return doubleFn()
        })
    })
    it('e. should return 0.04 - happy case', function () {
        let answer = doubleFn(0.02)
        assert.equal(answer, 0.04)
    })
})



// Error: something that should not happen (is a bug)
// Exception: could happen, but our code needs to detect it
//            and deal with it.