var samples = require('./samples')

var Dua = require('../../Dua.js')

var array = []

array[0] = {}
array[0].input = {}
array[0].input[samples[0].name] = samples[0].definition

var dua = new Dua()
var model = dua.define(array[0].input)
console.log(model)
/*
module.exports = {
    'model#getRowid': function(test) {
        array.forEach(function (objTest) {
            var result = Dialect.prototype.escapeIdentifier.apply(sqlite, objTest.input)
            test.strictEqual(result, objTest.output)
        })
        test.done()
    }
}*/