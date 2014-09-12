var columnNormalizer = require('../../model/columnNormalizer')
var sqlite  = require('../../dialects/sqlite')

var array = [
    {input: ['integer'],                    output: {type: {name: 'INTEGER', params: []}}},
    {input: ['int'],                        output: {type: {name: 'INT', params: []}}},
    {input: ['smalLint'],                   output: {type: {name: 'SMALLINT', params: []}}},
    {input: ['MEDIUMINt'],                  output: {type: {name: 'MEDIUMINT', params: []}}},
    {input: ['BIGINT'],                     output: {type: {name: 'BIGINT', params: []}}},
    {input: ['decIMAL'],                    output: {type: {name: 'DECIMAL', params: []}}},
    {input: ['DEC'],                        output: {type: {name: 'DEC', params: []}}},
    {input: ['FIxED'],                      output: {type: {name: 'FIXED', params: []}}},
    {input: ['numeric'],                    output: {type: {name: 'NUMERIC', params: []}}},
    {input: ['float'],                      output: {type: {name: 'FLOAT', params: []}}},
    {input: ['real'],                       output: {type: {name: 'REAL', params: []}}},
    {input: ['DOUBLE precision'],           output: {type: {name: 'DOUBLE PRECISION', params: []}}},
    {input: ['DOUBLE precision(3 ,8)'],     output: {type: {name: 'DOUBLE PRECISION', params: [3,8]}}},
    {input: ['DOUBLE precision(3 ,8, 1 )'], output: {type: {name: 'DOUBLE PRECISION(3 ,8, 1 )'}}},
    {input: ['double'],                     output: {type: {name: 'DOUBLE', params: []}}},
    {input: ['bit'],                        output: {type: {name: 'BIT', params: []}}},
    {input: ['Char'],                       output: {type: {name: 'CHAR'}}},
    {input: ['BOOLEAN'],                    output: {type: {name: 'BOOLEAN', params: []}}},
    {input: ['CHARACTER'],                  output: {type: {name: 'CHARACTER'}}},
    {input: ['CHARacTER(100)'],             output: {type: {name: 'CHARACTER', params: [100]}}},
    {input: ['varchar'],                    output: {type: {name: 'VARCHAR'}}},
    {input: ['varchar(200)'],               output: {type: {name: 'VARCHAR', params: [200]}}},
    {input: ['varchar(200,30)'],            output: {type: {name: 'VARCHAR(200,30)'}}},
    {input: ['CHArAcTER VARYING'],          output: {type: {name: 'CHARACTER VARYING'}}},
    {input: ['CHArAcTER VARYING(8)'],       output: {type: {name: 'CHARACTER VARYING', params: [8]}}},
    {input: ['bInary'],                     output: {type: {name: 'BINARY'}}},
    {input: ['bInary(3)'],                  output: {type: {name: 'BINARY', params: [3]}}},
    {input: ['VARBINARY'],                  output: {type: {name: 'VARBINARY'}}},
    {input: ['VARBINARY(5)'],               output: {type: {name: 'VARBINARY', params: [5]}}},
    {input: ['BINARY VARYING'],             output: {type: {name: 'BINARY VARYING'}}},
    {input: ['BINARY VARYING(5)'],          output: {type: {name: 'BINARY VARYING', params: [5]}}},
    {input: ['DATE'],                       output: {type: {name: 'DATE', params: []}}},
    {input: ['time'],                       output: {type: {name: 'TIME', params: []}}},
    {input: ['timesTAMP'],                  output: {type: {name: 'TIMESTAMP', params: []}}},
    {input: ['INTERVAL'],                   output: {type: {name: 'INTERVAL', params: []}}},
    {input: ['multiseT'],                   output: {type: {name: 'MULTISET', params: []}}},
    {input: ['XML'],                        output: {type: {name: 'XML', params: []}}},
    {input: ['blob'],                       output: {type: {name: 'BLOB', params: []}}},
    {input: ['HJGhjg'],                     output: {type: {name: 'HJGHJG'}}},
    {input: [function(){}],                 output: {}},
    {input: [42],                           output: {}},
    {input: [true],                         output: {}},
    {input: [undefined],                    output: {}},
    {input: [null],                         output: {}},
    {input: [{type: 'char(7)'}],            output: {type: {name: 'CHAR', params: [7]}}},
    {input: [{foo: 1, bar: 2}],             output: {foo: 1, bar: 2}},
    {input: [{foo: 1, type: ''}],           output: {foo: 1, type: {name: ''}}},
    {input: [{type: {foo: 1, bar:2}}],      output: {}},
    {input: [{type: function(){}}],         output: {}},
    {input: [{type: 42}],                   output: {}},
    {input: [{type: true}],                 output: {}},
    {input: [{type: false}],                output: {}},
    {input: [{type: undefined}],            output: {}},
    {input: [{type: null}],                 output: {}},
]

module.exports = {
    'columnNormalizer-sqlite': function(test){
        array.forEach(function (objTest) {
            var result = columnNormalizer(objTest.input[0], sqlite)
            test.deepEqual(result, objTest.output)
        })
        test.done()
    }
}