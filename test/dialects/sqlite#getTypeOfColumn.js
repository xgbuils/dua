var Dialect = require('../../dialects/Dialect')
var sqlite  = require('../../dialects/sqlite')

var array = [
    {input: ['integer'],           output: {name: 'INTEGER', params: []}},
    {input: ['int'],               output: {name: 'INT', params: []}},
    {input: ['smalLint'],          output: {name: 'SMALLINT', params: []}},
    {input: ['MEDIUMINt'],         output: {name: 'MEDIUMINT', params: []}},
    {input: ['BIGINT'],            output: {name: 'BIGINT', params: []}},
    {input: ['decIMAL'],           output: {name: 'DECIMAL', params: []}},
    {input: ['DEC'],               output: {name: 'DEC', params: []}},
    {input: ['FIxED'],             output: {name: 'FIXED', params: []}},
    {input: ['numeric'],           output: {name: 'NUMERIC', params: []}},
    {input: ['float'],             output: {name: 'FLOAT', params: []}},
    {input: ['real'],              output: {name: 'REAL', params: []}},
    {input: ['DOUBLE precision'],  output: {name: 'DOUBLE PRECISION', params: []}},
    {input: ['double'],            output: {name: 'DOUBLE', params: []}},
    {input: ['bit'],               output: {name: 'BIT', params: []}},
    {input: ['BOOLEAN'],           output: {name: 'BOOLEAN', params: []}},
    {input: ['CHARACTER'],         output: {name: 'CHARACTER', params: []}},
    {input: ['varchar'],           output: {name: 'VARCHAR', params: []}},
    {input: ['CHArAcTER VARYING'], output: {name: 'CHARACTER VARYING', params: []}},
    {input: ['bInary'],            output: {name: 'BINARY', params: []}},
    {input: ['VARBINARY'],         output: {name: 'VARBINARY', params: []}},
    {input: ['BINARY VARYING'],    output: {name: 'BINARY VARYING', params: []}},
    {input: ['BINARY VARYING(5)'], output: {name: 'BINARY VARYING', params: [5]}},
    {input: ['DATE'],              output: {name: 'DATE', params: []}},
    {input: ['time'],              output: {name: 'TIME', params: []}},
    {input: ['timesTAMP'],         output: {name: 'TIMESTAMP', params: []}},
    {input: ['INTERVAL'],          output: {name: 'INTERVAL', params: []}},
    {input: ['multiseT'],          output: {name: 'MULTISET', params: []}},
    {input: ['XML'],               output: {name: 'XML', params: []}},
    {input: ['blob'],              output: {name: 'BLOB', params: []}},
    {input: ['HJGhjg'],            output: {name: 'NUMERIC', params: []}},
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