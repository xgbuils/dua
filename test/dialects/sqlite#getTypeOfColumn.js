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
    {input: ['DOUBLE precision(3 ,8, 1 )'], output: {name: 'DOUBLE PRECISION', params: undefined}},
    {input: ['double'],                     output: {name: 'DOUBLE', params: []}},
    {input: ['bit'],                        output: {name: 'BIT', params: []}},
    {input: ['Char'],                       output: {name: 'CHAR', params: undefined}},
    {input: ['BOOLEAN'],                    output: {name: 'BOOLEAN', params: []}},
    {input: ['CHARACTER'],                  output: {name: 'CHARACTER', params: undefined}},
    {input: ['CHARacTER(100)'],             output: {name: 'CHARACTER', params: [100]}},
    {input: ['varchar'],                    output: {name: 'VARCHAR', params: undefined}},
    {input: ['varchar(200)'],               output: {name: 'VARCHAR', params: [200]}},
    {input: ['varchar(200,30)'],            output: {name: 'VARCHAR', params: undefined}},
    {input: ['CHArAcTER VARYING'],          output: {name: 'CHARACTER VARYING', params: undefined}},
    {input: ['CHArAcTER VARYING(8)'],       output: {name: 'CHARACTER VARYING', params: [8]}},
    {input: ['bInary'],                     output: {name: 'BINARY', params: undefined}},
    {input: ['bInary(3)'],                  output: {name: 'BINARY', params: [3]}},
    {input: ['VARBINARY'],                  output: {name: 'VARBINARY', params: undefined}},
    {input: ['VARBINARY(5)'],               output: {name: 'VARBINARY', params: [5]}},
    {input: ['BINARY VARYING'],             output: {name: 'BINARY VARYING', params: undefined}},
    {input: ['BINARY VARYING(5)'],          output: {name: 'BINARY VARYING', params: [5]}},
    {input: ['DATE'],                       output: {name: 'DATE', params: []}},
    {input: ['time'],                       output: {name: 'TIME', params: []}},
    {input: ['timesTAMP'],                  output: {name: 'TIMESTAMP', params: []}},
    {input: ['INTERVAL'],                   output: {name: 'INTERVAL', params: []}},
    {input: ['multiseT'],                   output: {name: 'MULTISET', params: []}},
    {input: ['XML'],                        output: {name: 'XML', params: []}},
    {input: ['blob'],                       output: {name: 'BLOB', params: []}},
    {input: ['HJGhjg'],                     output: {name: 'NUMERIC', params: []}},
    {input: [function(){}],                 output: undefined},
    {input: [42],                           output: undefined},
    {input: [true],                         output: undefined},
    {input: [undefined],                    output: undefined},
    {input: [null],                         output: undefined},
    {input: [{type: 'char(7)'}],            output: {name: 'CHAR', params: [7]}},
    {input: [{type: {foo: 1, bar:2}}],      output: undefined},
    {input: [{type: function(){}}],         output: undefined},
    {input: [{type: 42}],                   output: undefined},
    {input: [{type: true}],                 output: undefined},
    {input: [{type: undefined}],            output: undefined},
    {input: [{type: null}],                 output: undefined},
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