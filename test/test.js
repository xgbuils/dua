var extend = require('../vendor/extend')

var tests = [
    require('./dialects/sqlite#escapeIdentifier'),
]

module.exports = extend.apply(null, tests)