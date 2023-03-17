function doubleInt(num) {
    // throw not-a-num exception
    if(typeof num != 'number') {
        throw 'not a number'
    }

    return num * 2
}

// console.log('1', doubleInt(2))
// console.log('2', doubleInt(3))
// console.log('3', doubleInt(3.2545))
// console.log('4', doubleInt())

module.exports = doubleInt