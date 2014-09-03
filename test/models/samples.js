samples = [{
	name: 'User',
    definition: {
        id: 'INTEGER',
        name: 'text',
    }},{
    name: 'Foo',
    definition: {
    	id: 'PRIMARY KEY'
    }},{
    name: 'User',
    definition: {
        type: 'INTEGER',
        primaryKey: true,
        autoIncrement: true,
    }},{
    name: 'User',
    definition: {
        id: {},
        name: {type:'GGF'}
    }},{
    name: 'User',
    definition: {
        name: {type:'GGF'}
    }},
]

module.exports = samples