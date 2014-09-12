var ModelCollection = require('../../model/ModelCollection')
var sqlite = require('../../dialects/sqlite')

var array = [
    {
        input: [{
            name: 'integer'
        },
        {
            name: {
                primaryKey: true
            }
        }],
        output: {
            name: {
                type: {name: 'INTEGER', params: []},
                primaryKey: true
            }
        }
    },
    {
        input: [{
            name: 'integer'
        },
        {
            name: {
                primaryKey: true
            }
        },
        {
            id: {
                primaryKey: true
            }
        }],
        output: {
            name: {
                type: {name: 'INTEGER', params: []},
                primaryKey: true
            },
            id: {
                primaryKey: true,
            }
        }
    },
    {
        input: [{
            name: 'integer'
        },
        {
            name: {
                primaryKey: true
            }
        },
        {
            name: 'primariKey: true' // bad column defintion, This doesn't override.
        }],
        output: {
            name: {
                type: {name: 'INTEGER', params: []},
                primaryKey: true
            },
        }
    },
    {
        input: [{
            id: '  integer  '
        },
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
            }
        },
        {
            createAt: 'date',
            updateAt: 'date'
        }],
        output: {
            id: {
                type: {name: 'INTEGER', params: []},
                primaryKey: true,
                autoIncrement: true
            },
            createAt: {type: {name: 'DATE', params: []}},
            updateAt: {type: {name: 'DATE', params: []}}
        }
    },
]

module.exports = {
    'ModelCollection#extend': function(test){
        array.forEach(function (objTest) {
            var models = new ModelCollection(objTest.input[0], undefined, sqlite)
            for (var i = 1; i < objTest.input.length; ++i) {
                models = models.extend(objTest.input[i])
            }
            test.deepEqual(models.defaults, objTest.output)
        })
        test.done()
    }
}