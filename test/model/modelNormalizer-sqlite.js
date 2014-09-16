var modelNormalizer = require('../../model/modelNormalizer')
var sqlite = require('../../dialects/sqlite')

var array = [
    {
        input: [{
            name: 'integer'
        }],
        output: {
            name: {
                type: {name: 'INTEGER', params: []},
            }
        }
    },
    {
        input: [{
            name: {
                primaryKey: true
            }
        }],
        output: {
            name: {
                primaryKey: true
            }
        }
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
                type: {name: ''}
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