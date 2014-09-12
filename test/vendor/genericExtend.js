var genericExtend = require('../../vendor/genericExtend')
var isObject      = require('../../vendor/isObject')

var array = [
    {input: [{a: 1}, {b: 2}], output: { a: 1, b: 2 }},
    {input: [{ a: { x: 1 }, b: { y: 2 } }], output: { a: { x: 1 }, b: { y: 2 } }},
    {input: [{ a: { x: 1 }, b: { x: 5 } }, {b: { y: 2 } }, 1], output: { a: { x: 1 }, b: { y: 2 } }},
    {input: [{ a: { x: 1 }, b: { x: 5 } }, {b: { y: 2 } }, 2], output: { a: { x: 1 }, b: { x: 5, y: 2 } }},
    {input: [{ a: { x: 1 }, b: { x: 5 } }, {b: { y: 2 } }], output: { a: { x: 1 }, b: { x: 5, y: 2 } }},
    {input: [{ a: { x: 1 }, b: { x: 5 } }, {b: { y: 2 } }, 0], output: {b: { y: 2 }}},
    {input: [{ a: { x: 1 } }, {a: { y: 5 }, b: { y: 2 } }], output: { a: { x: 1, y: 5 }, b: { y: 2 } }},
    {input: [{ a: { x: 1 } }, {a: { x: 5 }, b: { y: 2 } }], output: { a: { x: 5 }, b: { y: 2 } }},
    {   input: [{ id: { primaryKey: true } }, {id: { type: 5 }, name: { unique: true } }], 
        output: { id: { primaryKey: true, type: 5 }, name: { unique: true } }
    },
    {   input: [{ id: { primaryKey: true } }, {id: { type: 5 }, name: { unique: true } }, 1], 
        output: { id: { type: 5 }, name: { unique: true } }
    },
    {   input: [{ id: { primaryKey: true } }, {id: { type: 5 }, name: { unique: true } }, 2], 
        output: { id: { primaryKey: true, type: 5 }, name: { unique: true } }
    },
    {
        input: [
            { id: { primaryKey: true, type: {name: 'TEXT', params: []} }}, 
            { id: { type: {name: 'INT', params: [3]} }, name: { unique: true } },
            2
        ],
        output: { id: { primaryKey: true, type: { name: 'INT', params: [ 3 ] } }, name: { unique: true } }
    },
    {
        input: [
            { id: { primaryKey: true, type: {name: 'TEXT', params: []} }}, 
            { id: { type: {name: 'INT', params: [3]} }, name: { unique: true } },
            2,
            function(a, b, key, n) {
                return !(n > 0 && key !== 'type' && isObject(a) && isObject(b))
            }
        ],
        output: { id: { primaryKey: true, type: { name: 'INT', params: [ 3 ] } }, name: { unique: true } }
    },
    {
        input: [
            { id: { primaryKey: true, type: {name: 'TEXT', params: []} }}, 
            { id: { type: {name: 'INT', params: [3]} }, name: { unique: true } },
            2,
            function (a, b, key, n) {
                return !(n > 0 && key !== 'type' && isObject(a) && isObject(b))
            },
            function (a, b, key, n) {
                var type
                if (key === 'type' && a && b) {
                    if(a.params && b.params ) {
                        type = b
                    } else if (a.params) {
                        type = a
                    } else {
                        type = b
                    }
                } else {
                    type = b || a
                }
                return type
            }
        ],
        output: { id: { primaryKey: true, type: { name: 'INT', params: [3] } }, name: { unique: true } }
    },
    {
        input: [
            { id: { primaryKey: true, type: {name: 'TEXT', params: []} }}, 
            { id: { type: {name: 'INT'} }, name: { unique: true } },
            2,
            function (a, b, key, n) {
                return !(n > 0 && key !== 'type' && isObject(a) && isObject(b))
            },
            function (a, b, key, n) {
                var type
                if (key === 'type' && a && b) {
                    if(a.params && b.params ) {
                        type = b
                    } else if (a.params) {
                        type = a
                    } else {
                        type = b
                    }
                } else {
                    type = b || a
                }
                return type
            }
        ],
        output: { id: { primaryKey: true, type: { name: 'TEXT', params: [] } }, name: { unique: true } }
    },
    {
        input: [
            { id: { primaryKey: true, type: {name: 'TEXT'} }}, 
            { id: { type: {name: 'INT'} }, name: { unique: true } },
            2,
            function (a, b, key, n) {
                return !(n > 0 && key !== 'type' && isObject(a) && isObject(b))
            },
            function (a, b, key, n) {
                var type
                if (key === 'type' && a && b) {
                    if(a.params && b.params ) {
                        type = b
                    } else if (a.params) {
                        type = a
                    } else {
                        type = b
                    }
                } else {
                        type = b || a
                }
                return type
            }
        ],
        output: { id: { primaryKey: true, type: { name: 'INT'} }, name: { unique: true } }
    },
    {
        input: [
            { id: { primaryKey: true, type: {name: 'TEXT', params: []} }}, 
            { id: { type: {name: 'INT'} }, name: { unique: true } },
            2,
            function (a, b, key, n) {
                return !(n > 0 && key !== 'type' && isObject(a) && isObject(b))
            },
            function (a, b, key, n) {
                var type
                if (key === 'type' && a && b) {
                    if(a.params && b.params ) {
                        type = b
                    } else if (a.params) {
                        type = a
                    } else {
                        type = b
                    }
                } else {
                    type = b || a
                }
                return type
            }
        ],
        output: { id: { primaryKey: true, type: { name: 'TEXT', params: [] } }, name: { unique: true } }
    },
    {
        input: [
            { id: { primaryKey: true, type: {name: 'TEXT', params: []} }}, 
            { id: { type: {name: 'INT'} }, name: { unique: true } },
            1,
            function (a, b, key, n) {
                return !(n > 0 && key !== 'type' && isObject(a) && isObject(b))
            },
            function (a, b, key, n) {
                var type
                if (key === 'type' && a && b) {
                    if(a.params && b.params ) {
                        type = b
                    } else if (a.params) {
                        type = a
                    } else {
                        type = b
                    }
                } else {
                    type = b || a
                }
                return type
            }
        ],
        output: { id: { type: {name: 'INT'} }, name: { unique: true } }
    },
    {
        input: [
            { id: { primaryKey: true, type: {name: 'TEXT', params: []} }, name: { unique: {blo:2}}}, 
            { id: { type: {name: 'INT'} }, name: { unique: {bli: 1} } },
            3,
            function (a, b, key, n) {
                return !(n > 0 && key !== 'type' && isObject(a) && isObject(b))
            },
            function (a, b, key, n) {
                var type
                if (key === 'type' && a && b) {
                    if(a.params && b.params ) {
                        type = b
                    } else if (a.params) {
                        type = a
                    } else {
                        type = b
                    }
                } else {
                    type = b || a
                }
                return type
            }
        ],
        output: { id: { primaryKey: true, type: { name: 'TEXT', params: [] } }, name: { unique: {bli:1, blo:2} } }
    }
]

module.exports = {
    'genericExtend': function (test) {
        array.forEach(function (objTest) {
            var result = genericExtend.apply(null, objTest.input)
            test.deepEqual(result, objTest.output)
        })
        test.done()
    }
}