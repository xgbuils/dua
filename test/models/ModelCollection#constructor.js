var ModelCollection = require('../../model/ModelCollection')
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
    {
        input: [{
            id: {
                type: '  varCHar (2 ,1)'
            }
        }, undefined, sqlite],
        output: {
            id: {
                type: {name: 'VARCHAR (2 ,1)'}
            }
        }
    },
]


module.exports = {
    'ModelCollection#constructor': function(test){
        array.forEach(function (objTest) {
            var result = new ModelCollection(objTest.input[0], objTest.input[1], objTest.input[2])
            test.deepEqual(result.defaults, objTest.output)
        })
        test.done()
    }
}