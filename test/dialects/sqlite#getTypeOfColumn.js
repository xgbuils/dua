var Dialect = require('../../dialects/Dialect')
var sqlite  = require('../../dialects/sqlite')

var array = [
    {input: ['integer'],                    output: {name: 'INTEGER', params: []}},
    {input: ['int'],                        output: {name: 'INT', params: []}},
    {input: ['smalLint'],                   output: {name: 'SMALLINT', params: []}},
    {input: ['MEDIUMINt'],                  output: {name: 'MEDIUMINT', params: []}},
    {input: ['BIGINT'],                     output: {name: 'BIGINT', params: []}},
    {input: ['decIMAL'],                    output: {name: 'DECIMAL', params: []}},
    {input: ['DEC'],                        output: {name: 'DEC', params: []}},
    {input: ['FIxED'],                      output: {name: 'FIXED', params: []}},
    {input: ['numeric'],                    output: {name: 'NUMERIC', params: []}},
    {input: ['float'],                      output: {name: 'FLOAT', params: []}},
    {input: ['real'],                       output: {name: 'REAL', params: []}},
    {input: ['DOUBLE precision'],           output: {name: 'DOUBLE PRECISION', params: []}},
    {input: ['DOUBLE precision(3 ,8)'],     output: {name: 'DOUBLE PRECISION', params: [3,8]}},
    {input: ['DOUBLE precision(3 ,8, 1 )'], output: undefined},
    {input: ['double'],                     output: {name: 'DOUBLE', params: []}},
    {input: ['bit'],                        output: {name: 'BIT', params: []}},
    {input: ['Char'],                       output: undefined},
    {input: ['BOOLEAN'],                    output: {name: 'BOOLEAN', params: []}},
    {input: ['CHARACTER'],                  output: undefined},
    {input: ['CHARacTER(100)'],             output: {name: 'CHARACTER', params: [100]}},
    {input: ['varchar'],                    output: undefined},
    {input: ['varchar(200)'],               output: {name: 'VARCHAR', params: [200]}},
    {input: ['varchar(200,30)'],            output: undefined},
    {input: ['CHArAcTER VARYING'],          output: undefined},
    {input: ['CHArAcTER VARYING(8)'],       output: {name: 'CHARACTER VARYING', params: [8]}},
    {input: ['bInary'],                     output: undefined},
    {input: ['bInary(3)'],                  output: {name: 'BINARY', params: [3]}},
    {input: ['VARBINARY'],                  output: undefined},
    {input: ['VARBINARY(5)'],               output: {name: 'VARBINARY', params: [5]}},
    {input: ['BINARY VARYING'],             output: undefined},
    {input: ['BINARY VARYING(5)'],          output: {name: 'BINARY VARYING', params: [5]}},
    {input: ['DATE'],                       output: {name: 'DATE', params: []}},
    {input: ['time'],                       output: {name: 'TIME', params: []}},
    {input: ['timesTAMP'],                  output: {name: 'TIMESTAMP', params: []}},
    {input: ['INTERVAL'],                   output: {name: 'INTERVAL', params: []}},
    {input: ['multiseT'],                   output: {name: 'MULTISET', params: []}},
    {input: ['XML'],                        output: {name: 'XML', params: []}},
    {input: ['blob'],                       output: {name: 'BLOB', params: []}},
    {input: ['HJGhjg'],                     output: undefined},
    {input: [function(){}],                 output: undefined},
    {input: [42],                           output: undefined},
    {input: [true],                         output: undefined},
    {input: [undefined],                    output: undefined},
    {input: [null],                         output: undefined},
    {input: [{type: 'char(7)'}],            output: {name: 'CHAR', params: [7]}},
    {input: [{foo: 1, bar: 2}],             output: undefined},
    {input: [{foo: 1, type: ''}],           output: undefined},
    /*{input: [{type: undefined}],            output: undefined},
    {input: [{type: null}],                 output: undefined},
    {input: [{type: {foo: 1, bar:2}}],      output: undefined},
    {input: [{type: function(){}}],         output: undefined},
    {input: [{type: 42}],                   output: undefined},
    {input: [{type: true}],                 output: undefined},
    {input: [{type: false}],                output: undefined},
    {input: [{type: undefined}],            output: undefined},
    {input: [{type: null}],                 output: undefined},*/
]
/*
    'BINARY VARYING': 'BINARY VARYING', //(n)
    // date
    'DATE': 'DATE',
    'TIME': 'TIME',
    'TIMESTAMP': 'TIMESTAMP',
    'INTERVAL': 'INTERVAL',

    // other
    'MULTISET': 'MULTISET',
    'XML': 'XML',
    'BLOB': 'BLOB',
*/
module.exports = {
    'sqlite#getTypeOfColumn': function(test){
        array.forEach(function (objTest) {
            var result = Dialect.prototype.getTypeOfColumn.apply(sqlite, objTest.input)
            test.deepEqual(result, objTest.output)
        })
        test.done()
    }
}