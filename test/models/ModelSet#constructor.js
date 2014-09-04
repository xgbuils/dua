var ModelSet = require('../../model/ModelSet')
var sqlite = require('../../dialects/sqlite')

var extend = require('../../vendor/extend')

var array = [
    {
        input: [{
            id: 'integer'
        }, undefined, sqlite],
        output: {
            id: {
                type: {name: 'INTEGER', params: []}
            }
        }
    },
    {
        input: [{
            id: {
                type: 'INTEGER'
            }
        }, undefined, sqlite],
        output: {
            id: {
                type: {name: 'INTEGER', params: []}
            }
        }
    },
    {
        input: [{
            id: {
                type: {name: 'INTEGER', params: []} // type error definition, error must be a string
            }
        }, undefined, sqlite],
        output: {
            id: {}
        }
    },
    /*{
        input: [{
            id: {
                type: 'varCHar (2 ,1)'
            }
        }, undefined, sqlite],
        output: {
            id: {}
        }
    },*/
]
/*
var objTest = array[2]
var result = new ModelSet(objTest.input[0], objTest.input[1], objTest.input[2])
console.log(result.defaults)*/


module.exports = {
    'ModelSet#constructor': function(test){
        array.forEach(function (objTest) {
            var result = new ModelSet(objTest.input[0], objTest.input[1], objTest.input[2])
            test.deepEqual(result.defaults, objTest.output)
        })
        test.done()
    }
}