var util = require('util')

var ModelCollection = require('../../model/ModelCollection')
var setModel = require('../../model/setModel')
var sqlite = require('../../dialects/sqlite')

var array = [
    { // 0
        input: [{
            name: 'integer'
        }],
        output: {
            tableName: '"samples"',
            columns: {
                name: {
                    columnName: '"name"',
                    type: {name: 'INTEGER', params: []},
                }
            },
            primaryKey: []
        }
    },
    { // 1
        input: [{
            name: {
                primaryKey: true
            }
        }],
        output: {
            tableName: '"samples"',
            columns: {
                name: {
                    columnName: '"name"',
                    type: {name: 'NUMERIC', params: []},

                }
            },
            primaryKey: ['name']
        }
    },
    { // 2
        input: [{
            name: 'primariKey: true' // bad column defintion, 
        }],
        output: {
            tableName: '"samples"',
            columns: {
                name: {
                    columnName: '"name"',
                    type: {name: 'NUMERIC', params: []},

                }
            },
            primaryKey: []
        }
    },
    { // 3
        input: [{
            id: {
                type: '  VARCHAR (3, 4)',
                primaryKey: true,
                autoIncrement: true,
            },
            createAt: 'date',
            updateAt: 'date'
        }],
        output: {
            tableName: '"samples"',
            columns: {
                id: {
                    columnName: '"id"',
                    type: {name: 'TEXT', params: []},
                    autoIncrement: true
                },
                createAt: {
                    columnName: '"createAt"',
                    type: {name: 'DATE', params: []}
                },
                updateAt: {
                    columnName: '"updateAt"',
                    type: {name: 'DATE', params: []}
                }
            },
            primaryKey: ['id']
        }
    },
    { // 4
        input: [{
            id: 'integer'
        },{
            id: {
                type: '  VARCHAR (3, 4)',
                primaryKey: true,
                autoIncrement: true,
            },
            createAt: 'date',
            updateAt: 'date'
        }],
        output: {
            tableName: '"samples"',
            columns: {
                id: {
                    columnName: '"id"',
                    type: {name: 'INTEGER', params: []},
                    autoIncrement: true
                },
                createAt: {
                    columnName: '"createAt"',
                    type: {name: 'DATE', params: []}
                },
                updateAt: {
                    columnName: '"updateAt"',
                    type: {name: 'DATE', params: []}
                }
            },
            primaryKey: ['id']
        }
    },
    { // 5
        input: [{
            id: {
                type: 'integer',
                autoIncrement: true,
            }
        },{
            id: {
                type: '  VARCHAR (3, 4)',
                primaryKey: true,
            },
        },{
            createAt: 'integer',
        },{
            createAt: 'date',
            updateAt: 'date'
        }],
        output: {
            tableName: '"samples"',
            columns: {
                id: {
                    columnName: '"id"',
                    type: {name: 'INTEGER', params: []},
                    autoIncrement: true
                },
                createAt: {
                    columnName: '"createAt"',
                    type: {name: 'DATE', params: []}
                },
                updateAt: {
                    columnName: '"updateAt"',
                    type: {name: 'DATE', params: []}
                }
            },
            primaryKey: ['id']
        }
    },
    { // 6
        input: [{
            id: {
                type: '  integer',
                autoIncrement: true,
            }
        },{
            id: {
                type: '  VARCHAR (34)',
                primaryKey: true,
            },
        },{
            updateAt: 'fdsfjh',
            createAt: 'integer',
        },{
            updateAt: 'date'
        }],
        output: {
            tableName: '"samples"',
            columns: {
                id: {
                    columnName: '"id"',
                    type: {name: 'VARCHAR', params: [34]},
                    autoIncrement: true
                },
                createAt: {
                    columnName: '"createAt"',
                    type: {name: 'INTEGER', params: []}
                },
                updateAt: {
                    columnName: '"updateAt"',
                    type: {name: 'DATE', params: []}
                }
            },
            primaryKey: ['id']
        }
    },
    { // 7
        input: [{
            id: {
                type: '  integer',
                autoIncrement: true,
            }
        },{
            id: {
                type: '  VARCHAR(  34)',
                primaryKey: true,
            },
        },{
            updateAt: 'fdsfjh',
            createAt: 'integer',
        },{
            createAt: 'date'
        }],
        output: {
            tableName: '"samples"',
            columns: {
                id: {
                    columnName: '"id"',
                    type: {name: 'VARCHAR', params: [34]},
                    autoIncrement: true
                },
                createAt: {
                    columnName: '"createAt"',
                    type: {name: 'DATE', params: []}
                },
                updateAt: {
                    columnName: '"updateAt"',
                    type: {name: 'NUMERIC', params: []}
                }
            },
            primaryKey: ['id']
        }
    },
    { // 7
        input: [{
            id: {
                type: '  VARCHAR(  34,)',
                autoIncrement: true,
            }
        },{
            id: {
                type: '  int  eger',
                primaryKey: true,
            },
        },{
            updateAt: 'fdsfjh',
            createAt: 'integer',
        },{
            createAt: 'date'
        }],
        output: {
            tableName: '"samples"',
            columns: {
                id: {
                    columnName: '"id"',
                    type: {name: 'INTEGER', params: []},
                    autoIncrement: true
                },
                createAt: {
                    columnName: '"createAt"',
                    type: {name: 'DATE', params: []}
                },
                updateAt: {
                    columnName: '"updateAt"',
                    type: {name: 'NUMERIC', params: []}
                }
            },
            primaryKey: ['id']
        }
    },
    /*{
        input: [{
            id: 'integer'
        },{
            id: {
                type: '  VARCHAR (3, 4)',
                primaryKey: true,
                autoIncrement: true,
            },
            createAt: 'date',
            updateAt: 'date'
        }],
        output: {
            tableName: '"samples"',
            columns: {
                id: {
                    columnName: '"id"',
                    type: {name: 'INTEGER', params: []},
                    autoIncrement: true
                },
                createAt: {
                    columnName: '"createAt"',
                    type: {name: 'DATE', params: []}
                },
                updateAt: {
                    columnName: '"updateAt"',
                    type: {name: 'DATE', params: []}
                }
            },
            primaryKey: ['id']
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
    },*/
]

console.debug = function(myObject) {
    console.log(util.inspect(myObject, {showHidden: false, depth: null}));
}

module.exports = {
    'setModel-sqlite': function(test){
        array.forEach(function (objTest) {
            var n = objTest.input.length - 1
            var models = {}
            if (n > 0) {
                models = new ModelCollection(objTest.input[0], undefined, sqlite)
            }
            for (var i = 1; i < n; ++i) {
                models = models.extend(objTest.input[i])
            }

            var model = setModel('samples', objTest.input[n], sqlite, models.defaults)
            test.deepEqual(model, objTest.output)
        })
        test.done()
    }
}