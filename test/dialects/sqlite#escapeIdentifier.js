var Dialect = require('../../dialects/Dialect')
var sqlite  = require('../../dialects/sqlite')

var array = [
    {input: ['hello'],             output: '"hello"'},
    {input: ['hello world'],       output: '"hello world"'},
    {input: ['"double quotes"'],   output: '`"double quotes"`'},
    {input: ['`backtick`'],        output: '"`backtick`"'},
    {input: ['[square brackets]'], output: '"[square brackets]"'},
    {input: ['ins"ide'],           output: '`ins"ide`'},
    {input: ['ins`ide'],           output: '"ins`ide"'},
    {input: ['ins[ide'],           output: '"ins[ide"'},
    {input: ['ins]ide'],           output: '"ins]ide"'},
    {input: ['mac"edo`nia'],       output: '[mac"edo`nia]'},
    {input: ['mac[edo`nia'],       output: '"mac[edo`nia"'},
    {input: ['mac[edo"nia'],       output: '`mac[edo"nia`'},
    {input: ['ma[ce]do`ni"a'],     output: '"macedonia"'},
]

module.exports = {
    'sqlite#escapeIdentifier': function(test){
        array.forEach(function (objTest) {
            var result = Dialect.prototype.escapeIdentifier.apply(sqlite, objTest.input)
            test.strictEqual(result, objTest.output)
        })
        test.done()
    }
}