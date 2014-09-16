var modelExtend = require('../../model/modelExtend')

var array = [
    {input: [{a: 1}, {b: 2}], output: { a: 1, b: 2 }},
    {input: [{ a: { x: 1 }, b: { y: 2 } }], output: { a: { x: 1 }, b: { y: 2 } }},
    {input: [{ a: { x: 1 }, b: { x: 5 } }, {b: { y: 2 } }], output: { a: { x: 1 }, b: { x: 5, y: 2 } }},
    {input: [{ a: { x: 1 } }, {a: { y: 5 }, b: { y: 2 } }], output: { a: { x: 1, y: 5 }, b: { y: 2 } }},
    {input: [{ a: { x: 1 } }, {a: { x: 5 }, b: { y: 2 } }], output: { a: { x: 5 }, b: { y: 2 } }},
    {   input: [{ id: { primaryKey: true } }, {id: { type: 5 }, name: { unique: true } }], 
        output: { id: { primaryKey: true, type: 5 }, name: { unique: true } }
    },
    {
        input: [
            { id: { primaryKey: true, type: {name: 'TEXT', params: []} }}, 
            { id: { type: {name: 'INT', params: [3]} }, name: { unique: true } }
        ],
        output: { id: { primaryKey: true, type: { name: 'INT', params: [ 3 ] } }, name: { unique: true } }
    },
    {
        input: [
            { id: { primaryKey: true, type: {name: 'TEXT', params: []} }}, 
            { id: { type: {name: 'INT', params: [3]} }, name: { unique: true } }
        ],
        output: { id: { primaryKey: true, type: { name: 'INT', params: [3] } }, name: { unique: true } }
    },
    {
        input: [
            { id: { primaryKey: true, type: {name: 'TEXT', params: []} }}, 
            { id: { type: {name: 'INT'} }, name: { unique: true } }
        ],
        output: { id: { primaryKey: true, type: { name: 'TEXT', params: [] } }, name: { unique: true } }
    },
    {
        input: [
            { id: { primaryKey: true, type: {name: 'TEXT'} }}, 
            { id: { type: {name: 'INT'} }, name: { unique: true } }
        ],
        output: { id: { primaryKey: true, type: { name: 'INT'} }, name: { unique: true } }
    },
    {
        input: [
            { id: { primaryKey: true, type: {name: 'TEXT', params: []} }}, 
            { id: { type: {name: 'INT'} }, name: { unique: true } }
        ],
        output: { id: { primaryKey: true, type: { name: 'TEXT', params: [] } }, name: { unique: true } }
    },
]

module.exports = {
    'modelExtend': function (test) {
        array.forEach(function (objTest) {
            var result = modelExtend.apply(null, objTest.input)
            test.deepEqual(result, objTest.output)
        })
        test.done()
    }
}